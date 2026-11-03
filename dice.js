let diceBuilt = false;

let diceKey = null;

let diceTimers = [];

const PIPS = {
    1: [ [ 50, 50 ] ],
    2: [ [ 28, 28 ], [ 72, 72 ] ],
    3: [ [ 28, 28 ], [ 50, 50 ], [ 72, 72 ] ],
    4: [ [ 28, 28 ], [ 72, 28 ], [ 28, 72 ], [ 72, 72 ] ],
    5: [ [ 28, 28 ], [ 72, 28 ], [ 50, 50 ], [ 28, 72 ], [ 72, 72 ] ],
    6: [ [ 28, 24 ], [ 72, 24 ], [ 28, 50 ], [ 72, 50 ], [ 28, 76 ], [ 72, 76 ] ]
};

function dieNode(face, cls = '') {
    const die = div(`die ${cls}` + (face === 1 ? ' wild' : ''));
    for (const [x, y] of PIPS[face] || []) {
        const pip = document.createElement('i');
        pip.style.left = `${x}%`;
        pip.style.top = `${y}%`;
        die.appendChild(pip);
    }
    return die;
}

function stopDice() {
    diceTimers.forEach(clearTimeout);
    diceTimers = [];
    diceKey = null;
    diceBuilt = false;
}

function diceLater(ms, action) {
    diceTimers.push(setTimeout(action, ms));
}

function buildDice() {
    const root = $('dice');
    root.textContent = '';
    const top = div('dice-top');
    top.append(div('dice-round'), div('dice-clock'));
    root.append(top, div('dice-table'), div('dice-seats'), div('siege-effects'));
    diceBuilt = true;
}

function drawDiceTable(view, nameOf) {
    const table = $('dice').querySelector('.dice-table');
    table.textContent = '';
    if (view.bid) {
        const bid = div('dice-bid fresh');
        bid.append(`${view.bid.count} ×`, dieNode(view.bid.face));
        table.append(bid, div('dice-by', word('dice_by', 'says {name}').replace('{name}', nameOf(view.bid.by))));
        const history = div('dice-history');
        for (const old of view.history.slice(-6, -1)) {
            const item = document.createElement('span');
            item.textContent = `${nameOf(old.by)}: ${old.count} × ${old.face}`;
            history.appendChild(item);
        }
        table.appendChild(history);
    } else if (view.phase === 'bidding') {
        table.appendChild(div('dice-by', word('dice_no_bid', 'No claim yet')));
    }
}

function drawSeats(view, nameOf, showing) {
    const seats = $('dice').querySelector('.dice-seats');
    seats.textContent = '';
    let wait = 0;
    const step = showing ? Math.min(180, 3200 / Math.max(1, Object.values(showing.dice).flat().length)) : 0;
    view.sides.forEach((id => {
        const out = view.counts[id] === 0 && !(showing && showing.dice[id].length);
        const seat = div('dice-seat' + (view.phase === 'bidding' && view.turn === id ? ' active' : '') + (out ? ' out' : '') + (showing && showing.loser === id ? ' loser' : ''));
        seat.appendChild(div('dice-seat-name', nameOf(id)));
        const row = div('dice-row');
        if (showing) {
            for (const face of showing.dice[id]) {
                const match = face === showing.face || face === 1;
                const die = dieNode(face, match ? 'match' : '');
                if (match) {
                    die.style.setProperty('--wait', `${wait * step}ms`);
                    wait++;
                }
                row.appendChild(die);
            }
        } else if (out) {
            row.appendChild(div('dice-by', word('dice_out', 'Out')));
        } else {
            for (let i = 0; i < view.counts[id]; i++) row.appendChild(div('die hidden'));
        }
        seat.appendChild(row);
        seats.appendChild(seat);
    }));
    return step;
}

function playResult(view, nameOf) {
    const result = view.result;
    const step = drawSeats(view, nameOf, result);
    const table = $('dice').querySelector('.dice-table');
    table.textContent = '';
    const bid = div('dice-bid');
    bid.append(`${result.count} ×`, dieNode(result.face));
    const counter = div('dice-by', word('dice_count', 'On the table: {n}').replace('{n}', 0));
    table.append(bid, counter);
    playSound('ready');
    for (let n = 1; n <= result.actual; n++) {
        diceLater(n * step, (() => {
            counter.textContent = word('dice_count', 'On the table: {n}').replace('{n}', n);
            playSound('fire');
        }));
    }
    diceLater((result.actual + 1) * step + 300, (() => {
        const lines = [];
        if (result.kind === 'exact') lines.push(result.right ? word('dice_exact', 'Exactly right!') : word('dice_exact_no', 'Not exactly')); else lines.push(word(result.right ? 'dice_liar' : 'dice_truth', '{name}').replace('{name}', nameOf(result.bidder)));
        if (result.loser) lines.push(word('dice_loses', '{name} loses a die').replace('{name}', nameOf(result.loser))); else if (result.gainer) lines.push(word('dice_gains', '{name} wins a die back').replace('{name}', nameOf(result.gainer))); else lines.push(word('dice_nothing', 'Nobody loses a die'));
        table.appendChild(div('dice-verdict', lines.join(' · ')));
        playSound(result.loser ? 'hit' : 'win');
    }));
}

function drawDice(state) {
    const view = state.view;
    if (!diceBuilt) buildDice();
    const root = $('dice');
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    const clock = root.querySelector('.dice-clock');
    clock.textContent = view.phase === 'over' ? '' : away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.clock;
    clock.classList.toggle('urgent', view.phase === 'bidding' && view.clock <= 5 && !away);
    root.querySelector('.dice-round').textContent = word('dice_round', 'Round {n}').replace('{n}', view.round);
    const key = `${view.phase}|${view.round}|${view.history.length}|${view.turn}|${state.players.map((p => p.name)).join()}`;
    if (key !== diceKey) {
        diceKey = key;
        diceTimers.forEach(clearTimeout);
        diceTimers = [];
        if (view.phase === 'reveal') {
            playResult(view, nameOf);
        } else if (view.phase === 'over') {
            drawSeats(view, nameOf, null);
            const table = root.querySelector('.dice-table');
            table.textContent = '';
            const name = view.winner === 'draw' ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner));
            table.appendChild(div('dice-verdict', name));
            playSound('win');
            drawVictory(root.querySelector('.siege-effects'), '');
        } else {
            root.querySelector('.siege-effects').textContent = '';
            drawDiceTable(view, nameOf);
            drawSeats(view, nameOf, null);
            if (view.history.length) playSound('place');
        }
    }
    show('dice');
}