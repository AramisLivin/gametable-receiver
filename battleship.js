const CELL_CLASS = {
    '.': 'cell',
    S: 'cell ship',
    o: 'cell miss',
    x: 'cell hit',
    '#': 'cell sunk'
};

let seenBoards = null;

let seenWinner = null;

const SINK_STEP_MS = 320;

function sunkSizes(rows) {
    const left = new Set;
    rows.forEach(((row, y) => [ ...row ].forEach(((mark, x) => {
        if (mark === '#') left.add(y * 10 + x);
    }))));
    const sizes = [];
    while (left.size) {
        const stack = [ left.values().next().value ];
        left.delete(stack[0]);
        let size = 0;
        while (stack.length) {
            const cell = stack.pop();
            size++;
            const neighbours = [ cell - 10, cell + 10 ];
            if (cell % 10 > 0) neighbours.push(cell - 1);
            if (cell % 10 < 9) neighbours.push(cell + 1);
            for (const next of neighbours) if (left.delete(next)) stack.push(next);
        }
        sizes.push(size);
    }
    return sizes;
}

function blastOn(index, sunk) {
    const half = document.querySelectorAll('.half')[index];
    if (!half) return;
    const light = div('blast' + (sunk ? ' blast-sunk' : ''));
    light.addEventListener('animationend', (() => light.remove()));
    half.appendChild(light);
}

function drawTally(fleet, rows, before) {
    const sunk = sunkSizes(rows);
    const sunkBefore = before ? sunkSizes(before) : [];
    const count = (list, size) => list.filter((s => s === size)).length;
    const tally = div('tally');
    let nth = 0;
    fleet.forEach(((size, i) => {
        nth = i && fleet[i - 1] === size ? nth + 1 : 0;
        const gone = nth < count(sunk, size);
        const ship = div('tally-ship' + (nth ? '' : ' class-start') + (gone ? ' gone' : '') + (gone && nth >= count(sunkBefore, size) ? ' fx-gone' : ''));
        for (let deck = 0; deck < size; deck++) {
            const node = document.createElement('i');
            if (gone) node.style.setProperty('--wait', `${deck * SINK_STEP_MS}ms`);
            ship.appendChild(node);
        }
        tally.appendChild(ship);
    }));
    return tally;
}

function drawTableSea(owner, rows, before, last) {
    const sea = div('sea');
    sea.dataset.owner = owner;
    const letters = word('letters', 'ABCDEFGHIJ');
    sea.appendChild(div('mark'));
    for (const letter of letters) sea.appendChild(div('mark', letter));
    const sinking = last && last.result === 'sunk';
    let shipDown = 0;
    if (before && sinking) rows.forEach(((row, y) => [ ...row ].forEach(((mark, x) => {
        if (mark === '#' && before[y][x] !== '#') shipDown = Math.max(shipDown, Math.abs(x - last.x) + Math.abs(y - last.y) + 1);
    }))));
    rows.forEach(((row, y) => {
        sea.appendChild(div('mark', String(y + 1)));
        [ ...row ].forEach(((mark, x) => {
            const cell = div(CELL_CLASS[mark]);
            cell.dataset.x = x;
            cell.dataset.y = y;
            cell.appendChild(document.createElement('i'));
            const was = before && before[y][x];
            if (was && was !== mark) {
                if (mark === 'S') cell.classList.add('revealed'); else if (mark === '#') {
                    cell.classList.add('fx-sunk');
                    cell.style.setProperty('--wait', `${(Math.abs(x - last.x) + Math.abs(y - last.y)) * SINK_STEP_MS}ms`);
                    cell.appendChild(div('smoke'));
                } else if (mark === 'x') cell.classList.add('fx-hit'); else if (sinking) {
                    cell.classList.add('fx-clear');
                    cell.style.setProperty('--wait', `${shipDown * SINK_STEP_MS + (x + y) * 20}ms`);
                } else cell.classList.add('fx-miss');
            }
            if (last && last.x === x && last.y === y) cell.appendChild(div('reticle'));
            sea.appendChild(cell);
        }));
    }));
    if (before && last && last.result !== 'miss' && rows.join() !== before.join()) sea.classList.add('shake');
    return sea;
}

function drawVictory(root, note) {
    const box = div('victory');
    const inner = div('victory-card');
    inner.appendChild(div('victory-note', note));
    box.appendChild(inner);
    const colors = [ '#f2c14e', '#f6efdc', '#ff6a3d', '#7fb7d8' ];
    for (let i = 0; i < 36; i++) {
        const piece = document.createElement('i');
        piece.className = 'confetti';
        piece.style.left = `${Math.random() * 100}%`;
        piece.style.background = colors[i % colors.length];
        piece.style.animationDelay = `${Math.random() * 1200}ms`;
        piece.style.animationDuration = `${2200 + Math.random() * 1800}ms`;
        box.appendChild(piece);
    }
    root.appendChild(box);
}

function lightHalf(index) {
    document.querySelectorAll('.half').forEach(((half, i) => half.classList.toggle('lit', i === index)));
}

let seenPlacing = null;

function drawPlacing(state) {
    const view = state.view, root = $('battleship');
    const name = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    root.textContent = '';
    root.appendChild(div('turn', word('placing', 'Fleets are setting out')));
    const docks = div('docks');
    let landed = 0, readied = false;
    for (const owner of Object.keys(view.placing)) {
        const now = view.placing[owner];
        const before = seenPlacing && seenPlacing[owner];
        const dock = div('dock' + (now.ready ? ' done' : ''));
        dock.appendChild(div('dock-name', name(owner)));
        const water = div('dock-water');
        const given = {};
        for (const size of view.fleet) {
            const nth = given[size] = (given[size] || 0) + 1;
            const count = placed => placed.filter((s => s === size)).length;
            const on = nth <= count(now.placed);
            const isNew = on && (!before || nth > count(before.placed));
            const ship = div('dock-ship' + (on ? ' on' : '') + (isNew && before ? ' landing' : ''));
            if (isNew && before) ship.style.animationDelay = `${landed * 70}ms`;
            if (isNew && before) landed++;
            for (let i = 0; i < size; i++) ship.appendChild(document.createElement('i'));
            if (isNew && before) {
                const splash = div('splash');
                splash.style.animationDelay = `${(landed - 1) * 70 + 220}ms`;
                ship.appendChild(splash);
            }
            water.appendChild(ship);
        }
        dock.appendChild(water);
        if (now.ready) {
            const fresh = before && !before.ready;
            if (fresh) readied = true;
            dock.appendChild(div('dock-ready' + (fresh ? ' stamp' : ''), word('ready', 'Fleet ready')));
        } else {
            dock.appendChild(div('dock-count', `${now.placed.length} / ${view.fleet.length}`));
        }
        docks.appendChild(dock);
    }
    root.appendChild(docks);
    lightHalf(-1);
    hideCannon();
    if (landed) playSound('place');
    if (readied) playSound('ready');
    seenPlacing = view.placing;
    seenBoards = null;
    seenWinner = null;
    show('battleship');
}

let landing = null;

function dropLanding() {
    if (landing) clearTimeout(landing.timer);
    landing = null;
    if (document.body.classList.contains('finale') && !artyNodes) openOut();
}

function drawBattleship(state) {
    if (landing) {
        const waiting = landing.state;
        dropLanding();
        paintBattleship(waiting);
    }
    const flight = shellFlight(state.view);
    if (!flight) {
        paintBattleship(state);
        return;
    }
    landing = {
        state: state,
        timer: setTimeout((() => {
            landing = null;
            paintBattleship(state);
        }), flight)
    };
}

const FINALE_SLOW = 9;

function closeInOn(owner, shot) {
    const root = $('battleship');
    const cell = root.querySelector(`.sea[data-owner="${owner}"] .cell[data-x="${shot.x}"][data-y="${shot.y}"]`);
    if (!cell || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const box = cell.getBoundingClientRect();
    letterbox(true);
    root.classList.add('closing-in');
    root.style.transformOrigin = `${box.left + box.width / 2}px ${box.top + box.height / 2}px`;
    root.style.transform = 'scale(1.55)';
}

function openOut() {
    const root = $('battleship');
    letterbox(false);
    root.style.transform = '';
}

function shellFlight(view) {
    if (view.phase !== 'playing' || !view.last || !seenBoards || view.winner) return 0;
    const owners = Object.keys(view.boards);
    if (!owners.some((owner => view.boards[owner].join() !== seenBoards[owner].join()))) return 0;
    const target = owners.find((owner => owner !== view.last.by));
    if (view.finale) closeInOn(target, view.last);
    return fireCannon(owners.indexOf(view.last.by), target, view.last.x, view.last.y, view.finale ? FINALE_SLOW : 1);
}

function paintBattleship(state) {
    const view = state.view, root = $('battleship');
    if (view.phase === 'placing') {
        drawPlacing(state);
        return;
    }
    const battleBegins = !!seenPlacing;
    seenPlacing = null;
    const name = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const owners = Object.keys(view.boards);
    const before = view.last ? seenBoards : null;
    const changed = before && owners.some((o => view.boards[o].join() !== before[o].join()));
    root.textContent = '';
    const banner = div('turn' + (view.winner ? ' over' : ''));
    banner.textContent = view.winner ? word('won', '{name} won!').replace('{name}', name(view.winner)) : word('shoots', '{name} shoots').replace('{name}', name(view.turn));
    root.appendChild(banner);
    const seas = div('seas');
    for (const owner of owners) {
        const wrap = div('sea-wrap' + (view.winner ? '' : owner === view.turn ? ' resting' : ' under-fire'));
        wrap.appendChild(div('sea-glow'));
        const title = div('sea-name', word('sea_of', 'Sea of {name}').replace('{name}', name(owner)));
        title.appendChild(div('sea-count', `${view.fleet.length - sunkSizes(view.boards[owner]).length} / ${view.fleet.length}`));
        wrap.appendChild(title);
        const shot = view.last && owner !== view.last.by ? view.last : null;
        wrap.appendChild(drawTableSea(owner, view.boards[owner], before && before[owner], shot));
        wrap.appendChild(drawTally(view.fleet, view.boards[owner], before && before[owner]));
        seas.appendChild(wrap);
    }
    root.appendChild(seas);
    lightHalf(view.winner ? owners.indexOf(view.winner) : owners.findIndex((owner => owner !== view.turn)));
    if (battleBegins) {
        root.appendChild(div('callout callout-sunk', word('battle', 'Battle!')));
        playSound('battle');
    }
    if (changed && !view.winner && view.last.result !== 'miss') blastOn(owners.findIndex((owner => owner !== view.last.by)), view.last.result === 'sunk');
    if (changed && !view.winner) {
        const result = view.last.result;
        const line = div('callout callout-' + result, word(result, {
            hit: 'Hit!',
            miss: 'Miss',
            sunk: 'Ship sunk!'
        }[result]));
        if (view.finale) {
            line.addEventListener('animationend', (() => line.remove()));
            document.body.appendChild(line);
        } else root.appendChild(line);
        playSound(result);
    }
    if (view.winner) {
        openOut();
        if (!seenWinner) playSound('win');
        drawVictory(root, word('fired', 'Shots fired: {n}').replace('{n}', view.fired[view.winner]));
    }
    seenBoards = view.boards;
    seenWinner = view.winner;
    placeCannon(owners.indexOf(view.winner || view.turn));
    show('battleship');
}