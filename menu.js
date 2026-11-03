let menuVideoOf = null;

let menuShown = null;

function playMenuVideo(id) {
    if (id === menuVideoOf) return;
    menuVideoOf = id;
    const video = $('menu-video');
    $('menu-frame').classList.remove('has-video');
    if (id) {
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

function drawMenu(state) {
    const game = state.games.find((g => g.id === state.browsing)) || state.games[0];
    const title = word('game_' + game.id, game.id);
    $('lobby-title').textContent = word('table', 'At the table');
    const seats = $('seats');
    seats.textContent = '';
    for (const p of state.players) {
        seats.appendChild(div('seat' + (p.online ? '' : ' off') + (p.id === state.host ? ' host' : ''), p.name));
    }
    $('menu-plate').textContent = title;
    $('menu-title').textContent = title;
    $('menu-meta').textContent = [ playersText(game), word('length_' + game.id, '') ].filter(Boolean).join(' · ');
    $('menu-about').textContent = word('about_' + game.id, '');
    $('lobby-hint').textContent = word('host_picks', 'The first player picks a game on the phone');
    $('menu-frame').classList.toggle('soon', !!game.soon);
    if (game.id !== menuShown) {
        menuShown = game.id;
        const info = $('menu-info');
        info.classList.remove('fresh');
        void info.offsetWidth;
        info.classList.add('fresh');
    }
    const tiles = $('menu-tiles');
    tiles.textContent = '';
    for (const g of state.games) {
        const tile = div('menu-tile' + (g.id === game.id ? ' chosen' : '') + (g.soon ? ' soon' : ''));
        tile.appendChild(div('menu-tile-name', word('game_' + g.id, g.id)));
        tile.appendChild(div('menu-tile-note', g.soon ? word('soon', 'Coming soon') : playersText(g)));
        tiles.appendChild(tile);
    }
    playMenuVideo(game.soon ? null : game.id);
    show('lobby');
}