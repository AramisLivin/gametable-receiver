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
        tile.appendChild(name);
        tiles.appendChild(tile);
        const backdrop = div('menu-backdrop');
        backdrop.dataset.game = game.id;
        $('menu-backdrops').appendChild(backdrop);
        menuNodes.set(game.id, {
            tile: tile,
            name: name,
            backdrop: backdrop
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
    $('lobby-hint').textContent = online < game.min ? word($('join').classList.contains('on') ? 'need_more_scan' : 'need_more', 'Waiting for one more player') : word('host_picks_name', '{name} picks a game on the phone').replace('{name}', host ? host.name : '');
    for (const g of state.games) {
        const nodes = menuNodes.get(g.id);
        nodes.name.textContent = word('game_' + g.id, g.id);
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
    playMenuVideo(game.id);
    show('lobby');
}

let curtainFor = null;

function raiseCurtain(playing) {
    const was = curtainFor;
    curtainFor = playing || null;
    if (!playing || was || playing === 'recall') return;
    playSound('curtain');
    const curtain = $('curtain');
    curtain.dataset.game = playing;
    $('curtain-name').textContent = word('game_' + playing, playing);
    curtain.classList.remove('go');
    void curtain.offsetWidth;
    curtain.classList.add('go');
}

$('curtain').addEventListener('animationend', (event => {
    if (event.target === $('curtain')) $('curtain').classList.remove('go');
}));