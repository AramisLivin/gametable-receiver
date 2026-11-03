const ROAD_MIDDLE = 61;

const ROAD_STEP = 17;

const SQUAD_GAP = 8;

const SQUAD_TOUCH = 5;

const SQUAD_HALF = 5.5;

const BATTLE_MS = 3e3;

const SIEGE_TINTS = [ 'side-0', 'side-1' ];

let siegeNodes = null;

let siegeShown = 0;

let siegeOver = false;

let siegeTimers = [];

const frontAt = front => ROAD_MIDDLE + front * ROAD_STEP;

const place = (node, x) => {
    node.style.transform = `translate3d(${x}vh,0,0)`;
};

function buildSiege() {
    const root = $('siege');
    root.textContent = '';
    const nodes = {
        names: [],
        chips: [],
        castles: [],
        roads: []
    };
    const top = div('siege-top');
    const sideHead = side => {
        const head = div(`siege-head ${SIEGE_TINTS[side]}`);
        nodes.names[side] = div('siege-name');
        nodes.chips[side] = div('siege-chip');
        head.append(nodes.names[side], nodes.chips[side]);
        return head;
    };
    const middle = div('siege-middle');
    nodes.round = div('siege-round');
    nodes.clock = div('siege-clock');
    middle.append(nodes.round, nodes.clock);
    top.append(sideHead(0), middle, sideHead(1));
    root.appendChild(top);
    const field = div('siege-field');
    for (const side of [ 0, 1 ]) {
        const castle = div(`castle castle-${side} ${SIEGE_TINTS[side]}`);
        const towers = [ 0, 1 ].map((i => div(`castle-tower castle-tower-${i}`)));
        const hp = div('castle-hp');
        const bar = div('castle-bar');
        const fill = document.createElement('i');
        bar.appendChild(fill);
        castle.append(...towers, hp, bar);
        nodes.castles[side] = {
            node: castle,
            hp: hp,
            fill: fill,
            value: null
        };
        field.appendChild(castle);
    }
    for (let lane = 0; lane < 3; lane++) {
        const road = div(`road road-${lane}`);
        const land = [ div('road-land road-land-0 side-0'), div('road-land road-land-1 side-1') ];
        const front = div('road-front');
        road.append(...land, front);
        const squads = [], walls = [], powers = [];
        for (const side of [ 0, 1 ]) {
            const squad = div(`squad ${SIEGE_TINTS[side]}`);
            const count = document.createElement('b');
            squad.appendChild(count);
            const wall = div(`road-wall ${SIEGE_TINTS[side]}`);
            const power = div(`road-power ${SIEGE_TINTS[side]}`);
            road.append(wall, squad, power);
            squads[side] = {
                node: squad,
                count: count
            };
            walls[side] = wall;
            powers[side] = power;
        }
        nodes.roads[lane] = {
            node: road,
            land: land,
            front: front,
            squads: squads,
            walls: walls,
            powers: powers
        };
        field.appendChild(road);
    }
    root.appendChild(field);
    nodes.effects = div('siege-effects');
    root.appendChild(nodes.effects);
    siegeNodes = nodes;
}

function setFront(road, front) {
    const x = frontAt(front);
    place(road.front, x);
    road.land[0].style.transform = `scaleX(${x / (ROAD_MIDDLE * 2)})`;
    road.land[1].style.transform = `scaleX(${1 - x / (ROAD_MIDDLE * 2)})`;
}

function setSquad(road, side, count, x) {
    const squad = road.squads[side];
    squad.count.textContent = count;
    squad.node.classList.toggle('gone', count <= 0);
    place(squad.node, x - SQUAD_HALF);
}

const squadX = (front, side) => frontAt(front) + (side ? SQUAD_GAP : -SQUAD_GAP);

function setCastle(side, value, most) {
    const castle = siegeNodes.castles[side];
    if (castle.value === value) return;
    castle.value = value;
    castle.hp.textContent = value;
    castle.fill.style.transform = `scaleX(${value / most})`;
}

function setMap(view) {
    view.lanes.forEach(((lane, i) => {
        const road = siegeNodes.roads[i];
        road.node.classList.remove('live');
        setFront(road, lane.front);
        for (const side of [ 0, 1 ]) {
            setSquad(road, side, lane.soldiers[side], squadX(lane.front, side));
            road.walls[side].classList.remove('on');
            road.powers[side].classList.remove('on');
        }
    }));
    view.castles.forEach(((value, side) => setCastle(side, value, view.castle)));
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

function bump(node, cls) {
    node.classList.remove(cls);
    void node.offsetWidth;
    node.classList.add(cls);
}

function flyAlong(road, side, toX) {
    const stone = div(`road-stone ${SIEGE_TINTS[side]}`);
    place(stone, side ? ROAD_MIDDLE * 2 : 0);
    road.node.appendChild(stone);
    void stone.offsetWidth;
    place(stone, toX);
    later(450, (() => stone.remove()));
}

function callout(text, cls = 'callout-hit') {
    const node = div(`callout ${cls}`, text);
    node.addEventListener('animationend', (() => node.remove()));
    siegeNodes.effects.appendChild(node);
}

function playBattle(battle, start, view) {
    const road = siegeNodes.roads[battle.lane];
    const force = [ 0, 1 ].map((side => battle.stood[side] + battle.sent[side]));
    const fighting = [ 0, 1 ].map((side => force[side] - battle.shot[side]));
    const at = (ms, action) => later(start + ms, action);
    at(0, (() => {
        road.node.classList.add('live');
        for (const side of [ 0, 1 ]) {
            setSquad(road, side, force[side], squadX(battle.from, side));
            if (battle.sent[side]) bump(road.squads[side].node, 'pop');
        }
        if (battle.sent[0] || battle.sent[1]) playSound('place');
    }));
    at(600, (() => {
        for (const side of [ 0, 1 ]) {
            if (battle.walls[side]) {
                place(road.walls[side], frontAt(battle.from) + (side ? 1.5 : -4.1));
                road.walls[side].classList.add('on');
            }
            if (!battle.catapults[side]) continue;
            const target = 1 - side;
            flyAlong(road, side, squadX(battle.from, target) - SQUAD_HALF);
            playSound('fire');
            later(400, (() => {
                setSquad(road, target, fighting[target], squadX(battle.from, target));
                bump(road.squads[target].node, 'struck');
                playSound('miss');
            }));
        }
    }));
    at(1350, (() => {
        for (const side of [ 0, 1 ]) {
            const power = road.powers[side];
            power.textContent = battle.strength[side];
            power.classList.add('on');
            place(power, squadX(battle.from, side) - SQUAD_HALF);
            if (fighting[side]) setSquad(road, side, fighting[side], frontAt(battle.from) + (side ? SQUAD_TOUCH : -SQUAD_TOUCH));
        }
    }));
    at(1900, (() => {
        const won = battle.won;
        if (won === null) {
            for (const side of [ 0, 1 ]) setSquad(road, side, 0, frontAt(battle.from));
            if (fighting[0] || fighting[1]) playSound('miss');
            return;
        }
        const lost = 1 - won;
        const standing = battle.left[won] + battle.hit;
        setSquad(road, lost, 0, frontAt(battle.from));
        if (fighting[lost]) bump(road.squads[won].node, 'struck');
        setFront(road, battle.to);
        setSquad(road, won, standing, squadX(battle.to, won));
        if (fighting[0] && fighting[1]) playSound('hit');
    }));
    if (battle.hit) {
        at(2300, (() => {
            const won = battle.won, target = 1 - won;
            setSquad(road, won, 0, won ? 0 : ROAD_MIDDLE * 2);
            const castle = siegeNodes.castles[target];
            const before = castle.value;
            setCastle(target, Math.max(0, before - battle.hit), view.castle);
            bump(castle.node, 'shake');
            blastOn(target, before - battle.hit <= 5);
            callout(`−${battle.hit}`, 'callout-sunk');
            playSound('sunk');
        }));
    }
    at(BATTLE_MS - 100, (() => {
        road.node.classList.remove('live');
        for (const side of [ 0, 1 ]) {
            road.walls[side].classList.remove('on');
            road.powers[side].classList.remove('on');
        }
    }));
}

function drawSiege(state) {
    const view = state.view;
    if (!siegeNodes) buildSiege();
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    view.sides.forEach(((id, side) => {
        siegeNodes.names[side].textContent = nameOf(id);
        const chip = siegeNodes.chips[side];
        chip.textContent = view.phase === 'planning' && view.ready[side] ? word('siege_ready', 'Ready') : '';
        chip.classList.toggle('on', view.phase === 'planning' && view.ready[side]);
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
        setMap(view);
        lightHalf(-1);
    } else if (view.phase === 'showing' && siegeShown !== view.round) {
        siegeShown = view.round;
        view.report.filter((battle => battle.fought)).forEach(((battle, i) => playBattle(battle, 200 + i * BATTLE_MS, view)));
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