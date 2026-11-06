let menuVideoOf = null;

let menuShown = null;

const menuNodes = new Map;

const MENU_VIDEOS = [ 'battleship', 'artillery', 'ram', 'carpet', 'rockets', 'recall' ];

function playMenuVideo(id) {
    if (id === menuVideoOf) return;
    menuVideoOf = id;
    const video = $('menu-video');
    $('menu-frame').classList.remove('has-video');
    if (id && MENU_VIDEOS.includes(id)) {
        video.src = `media/${id}.mp4?v=${VERSION}`;
        video.play().catch((() => {}));
    } else {
        video.pause();
        video.removeAttribute('src');
        video.load();
    }
}

$('menu-video').addEventListener('playing', (() => $('menu-frame').classList.add('has-video')));

$('menu-video').addEventListener('error', (() => $('menu-frame').classList.remove('has-video')));

function playersText(game) {
    return game.min === game.max ? word('players_exact', '{n} players').replace('{n}', game.min) : word('players_range', '{min}–{max} players').replace('{min}', game.min).replace('{max}', game.max);
}

const HOME_WORDS = {
    en: {
        scan: 'Scan the code with your phone',
        app: 'Open GameTable on your phone',
        tag: 'Games on your TV, secrets on your phone'
    },
    ru: {
        scan: 'Отсканируйте код телефоном',
        app: 'Откройте GameTable на телефоне',
        tag: 'Игры на телевизоре, секреты в телефоне'
    }
};

const homeWord = key => (HOME_WORDS[(navigator.language || 'en').slice(0, 2)] || HOME_WORDS.en)[key];

function drawHome() {
    $('home-tag').textContent = homeWord('tag');
    $('waiting').textContent = homeWord($('join').classList.contains('on') ? 'scan' : 'app');
    const fan = $('home-fan');
    if (fan.childElementCount) return;
    [ 'recall', 'rockets', 'carpet', 'artillery', 'battleship', 'ram' ].forEach(((id, i) => {
        const poster = posterImage(id, 'home-poster');
        poster.style.setProperty('--at', i - 2.5);
        fan.appendChild(poster);
    }));
}

function menuNodesFor(games) {
    const tiles = $('menu-tiles');
    for (const game of games) {
        if (menuNodes.has(game.id)) continue;
        const tile = div('menu-tile');
        tile.appendChild(posterImage(game.id, 'menu-tile-art'));
        const name = div('menu-tile-name');
        const votes = div('menu-votes');
        tile.append(name, votes);
        tiles.appendChild(tile);
        const backdrop = div('menu-backdrop');
        backdrop.dataset.game = game.id;
        $('menu-backdrops').appendChild(backdrop);
        menuNodes.set(game.id, {
            tile: tile,
            name: name,
            backdrop: backdrop,
            votes: votes,
            voters: ''
        });
    }
}

function drawMenu(state) {
    const game = state.games.find((g => g.id === state.browsing)) || state.games[0];
    const title = word('game_' + game.id, game.id);
    const host = state.players.find((p => p.id === state.host));
    const online = state.players.filter((p => p.online)).length;
    menuNodesFor(state.games);
    $('lobby-title').textContent = word('table', 'At the table');
    const seats = $('seats');
    seats.textContent = '';
    for (const p of state.players) {
        seats.appendChild(div('seat' + (p.online ? '' : ' off') + (p.id === state.host ? ' host' : ''), p.name));
    }
    $('menu-title').textContent = title;
    $('menu-meta').textContent = [ playersText(game), word('length_' + game.id, '') ].filter(Boolean).join(' · ');
    $('menu-about').textContent = word('about_' + game.id, '');
    const wanting = state.players.filter((p => (state.votes || {})[p.id] === game.id)).map((p => p.name));
    $('menu-votes').textContent = wanting.length ? '♥ ' + word('votes_want', 'Want to play: {names}').replace('{names}', wanting.join(', ')) : '';
    $('lobby-hint').textContent = online < game.min ? word($('join').classList.contains('on') ? 'need_more_scan' : 'need_more', 'Waiting for one more player') : word('host_picks_name', '{name} picks a game on the phone').replace('{name}', host ? host.name : '');
    const votes = state.votes || {};
    const votersOf = id => state.players.filter((p => votes[p.id] === id));
    let newVote = false;
    for (const g of state.games) {
        const nodes = menuNodes.get(g.id);
        nodes.name.textContent = word('game_' + g.id, g.id);
        const voters = votersOf(g.id);
        const key = voters.map((p => p.id)).join();
        if (key !== nodes.voters) {
            const before = new Set(nodes.voters.split(','));
            nodes.voters = key;
            nodes.votes.textContent = '';
            for (const p of voters) {
                const badge = div('menu-vote', [ ...p.name ][0].toUpperCase());
                if (!before.has(p.id)) {
                    badge.classList.add('fresh');
                    newVote = true;
                }
                nodes.votes.appendChild(badge);
            }
        }
        nodes.tile.classList.toggle('chosen', g.id === game.id);
        nodes.backdrop.classList.toggle('on', g.id === game.id);
    }
    if (game.id !== menuShown) {
        if (menuShown) playSound('browse');
        menuShown = game.id;
        $('menu-plate').src = posterUrl(game.id);
        for (const node of [ $('menu-info'), $('menu-plate') ]) {
            node.classList.remove('fresh');
            void node.offsetWidth;
            node.classList.add('fresh');
        }
    }
    if (newVote) playSound('vote');
    playMenuVideo(game.id);
    show('lobby');
}

const COUNT_STEP_MS = 700;

const COUNT_END_MS = 3 * COUNT_STEP_MS + 900;

let counting = false;

let countTimers = [];

function countMark(text, cls) {
    const mark = div('cd-mark ' + cls, text);
    mark.addEventListener('animationend', (event => {
        if (event.target === mark && event.animationName === 'cd-out') mark.remove();
    }));
    $('cd-stage').appendChild(mark);
    const ring = div('cd-ring');
    ring.addEventListener('animationend', (() => ring.remove()));
    $('cd-stage').appendChild(ring);
    const stage = $('cd-stage');
    stage.classList.remove('hit');
    void stage.offsetWidth;
    stage.classList.add('hit');
}

function startCountdown(playing) {
    counting = true;
    countTimers.forEach(clearTimeout);
    const box = $('countdown');
    box.dataset.game = playing;
    box.classList.remove('leaving');
    box.classList.add('on');
    $('cd-art').src = posterUrl(playing);
    $('cd-title').textContent = word('game_' + playing, playing);
    $('cd-stage').textContent = '';
    [ 3, 2, 1 ].forEach(((number, i) => countTimers.push(setTimeout((() => {
        countMark(String(number), `cd-number cd-${number}`);
        playSound('count', i);
    }), i * COUNT_STEP_MS))));
    countTimers.push(setTimeout((() => {
        countMark(word('go_' + playing, 'Go!'), 'cd-word');
        playSound('go_' + playing);
    }), 3 * COUNT_STEP_MS));
    countTimers.push(setTimeout((() => {
        box.classList.remove('on', 'leaving');
        counting = false;
    }), COUNT_END_MS));
}

function liftCountdown() {
    if (counting) $('countdown').classList.add('leaving');
}