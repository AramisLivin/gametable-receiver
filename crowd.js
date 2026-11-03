const CROWD_SCALE = 152 / 1e3;

let crowdNodes = null;

let crowdRound = 0;

let crowdPhase = null;

let crowdStabSeen = 0;

function stopCrowd() {
    crowdNodes = null;
    crowdRound = 0;
    crowdPhase = null;
    crowdStabSeen = 0;
}

const crowdPx = value => value * CROWD_SCALE;

function buildCrowd(view) {
    const root = $('crowd');
    root.textContent = '';
    const top = div('crowd-top');
    const scores = div('crowd-scores');
    const clock = div('crowd-clock');
    top.append(scores, clock);
    const field = div('crowd-field');
    const flags = view.flags.map((flag => {
        const node = div('crowd-flag');
        const size = crowdPx(flag.radius * 2);
        node.style.left = `${crowdPx(flag.x) - size / 2}vh`;
        node.style.top = `${crowdPx(flag.y) - size / 2}vh`;
        node.style.width = node.style.height = `${size}vh`;
        field.appendChild(node);
        return node;
    }));
    root.append(top, field, div('siege-effects'));
    crowdNodes = {
        scores: scores,
        clock: clock,
        field: field,
        flags: flags,
        figures: new Map,
        effects: root.querySelector('.siege-effects'),
        scoreNodes: {}
    };
    for (const [side, id] of view.sides.entries()) {
        const score = div(`crowd-score side-${side}`);
        const name = document.createElement('span');
        const points = document.createElement('b');
        score.append(name, points);
        scores.appendChild(score);
        crowdNodes.scoreNodes[id] = {
            name: name,
            points: points
        };
    }
}

function crowdCall(text, brief) {
    crowdNodes.effects.querySelectorAll('.crowd-call').forEach((old => old.remove()));
    const note = div('crowd-call' + (brief ? ' brief' : ''), text);
    if (brief) note.addEventListener('animationend', (() => note.remove()));
    crowdNodes.effects.appendChild(note);
}

function drawCrowd(state) {
    const view = state.view;
    if (!crowdNodes) buildCrowd(view);
    const nodes = crowdNodes;
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    const newRound = view.round !== crowdRound;
    if (newRound) {
        crowdRound = view.round;
        crowdStabSeen = 0;
        nodes.figures.forEach((node => node.remove()));
        nodes.figures.clear();
        nodes.effects.textContent = '';
    }
    const revealed = new Set(view.revealed);
    const owners = new Map(view.who ? Object.entries(view.who).map((([id, figure]) => [ figure, view.sides.indexOf(id) ])) : []);
    for (const figure of view.figures) {
        let node = nodes.figures.get(figure.id);
        if (!node) {
            node = div('crowd-figure jump');
            node.style.transform = `translate3d(${crowdPx(figure.x)}vh,${crowdPx(figure.y)}vh,0)`;
            nodes.field.appendChild(node);
            nodes.figures.set(figure.id, node);
            void node.offsetWidth;
            node.classList.remove('jump');
        } else {
            node.style.transform = `translate3d(${crowdPx(figure.x)}vh,${crowdPx(figure.y)}vh,0)`;
        }
        node.classList.toggle('dead', !figure.alive);
        node.classList.toggle('revealed', revealed.has(figure.id));
        const side = owners.get(figure.id);
        if (side !== undefined && !node.classList.contains(`side-${side}`)) node.classList.add(`side-${side}`);
    }
    view.flags.forEach(((flag, i) => nodes.flags[i].classList.toggle('busy', flag.busy)));
    for (const id of view.sides) {
        nodes.scoreNodes[id].name.textContent = nameOf(id);
        nodes.scoreNodes[id].points.textContent = view.points[id];
    }
    for (const stab of view.stabs) {
        if (stab.seq <= crowdStabSeen) continue;
        crowdStabSeen = stab.seq;
        const splash = div('crowd-splash');
        splash.style.left = `${crowdPx(stab.x)}vh`;
        splash.style.top = `${crowdPx(stab.y) - 3}vh`;
        splash.addEventListener('animationend', (() => splash.remove()));
        nodes.field.appendChild(splash);
        playSound(stab.real ? 'sunk' : 'hit');
        crowdCall(word(stab.real ? 'crowd_kill' : 'crowd_stab', stab.real ? 'Got them!' : 'A wrong stab!'), true);
        if (!stab.real) blastOn(stab.x < 500 ? 0 : 1, false);
    }
    nodes.clock.classList.toggle('words', !!away || view.phase !== 'playing');
    nodes.clock.classList.toggle('urgent', view.phase === 'playing' && view.clock <= 10 && !away);
    nodes.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'over' ? view.winner === 'draw' ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner)) : view.phase === 'between' ? word('crowd_round', 'Round {n}').replace('{n}', view.round) : view.clock;
    if (view.phase !== crowdPhase || newRound) {
        if (view.phase === 'between') {
            crowdCall(view.roundWinner ? word('crowd_won', '{name} wins the round!').replace('{name}', nameOf(view.roundWinner)) : word('crowd_none', "Time's up"));
            playSound(view.roundWinner ? 'ready' : 'miss');
        } else if (view.phase === 'playing') {
            nodes.effects.querySelectorAll('.crowd-call').forEach((old => old.remove()));
            lightHalf(-1);
        } else if (view.phase === 'over') {
            const winner = view.sides.indexOf(view.winner);
            lightHalf(winner < 2 ? winner : -1);
            playSound('win');
            if (winner >= 0) drawVictory(nodes.effects, '');
        }
        crowdPhase = view.phase;
    }
    show('crowd');
}