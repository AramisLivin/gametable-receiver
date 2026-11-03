const SUB_ARROWS = {
    N: '↑',
    E: '→',
    S: '↓',
    W: '←'
};

let subNodes = null;

let subSeen = 0;

let subOver = false;

function stopSubmarine() {
    subNodes = null;
    subSeen = 0;
    subOver = false;
}

function buildSubmarine(view) {
    const root = $('submarine');
    root.textContent = '';
    const top = div('sub-top');
    const status = div('sub-status');
    const clock = div('sub-clock');
    top.append(status, clock);
    const field = div('sub-field');
    const sideNodes = [ 0, 1 ].map((side => {
        const box = div(`sub-side side-${side}`);
        const name = div('sub-side-name');
        const hull = div('sub-hull');
        for (let i = 0; i < view.hullMax; i++) hull.appendChild(document.createElement('i'));
        const ready = div('sub-ready');
        const course = div('sub-course');
        box.append(name, hull, ready, course);
        return {
            box: box,
            name: name,
            hull: hull,
            ready: ready,
            course: course
        };
    }));
    const map = div('sub-map');
    const cells = [];
    view.map.forEach((row => [ ...row ].forEach((mark => {
        const cell = div('sub-cell' + (mark === '.' ? '' : ' island'));
        cells.push(cell);
        map.appendChild(cell);
    }))));
    for (let n = 0; n < 9; n++) {
        const label = div('sub-sector-label', String(n + 1));
        label.style.left = `${n % 3 * 33.33}%`;
        label.style.top = `${Math.floor(n / 3) * 33.33}%`;
        map.appendChild(label);
    }
    map.appendChild(div('sub-sector-lines'));
    field.append(sideNodes[0].box, map, sideNodes[1].box);
    root.append(top, field, div('siege-effects'));
    subNodes = {
        status: status,
        clock: clock,
        sides: sideNodes,
        map: map,
        cells: cells,
        effects: root.querySelector('.siege-effects')
    };
}

function subCall(text) {
    subNodes.effects.querySelectorAll('.sub-call').forEach((old => old.remove()));
    const note = div('sub-call', text);
    note.addEventListener('animationend', (() => note.remove()));
    subNodes.effects.appendChild(note);
}

function addCourse(side, text, special, fresh) {
    const step = div('sub-step' + (special ? ' special' : '') + (fresh ? ' fresh' : ''), text);
    const course = subNodes.sides[side].course;
    course.appendChild(step);
    while (course.children.length > 48) course.firstChild.remove();
}

function applySubEntry(entry, fresh, nameOf, view) {
    const who = nameOf(view.sides[entry.side]);
    if (entry.kind === 'move') {
        addCourse(entry.side, SUB_ARROWS[entry.dir], false, fresh);
        if (fresh) {
            subCall(`${who}: ${word('sub_' + entry.dir, entry.dir)}`);
            playSound('fire');
        }
    } else if (entry.kind === 'silent') {
        addCourse(entry.side, '?', true, fresh);
        if (fresh) {
            subCall(word('sub_silent', 'Silent run'));
            playSound('fire');
        }
    } else if (entry.kind === 'surface') {
        addCourse(entry.side, String(entry.sector + 1), true, fresh);
        if (fresh) {
            const glow = div('sub-sector-glow');
            glow.style.left = `${entry.sector % 3 * 33.33}%`;
            glow.style.top = `${Math.floor(entry.sector / 3) * 33.33}%`;
            glow.addEventListener('animationend', (() => glow.remove()));
            subNodes.map.appendChild(glow);
            subCall(word('sub_surface', 'Surfaced in sector {n}').replace('{n}', entry.sector + 1));
            playSound('ready');
        }
    } else if (entry.kind === 'sonar') {
        addCourse(entry.side, '))', true, fresh);
        if (fresh) {
            subCall(word('sub_sonar', 'Sonar'));
            playSound('ready');
        }
    } else if (entry.kind === 'torpedo') {
        addCourse(entry.side, '✕', true, fresh);
        const cell = subNodes.cells[entry.y * view.size + entry.x];
        const rival = 1 - entry.side;
        const hit = entry.damage[rival] > 0;
        const self = entry.damage[entry.side] > 0;
        const mark = div('sub-mark' + (hit || self ? ' hit' : ''));
        cell.appendChild(mark);
        if (fresh) {
            const blast = div('sub-blast');
            blast.addEventListener('animationend', (() => blast.remove()));
            cell.appendChild(blast);
            const line = entry.damage[rival] >= 2 ? word('sub_direct', 'Direct hit!') : hit ? word('sub_near', 'Near hit!') : self ? word('sub_self', 'Hit by their own blast!') : word('sub_miss', 'Miss');
            subCall(line);
            playSound(hit || self ? entry.damage[rival] >= 2 ? 'sunk' : 'hit' : 'miss');
            if (hit) blastOn(rival, entry.damage[rival] >= 2);
            if (self) blastOn(entry.side, false);
        }
    }
}

function drawSubmarine(state) {
    const view = state.view;
    if (!subNodes) buildSubmarine(view);
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    view.sides.forEach(((id, side) => {
        const node = subNodes.sides[side];
        node.name.textContent = nameOf(id);
        node.box.classList.toggle('active', view.turn === side);
        [ ...node.hull.children ].forEach(((pip, i) => pip.classList.toggle('gone', i >= view.hull[side])));
        node.ready.textContent = view.phase === 'placing' && view.ready[side] ? word('sub_ready', 'Ready') : '';
    }));
    subNodes.status.textContent = view.phase === 'placing' ? word('sub_placing', 'Submarines are diving') : view.phase === 'over' ? view.winner === 'draw' ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner)) : word('sub_turn', '{name}: their move').replace('{name}', nameOf(view.sides[view.turn]));
    subNodes.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'playing' ? view.clock : '';
    subNodes.clock.classList.toggle('urgent', view.phase === 'playing' && view.clock <= 5 && !away);
    const start = view.logCount - view.log.length;
    for (let n = Math.max(subSeen, start); n < view.logCount; n++) applySubEntry(view.log[n - start], true, nameOf, view);
    if (view.logCount < subSeen || view.phase === 'placing' && subSeen) {
        stopSubmarine();
        drawSubmarine(state);
        return;
    }
    subSeen = view.logCount;
    if (view.phase === 'placing') lightHalf(-1); else if (view.phase === 'playing') lightHalf(1 - view.turn);
    if (view.phase === 'over' && !subOver) {
        subOver = true;
        view.positions.forEach(((at, side) => {
            for (const cell of view.wakes[side]) subNodes.cells[cell].classList.add(`wake-${side}`);
            subNodes.cells[at].classList.add(`at-${side}`);
        }));
        const winner = view.sides.indexOf(view.winner);
        lightHalf(winner);
        playSound('win');
        if (winner >= 0) drawVictory(subNodes.effects, '');
    }
    show('submarine');
}