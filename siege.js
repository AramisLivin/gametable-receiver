const ROAD_MIDDLE = 61;

const SLOT_GAP = 2;

const SLOT_STEP = 13;

const SQUAD_WIDTH = 12;

const BEAT_MS = 900;

let siegeNodes = null;

let siegeShown = 0;

let siegeOver = false;

let siegeTimers = [];

const placeAt = (node, x) => {
    node.style.transform = `translate3d(${x}vh,0,0)`;
};

const slotX = (side, slot) => side ? ROAD_MIDDLE + SLOT_GAP + slot * SLOT_STEP : ROAD_MIDDLE - SLOT_GAP - SQUAD_WIDTH - slot * SLOT_STEP;

const castleX = side => side ? ROAD_MIDDLE * 2 : -SQUAD_WIDTH;

function buildSiege() {
    const root = $('siege');
    root.textContent = '';
    const nodes = {
        names: [],
        chips: [],
        towers: [],
        roads: [],
        squads: new Map
    };
    const top = div('siege-top');
    const head = side => {
        const box = div(`siege-head side-${side}`);
        nodes.names[side] = div('siege-name');
        nodes.chips[side] = div('siege-chip');
        box.append(nodes.names[side], nodes.chips[side]);
        return box;
    };
    const middle = div('siege-middle');
    nodes.round = div('siege-round');
    nodes.clock = div('siege-clock');
    middle.append(nodes.round, nodes.clock);
    top.append(head(0), middle, head(1));
    root.appendChild(top);
    const field = div('siege-field');
    for (const side of [ 0, 1 ]) {
        const castle = div(`castle castle-${side} side-${side}`);
        nodes.towers[side] = div('castle-hp');
        castle.appendChild(nodes.towers[side]);
        nodes.towers[side].castle = castle;
        field.appendChild(castle);
    }
    for (let lane = 0; lane < 3; lane++) {
        const road = div(`road road-${lane}`);
        const gates = [ 0, 1 ].map((side => div(`road-gate road-gate-${side} side-${side}`)));
        road.append(...gates);
        nodes.roads[lane] = {
            node: road,
            gates: gates,
            list: [ [], [] ]
        };
        field.appendChild(road);
    }
    root.appendChild(field);
    nodes.effects = div('siege-effects');
    root.appendChild(nodes.effects);
    siegeNodes = nodes;
}

function setGate(lane, side, value) {
    const gate = siegeNodes.roads[lane].gates[side];
    gate.textContent = value;
    gate.classList.toggle('down', value <= 0);
}

function makeSquad(road, side, kind) {
    const node = div(`squad side-${side}`);
    const card = div('squad-card');
    const hp = div('squad-hp');
    card.append(div('squad-name', word('card_' + kind, kind)), hp);
    node.appendChild(card);
    road.node.appendChild(node);
    return {
        node: node,
        hp: hp,
        side: side,
        lane: road
    };
}

function setMap(view) {
    const present = new Set;
    view.lanes.forEach(((sides, lane) => {
        const road = siegeNodes.roads[lane];
        sides.forEach(((squads, side) => {
            road.list[side] = squads.map(((squad, slot) => {
                present.add(squad.id);
                let shown = siegeNodes.squads.get(squad.id);
                if (!shown) {
                    shown = makeSquad(road, side, squad.kind);
                    siegeNodes.squads.set(squad.id, shown);
                }
                shown.hp.textContent = squad.hp;
                placeAt(shown.node, slotX(side, slot));
                return squad.id;
            }));
            setGate(lane, side, view.walls[side][lane]);
        }));
    }));
    for (const [id, shown] of siegeNodes.squads) {
        if (present.has(id)) continue;
        shown.node.remove();
        siegeNodes.squads.delete(id);
    }
    view.towers.forEach(((value, side) => {
        siegeNodes.towers[side].textContent = value;
    }));
}

function later(ms, action) {
    siegeTimers.push(setTimeout(action, ms));
}

function stopSiege() {
    siegeTimers.forEach(clearTimeout);
    siegeTimers = [];
    siegeNodes = null;
    siegeShown = 0;
    siegeOver = false;
}

function kick(node, cls) {
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
}

function floatOn(road, x, text) {
    const note = div('road-float', text);
    note.style.left = `${x}vh`;
    note.addEventListener('animationend', (() => note.remove()));
    road.node.appendChild(note);
}

function arrow(road, side, fromX, toX) {
    const stone = div(`road-stone side-${side}`);
    placeAt(stone, fromX + SQUAD_WIDTH / 2);
    road.node.appendChild(stone);
    void stone.offsetWidth;
    placeAt(stone, toX + SQUAD_WIDTH / 2);
    later(360, (() => stone.remove()));
}

function closeRanks(road) {
    [ 0, 1 ].forEach((side => road.list[side].forEach(((id, slot) => {
        const shown = siegeNodes.squads.get(id);
        if (shown) placeAt(shown.node, slotX(side, slot));
    }))));
}

function playBeat(events, lane, sounds) {
    const road = siegeNodes.roads[lane];
    for (const event of events) {
        if (event.e === 'enter') {
            const shown = makeSquad(road, event.side, event.kind);
            siegeNodes.squads.set(event.id, shown);
            shown.hp.textContent = event.hp;
            placeAt(shown.node, castleX(event.side));
            road.list[event.side].push(event.id);
            void shown.node.offsetWidth;
            sounds.add('place');
        } else if (event.e === 'ambush') {
            const note = div(`road-note side-${event.side}`, word('siege_ambush', 'Ambush!'));
            note.addEventListener('animationend', (() => note.remove()));
            road.node.appendChild(note);
            sounds.add('hit');
        } else if (event.e === 'hit') {
            const target = siegeNodes.squads.get(event.to);
            const attacker = event.by === null ? null : siegeNodes.squads.get(event.by);
            if (!target) continue;
            const slot = road.list[event.side].indexOf(event.to);
            const x = slotX(event.side, Math.max(0, slot));
            if (attacker) {
                if (event.ranged) {
                    const from = slotX(attacker.side, Math.max(0, road.list[attacker.side].indexOf(event.by)));
                    arrow(road, attacker.side, from, x);
                    sounds.add('fire');
                } else {
                    kick(attacker.node, `lunge-${attacker.side}`);
                    sounds.add('hit');
                }
            }
            target.hp.textContent = event.hp;
            kick(target.node, 'struck');
            floatOn(road, x, `−${event.damage}`);
            if (event.hp <= 0) {
                target.node.classList.add('dead');
                road.list[event.side] = road.list[event.side].filter((id => id !== event.to));
                later(400, (() => target.node.remove()));
                siegeNodes.squads.delete(event.to);
            }
        } else if (event.e === 'strike') {
            const attacker = siegeNodes.squads.get(event.id);
            if (attacker) kick(attacker.node, `lunge-${event.side}`);
            const rival = 1 - event.side;
            const before = +siegeNodes.towers[rival].textContent;
            setGate(lane, rival, event.wall);
            siegeNodes.towers[rival].textContent = event.tower;
            if (event.tower < before) {
                kick(siegeNodes.towers[rival].castle, 'shake');
                blastOn(rival, false);
                sounds.add('sunk');
            } else sounds.add('hit');
        }
    }
}

function playReport(view) {
    const beats = [ 0, 1, 2, 3, 4 ].filter((beat => view.report.some((lane => lane[beat].length))));
    beats.forEach(((beat, i) => {
        later(150 + i * BEAT_MS, (() => {
            const sounds = new Set;
            view.report.forEach(((lane, i) => playBeat(lane[beat], i, sounds)));
            siegeNodes.roads.forEach(closeRanks);
            sounds.forEach(playSound);
        }));
    }));
}

function drawSiege(state) {
    const view = state.view;
    if (!siegeNodes) buildSiege();
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    view.sides.forEach(((id, side) => {
        siegeNodes.names[side].textContent = nameOf(id);
        const on = view.phase === 'planning' && view.ready[side];
        siegeNodes.chips[side].textContent = on ? word('siege_ready', 'Ready') : '';
        siegeNodes.chips[side].classList.toggle('on', on);
    }));
    siegeNodes.round.textContent = word('siege_round', 'Round {n} of {m}').replace('{n}', view.round).replace('{m}', view.rounds);
    const clock = siegeNodes.clock;
    clock.textContent = view.phase === 'over' ? '' : away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'planning' ? view.clock : word('battle', 'Battle!');
    clock.classList.toggle('urgent', !away && view.phase === 'planning' && view.clock <= 5);
    clock.classList.toggle('words', !!away || view.phase !== 'planning');
    if (view.phase === 'planning') {
        if (view.round === 1 && siegeShown) {
            siegeShown = 0;
            siegeOver = false;
            siegeNodes.effects.textContent = '';
        }
        siegeTimers.forEach(clearTimeout);
        siegeTimers = [];
        setMap(view);
        lightHalf(-1);
    } else if (view.phase === 'showing' && siegeShown !== view.round) {
        siegeShown = view.round;
        playReport(view);
    } else if (view.phase === 'over') {
        const winner = view.sides.indexOf(view.winner);
        siegeNodes.round.textContent = '';
        clock.textContent = winner < 0 ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner));
        if (!siegeOver) {
            siegeOver = true;
            setMap(view);
            lightHalf(winner);
            playSound('win');
            if (winner >= 0) drawVictory(siegeNodes.effects, '');
        }
    }
    show('siege');
}