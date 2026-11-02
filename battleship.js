const CELL_CLASS = {
    '.': 'cell',
    o: 'cell miss',
    x: 'cell hit',
    '#': 'cell sunk'
};

function drawBattleship(state) {
    const view = state.view, root = $('battleship');
    const name = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    root.textContent = '';
    root.appendChild(div('turn', view.winner ? word('won', '{name} won!').replace('{name}', name(view.winner)) : word('shoots', '{name} shoots').replace('{name}', name(view.turn))));
    const seas = div('seas');
    for (const owner of Object.keys(view.boards)) {
        const wrap = div('sea-wrap' + (!view.winner && owner === view.turn ? ' waiting' : ''));
        wrap.appendChild(div('sea-name', word('sea_of', 'Sea of {name}').replace('{name}', name(owner))));
        const sea = div('sea');
        sea.dataset.owner = owner;
        view.boards[owner].forEach(((row, y) => [ ...row ].forEach(((mark, x) => {
            const cell = div(CELL_CLASS[mark]);
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.appendChild(document.createElement('i'));
            if (view.last && owner !== view.last.by && view.last.x === x && view.last.y === y) cell.classList.add('last');
            sea.appendChild(cell);
        }))));
        wrap.appendChild(sea);
        seas.appendChild(wrap);
    }
    root.appendChild(seas);
    show('battleship');
}