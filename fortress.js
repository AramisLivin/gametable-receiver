const FT_K = 100 / 562;

const FT_COLOURS = [ '#7db7f0', '#f27d86', '#8fd16a', '#f2c14e' ];

const FT_UNITS = [ 'sword', 'knight', 'archer', 'fire', 'ice' ];

const FT_EFFECTS = [ 'arrow', 'fire', 'ice', 'bolt', 'rock', 'stomp', 'heal' ];

let ftNodes = null;

let ftBattle = null;

let ftFrame = 0;

let ftOver = false;

let ftShownWave = 0;

const ftSoundAt = {};

const ftX = x => x * FT_K;

const ftY = y => y * FT_K;

const ftAt = (x, y) => `translate3d(${ftX(x).toFixed(2)}vh,${ftY(y).toFixed(2)}vh,0)`;

const ftNums = text => text ? text.split(',').map(Number) : [];

function stopFortress() {
    cancelAnimationFrame(ftFrame);
    ftFrame = 0;
    ftNodes = null;
    ftBattle = null;
    ftOver = false;
    ftShownWave = 0;
    $('fortress').className = 'screen';
}

function ftSound(kind, every = 90, detail) {
    const now = performance.now();
    if (now - (ftSoundAt[kind] || 0) < every) return;
    ftSoundAt[kind] = now;
    playSound(kind, detail);
}

function ftWords(key, fallback, fill = {}) {
    let text = word(key, fallback);
    for (const [k, v] of Object.entries(fill)) text = text.replace('{' + k + '}', v);
    return text;
}

function ftMeadow(field, meadow) {
    for (let i = 0; i < 18; i++) {
        const tree = div('ft-tree');
        const far = i < 9;
        tree.style.left = far ? `${meadow - 7 + i % 2 * 3.6}vh` : `${10 + (i - 9) % 5 * (meadow - 24) / 5}vh`;
        tree.style.top = far ? `${i % 9 * 11.6 - 4}vh` : `${i < 14 ? -5.5 : 96.5}vh`;
        tree.style.setProperty('--s', (.8 + i * 37 % 10 / 20).toFixed(2));
        field.appendChild(tree);
    }
    for (let i = 0; i < 46; i++) {
        const kind = i % 7 === 0 ? 'ft-stone' : i % 3 === 0 ? 'ft-flower' : 'ft-tuft';
        const bit = div(kind);
        bit.style.left = `${3 + i * 53 % Math.floor(meadow - 14)}vh`;
        bit.style.top = `${3 + (i * 29 + i * i) % 93}vh`;
        if (kind === 'ft-flower') bit.style.setProperty('--petal', [ '#fff6c4', '#ffd2e0', '#e2d4ff', '#ffffff' ][i % 4]);
        field.appendChild(bit);
    }
    const clouds = div('ft-clouds');
    for (let i = 0; i < 3; i++) clouds.appendChild(div(`ft-cloud c${i}`));
    field.appendChild(clouds);
}

function ftWall(wall, view) {
    wall.appendChild(div('ft-cracks'));
    const rows = view.yards.length <= 2 ? view.yards.length : 2;
    const towers = view.gates.length === 1 ? [ .06, .94 ] : rows === 1 ? [ .06, .5, .94 ] : [ .05, .5, .95 ];
    for (const share of towers) {
        const tower = div('ft-tower');
        tower.style.top = `${share * 100}vh`;
        wall.appendChild(tower);
    }
    view.yards.forEach(((yard, side) => {
        const banner = div('ft-pennant');
        banner.style.setProperty('--tint', FT_COLOURS[side]);
        banner.style.top = `${ftY(yard.y + view.rows * view.cell * (.18 + side % 2 * .12))}vh`;
        banner.style.animationDelay = `${-side * .7}s`;
        wall.appendChild(banner);
    }));
    return view.gates.map((y => {
        const gate = div('ft-gate');
        gate.style.top = `${ftY(y)}vh`;
        const top = document.createElement('i'), bottom = document.createElement('i');
        gate.append(top, bottom);
        wall.appendChild(gate);
        return {
            y: y,
            leaves: [ top, bottom ],
            openUntil: 0
        };
    }));
}

function ftOpenGate(y) {
    const gates = ftNodes.gates;
    if (!gates.length) return;
    const gate = gates.reduce(((a, b) => Math.abs(a.y - y) <= Math.abs(b.y - y) ? a : b));
    const now = performance.now();
    if (now < gate.openUntil) return;
    gate.openUntil = now + 900;
    for (const leaf of gate.leaves) {
        leaf.animate([ {
            transform: 'none'
        }, {
            transform: 'scaleY(.12)',
            offset: .2
        }, {
            transform: 'scaleY(.12)',
            offset: .8
        }, {
            transform: 'none'
        } ], {
            duration: 900,
            easing: 'ease-in-out'
        });
    }
}

function buildFortress(view) {
    const root = $('fortress');
    root.textContent = '';
    const stage = div('ft-stage');
    const wallVh = ftX(view.wallX);
    const meadow = 177.78 - wallVh;
    const field = div('ft-field');
    field.style.left = `${wallVh}vh`;
    ftMeadow(field, meadow);
    const yard = div('ft-yard');
    yard.style.width = `${wallVh}vh`;
    const wall = div('ft-wall');
    wall.style.left = `${wallVh - 4.2}vh`;
    const gates = ftWall(wall, view);
    const bodies = div('ft-bodies');
    const engines = div('ft-engines');
    const effects = div('ft-effects');
    const fields = view.fields.map(((_, side) => {
        const box = div(`ft-plot side-${side}`);
        box.style.setProperty('--tint', FT_COLOURS[side]);
        const head = div('ft-plot-head');
        const name = div('ft-plot-name');
        const coins = div('ft-plot-coins');
        const sum = document.createElement('span');
        coins.append(ftCoin(), sum);
        const ready = div('ft-plot-ready', '✔');
        const choosing = div('ft-plot-choosing', '🃏');
        head.append(name, coins, ready, choosing);
        const grid = div('ft-grid');
        box.append(grid, head);
        yard.appendChild(box);
        return {
            box: box,
            name: name,
            coins: coins,
            sum: sum,
            ready: ready,
            grid: grid,
            key: null
        };
    }));
    const hud = div('ft-hud');
    hud.style.left = `${wallVh + 3}vh`;
    const waveBox = div('ft-wave');
    const wallBar = div('ft-wallbar');
    const wallFill = div('ft-wallbar-fill');
    const wallText = div('ft-wallbar-text');
    const wallArmor = div('ft-wallbar-armor');
    const armor = div('ft-armor');
    wallBar.append(wallFill, wallArmor, wallText, armor);
    const clock = div('ft-clock');
    hud.append(waveBox, wallBar, clock);
    const banner = div('ft-banner');
    banner.style.left = `${wallVh}vh`;
    banner.style.width = `${meadow}vh`;
    stage.append(field, yard, wall, engines, bodies, effects, hud, banner);
    root.appendChild(stage);
    ftNodes = {
        root: root,
        stage: stage,
        field: field,
        yard: yard,
        wall: wall,
        bodies: bodies,
        effects: effects,
        fields: fields,
        waveBox: waveBox,
        wallFill: wallFill,
        wallArmor: wallArmor,
        wallText: wallText,
        armor: armor,
        clock: clock,
        banner: banner,
        gates: gates,
        figures: new Map,
        shownWall: null,
        wallShownAt: 0,
        engines: engines,
        engineNodes: new Map,
        blocks: new Map,
        paydaySeen: view.payday ? view.payday.wave : null
    };
}

function drawEngines(view) {
    const seen = new Set;
    for (const engine of view.engines) {
        seen.add(engine.id);
        let node = ftNodes.engineNodes.get(engine.id);
        if (!node) {
            node = div(`ft-body ft-engine k-${engine.k}`);
            node.appendChild(ftArtImage('b_' + engine.k, FT_COLOURS[engine.side], 'ft-art', false, engine.lv));
            node.dataset.lv = engine.lv;
            node.classList.add('fresh');
            ftNodes.engines.appendChild(node);
            ftNodes.engineNodes.set(engine.id, node);
        }
        node.style.setProperty('--tint', FT_COLOURS[engine.side]);
        if (node.dataset.lv !== String(engine.lv)) {
            node.dataset.lv = engine.lv;
            node.firstChild.src = ftArt('b_' + engine.k, FT_COLOURS[engine.side], false, engine.lv);
        }
        node.classList.toggle('lv-2', engine.lv === 2);
        node.classList.toggle('lv-3', engine.lv === 3);
        node.classList.toggle('lv-4', engine.lv === 4);
        node.style.transform = ftAt(engine.x, engine.y);
        node.style.zIndex = Math.round(engine.y);
    }
    for (const [key, node] of ftNodes.engineNodes) {
        if (seen.has(key)) continue;
        node.remove();
        ftNodes.engineNodes.delete(key);
    }
}

function ftPiece(piece, size, tint, cards) {
    const block = div(`ft-block k-${piece.k} lv-${piece.lv}`);
    const xs = piece.cells.map((c => c[0])), ys = piece.cells.map((c => c[1]));
    const left = Math.min(...xs), top = Math.min(...ys);
    block.style.left = `${left * size}vh`;
    block.style.top = `${top * size}vh`;
    block.style.width = `${(Math.max(...xs) - left + 1) * size}vh`;
    block.style.height = `${(Math.max(...ys) - top + 1) * size}vh`;
    const has = new Set(piece.cells.map((([x, y]) => `${x},${y}`)));
    const gap = size * .07, round = size * .24;
    for (const [x, y] of piece.cells) {
        const up = has.has(`${x},${y - 1}`), down = has.has(`${x},${y + 1}`), back = has.has(`${x - 1},${y}`), on = has.has(`${x + 1},${y}`);
        const part = div('ft-part');
        part.style.left = `${(x - left) * size + (back ? 0 : gap)}vh`;
        part.style.top = `${(y - top) * size + (up ? 0 : gap)}vh`;
        part.style.width = `${size - (back ? 0 : gap) - (on ? 0 : gap)}vh`;
        part.style.height = `${size - (up ? 0 : gap) - (down ? 0 : gap)}vh`;
        const corner = (a, b) => a || b ? 0 : round;
        part.style.borderRadius = `${corner(up, back)}vh ${corner(up, on)}vh ${corner(down, on)}vh ${corner(down, back)}vh`;
        part.style.borderTopWidth = up ? '0' : '';
        part.style.borderBottomWidth = down ? '0' : '';
        part.style.borderLeftWidth = back ? '0' : '';
        part.style.borderRightWidth = on ? '0' : '';
        block.appendChild(part);
    }
    for (const image of ftBuildingImages(piece.k, piece.cells, tint, size, 'vh', piece.lv)) block.appendChild(image);
    block.style.zIndex = Math.max(...ys) + 1;
    if (cards) block.appendChild(div('ft-cardmark', `✦${cards > 1 ? cards : ''}`));
    if (FT_UNITS.includes(piece.k)) {
        const bar = div('ft-progress');
        bar.appendChild(document.createElement('i'));
        block.appendChild(bar);
    }
    return block;
}

function drawPlot(view, side, plot) {
    const data = view.fields[side];
    const key = JSON.stringify([ data.cells, data.pieces, data.cards ]);
    const cell = view.cell;
    plot.box.style.left = `${ftX(view.yards[side].x)}vh`;
    plot.box.style.top = `${ftY(view.yards[side].y)}vh`;
    plot.box.style.width = `${ftX(view.cols * cell)}vh`;
    plot.box.style.height = `${ftX(view.rows * cell)}vh`;
    if (key === plot.key) return;
    const before = plot.key ? new Map(JSON.parse(plot.key)[1].map((p => [ p.id, p ]))) : null;
    plot.key = key;
    plot.grid.textContent = '';
    const size = ftX(cell);
    for (const index of data.cells) {
        const tile = div('ft-tile');
        tile.style.transform = `translate(${index % view.cols * size}vh, ${Math.floor(index / view.cols) * size}vh)`;
        tile.style.width = tile.style.height = `${size}vh`;
        plot.grid.appendChild(tile);
    }
    for (const piece of data.pieces) {
        const block = ftPiece(piece, size, FT_COLOURS[side], data.cards[piece.k]);
        ftNodes.blocks.set(piece.id, block);
        const was = before && before.get(piece.id);
        if (before && (!was || was.lv !== piece.lv || was.x !== piece.x || was.y !== piece.y || was.turn !== piece.turn)) {
            block.classList.add(was && was.lv !== piece.lv ? 'merged' : 'fresh');
            ftSound(was && was.lv !== piece.lv ? 'ft_merge' : 'place', 120);
        }
        plot.grid.appendChild(block);
    }
}

function setWall(hp, armor, max, hit) {
    const now = performance.now();
    const total = hp + armor;
    if (hit && ftNodes.shownWall !== null && total < ftNodes.shownWall) {
        ftNodes.wall.animate([ {
            transform: 'none'
        }, {
            transform: 'translateX(-.35vh)'
        }, {
            transform: 'translateX(.2vh)'
        }, {
            transform: 'none'
        } ], {
            duration: 220
        });
        ftSound('ft_wall', 160);
    }
    ftNodes.shownWall = total;
    if (hit && hp > 0 && now - ftNodes.wallShownAt < 150) return;
    ftNodes.wallShownAt = now;
    const share = Math.max(0, hp) / max;
    ftNodes.wallFill.style.transform = `scaleX(${share})`;
    ftNodes.wallFill.classList.toggle('low', share < .34);
    ftNodes.wallText.textContent = `♥ ${Math.max(0, Math.round(hp))}${armor > 0 ? `   🛡 ${Math.round(armor)}` : ''}`;
    ftNodes.wallArmor.style.transform = `scaleX(${Math.min(1, armor / max)})`;
    ftNodes.wall.classList.toggle('armored', armor > 0);
    ftNodes.wall.classList.toggle('worn', share < .67);
    ftNodes.wall.classList.toggle('broken', share < .34);
    ftNodes.wall.classList.toggle('fallen', hp <= 0);
}

function ftBanner(text, cls) {
    const banner = div(`ft-banner ${cls} on`, text);
    banner.style.left = ftNodes.banner.style.left;
    banner.style.width = ftNodes.banner.style.width;
    ftNodes.banner.replaceWith(banner);
    ftNodes.banner = banner;
}

function drawFortress(state) {
    const view = state.view;
    if (!ftNodes) buildFortress(view);
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    view.fields.forEach(((data, side) => {
        const plot = ftNodes.fields[side];
        drawPlot(view, side, plot);
        plot.name.textContent = nameOf(view.sides[side]);
        if (plot.sum.textContent !== String(data.coins)) plot.sum.textContent = data.coins;
        plot.box.classList.toggle('ready', view.phase === 'build' && data.ready);
        plot.box.classList.toggle('choosing', view.phase === 'build' && data.choosing);
    }));
    ftNodes.waveBox.textContent = ftWords('ft_wave', 'Wave {n} of {all}', {
        n: view.wave,
        all: view.waves
    });
    ftNodes.armor.textContent = view.phase === 'build' && view.armorRate ? `🛡 +${view.armorRate} / ${view.armorEvery}s` : '';
    ftNodes.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : '';
    drawEngines(view);
    if (view.battle && (!ftBattle || ftBattle.raw !== view.battle)) {
        playBattle(view);
    } else if (!view.battle) {
        if (ftBattle) endBattle();
        setWall(view.wall, 0, view.wallMax, false);
    }
    if (view.payday && view.payday.wave !== ftNodes.paydaySeen && view.phase !== 'battle') {
        ftNodes.paydaySeen = view.payday.wave;
        const payday = view.payday;
        setTimeout((() => ftPayday(payday)), 450);
    }
    if (view.phase === 'build' && ftShownWave !== view.wave) {
        if (ftShownWave) ftBanner(ftWords('ft_build', 'Build!'), 'build');
        ftShownWave = view.wave;
    }
    if (view.phase === 'over' && !ftOver) {
        ftOver = true;
        const won = view.winner === 'won';
        ftBanner(won ? ftWords('ft_won', 'The wall held!') : ftWords('ft_lost', 'The wall has fallen'), won ? 'won' : 'lost');
        playSound(won ? 'win' : 'ft_lost');
        if (won) drawVictory(ftNodes.effects, '');
    } else if (view.phase !== 'over') {
        ftOver = false;
    }
    ftNodes.root.classList.toggle('fighting', view.phase === 'battle');
    show('fortress');
}

function ftFloat(target, text, cls) {
    if (!ftNodes || !target || !target.isConnected) return;
    const at = onStage(target.getBoundingClientRect());
    const note = div(`ft-float ${cls}`, text);
    if (cls === 'coin') note.appendChild(ftCoin());
    note.style.left = `${at.x / innerHeight * 100}vh`;
    note.style.top = `${at.y / innerHeight * 100}vh`;
    ftNodes.stage.appendChild(note);
    setTimeout((() => note.remove()), 1600);
}

function ftPayday(payday) {
    if (!ftNodes) return;
    payday.coins.forEach(((coins, side) => ftFloat(ftNodes.fields[side] && ftNodes.fields[side].coins, `+${coins}`, 'coin')));
    payday.gifts.forEach((([id, kind, amount], i) => {
        setTimeout((() => ftFloat(ftNodes && ftNodes.blocks.get(id), kind === 'mint' ? `+${amount}` : `+${amount} ♥`, kind === 'mint' ? 'coin' : 'heart')), 250 + i * 120);
    }));
}

function ftRead(raw) {
    const chunk = (list, size) => {
        const out = [];
        for (let i = 0; i + size <= list.length; i += size) out.push(list.slice(i, i + size));
        return out;
    };
    const bodies = raw.bodies.map((b => ({
        ...b,
        track: ftNums(b.track),
        hp: ftNums(b.hp)
    })));
    const moments = [];
    for (const body of bodies) {
        for (let i = 2; i < body.hp.length; i += 2) moments.push([ body.hp[i], 0, body.id, body.hp[i + 1] ]);
        let facing = 1;
        const points = body.track.length / 2;
        for (let i = 0; i < points - 1; i++) {
            const dx = body.track[(i + 1) * 2] - body.track[i * 2];
            if (Math.abs(dx) <= .5) continue;
            const now = (body.side < 0 ? dx > 0 : dx < 0) ? -1 : 1;
            if (now !== facing) moments.push([ body.born + i * raw.step, 2, body.id, now ]);
            facing = now;
        }
        if (body.died >= 0) moments.push([ body.died, 3, body.id, 0 ]);
    }
    const chills = ftNums(raw.chills);
    for (let i = 0; i < chills.length; i += 3) {
        moments.push([ chills[i], 4, chills[i + 1], chills[i] + chills[i + 2] ]);
        moments.push([ chills[i] + chills[i + 2], 5, chills[i + 1], 0 ]);
    }
    const swings = ftNums(raw.swings);
    for (let i = 0; i < swings.length; i += 2) moments.push([ swings[i], 1, swings[i + 1], 0 ]);
    moments.sort(((a, b) => a[0] - b[0]));
    return {
        ms: raw.ms,
        step: raw.step,
        bodies: bodies,
        moments: moments,
        shots: chunk(ftNums(raw.shots), 7).map((([t, k, x1, y1, x2, y2, ms]) => ({
            t: t,
            k: FT_EFFECTS[k],
            x1: x1,
            y1: y1,
            x2: x2,
            y2: y2,
            ms: ms
        }))),
        booms: chunk(ftNums(raw.booms), 5).map((([t, k, x, y, r]) => ({
            t: t,
            k: FT_EFFECTS[k],
            x: x,
            y: y,
            r: r
        }))),
        volleys: chunk(ftNums(raw.volleys), 2),
        wall: chunk(ftNums(raw.wall), 3),
        turns: raw.barracks.flatMap((b => chunk(ftNums(b.turns), 2).map((([t, sent]) => [ t, b.id, sent, b.every ])))).sort(((a, b) => a[0] - b[0])),
        barracks: raw.barracks,
        bastions: chunk(ftNums(raw.bastions), 2),
        forges: chunk(ftNums(raw.forges), 2),
        exits: bodies.filter((b => b.died >= 0)).map((b => [ b.died, b ])).sort(((a, b) => a[0] - b[0]))
    };
}

function playBattle(view) {
    ftNodes.figures.forEach((figure => figure.node.remove()));
    ftNodes.figures.clear();
    ftNodes.effects.textContent = '';
    const data = ftRead(view.battle);
    ftBattle = {
        raw: view.battle,
        data: data,
        start: performance.now(),
        body: 0,
        exit: 0,
        moment: 0,
        turn: 0,
        shot: 0,
        boom: 0,
        volley: 0,
        wall: 0,
        max: view.wallMax,
        armor: 0,
        hp: null
    };
    for (const b of data.barracks) ftFillBar(b.id, b.first, false);
    const opening = data.wall[0] || [ 0, view.wall, 0 ];
    setWall(opening[1], opening[2], view.wallMax, false);
    ftBanner(view.wave === view.waves ? ftWords('ft_last', 'The last wave!') : ftWords('ft_wave', 'Wave {n} of {all}', {
        n: view.wave,
        all: view.waves
    }), 'wave');
    playSound('ft_horn');
    cancelAnimationFrame(ftFrame);
    const battle = ftBattle;
    const loop = () => {
        if (ftBattle !== battle || !ftNodes) return;
        const t = performance.now() - battle.start;
        stepBattle(battle, t);
        if (t < data.ms + 2500) ftFrame = requestAnimationFrame(loop);
    };
    ftFrame = requestAnimationFrame(loop);
}

function endBattle() {
    cancelAnimationFrame(ftFrame);
    ftBattle = null;
    ftNodes.blocks.forEach((block => {
        const bar = block.querySelector('.ft-progress');
        if (!bar) return;
        bar.classList.remove('full');
        bar.firstChild.getAnimations().forEach((a => a.cancel()));
        bar.firstChild.style.transform = '';
    }));
    const left = [ ...ftNodes.figures.values() ].map((figure => figure.node));
    ftNodes.figures.clear();
    left.forEach((node => node.animate([ {
        opacity: 1
    }, {
        opacity: 0
    } ], {
        duration: 500,
        fill: 'forwards'
    })));
    setTimeout((() => left.forEach((node => node.remove()))), 550);
}

function stepBattle(battle, t) {
    const b = battle, data = b.data;
    while (b.body < data.bodies.length && data.bodies[b.body].born <= t) ftSpawn(data, data.bodies[b.body++], t);
    while (b.moment < data.moments.length && data.moments[b.moment][0] <= t) ftMoment(data.moments[b.moment++], t);
    while (b.exit < data.exits.length && data.exits[b.exit][0] + 650 <= t) {
        const body = data.exits[b.exit++][1];
        const figure = ftNodes.figures.get(body.id);
        if (figure) {
            figure.node.remove();
            ftNodes.figures.delete(body.id);
        }
    }
    while (b.shot < data.shots.length && data.shots[b.shot].t <= t) ftShot(data.shots[b.shot++]);
    while (b.boom < data.booms.length && data.booms[b.boom].t <= t) ftBoom(data.booms[b.boom++]);
    while (b.volley < data.volleys.length && data.volleys[b.volley][0] <= t) {
        const node = ftNodes.engineNodes.get(data.volleys[b.volley++][1]);
        if (node) node.firstChild.animate([ {
            transform: 'none'
        }, {
            transform: 'translateX(-.7vh)'
        }, {
            transform: 'none'
        } ], {
            duration: 320,
            easing: 'ease-out'
        });
    }
    while (b.turn < data.turns.length && data.turns[b.turn][0] <= t) {
        const [, id, sent, every] = data.turns[b.turn++];
        ftFillBar(id, every, !sent);
        const block = ftNodes.blocks.get(id);
        if (sent && block) block.animate([ {
            transform: 'none'
        }, {
            transform: 'scale(1.08, .94)'
        }, {
            transform: 'none'
        } ], {
            duration: 260,
            easing: 'ease-out'
        });
    }
    while (b.wall < data.wall.length && data.wall[b.wall][0] <= t) {
        const [, hp, armor] = data.wall[b.wall++];
        if (armor > b.armor) {
            for (const [id, amount] of data.bastions) ftFloat(ftNodes.blocks.get(id), `+${amount} 🛡`, 'shield');
        }
        if (b.hp !== null && hp > b.hp) {
            for (const [id, amount] of data.forges) ftFloat(ftNodes.blocks.get(id), `+${amount} ♥`, 'heart');
        }
        b.armor = armor;
        b.hp = hp;
        setWall(hp, armor, b.max, true);
    }
}

function ftFillBar(id, ms, full) {
    const block = ftNodes.blocks.get(id);
    const bar = block && block.querySelector('.ft-progress');
    if (!bar) return;
    const fill = bar.firstChild;
    fill.getAnimations().forEach((a => a.cancel()));
    bar.classList.toggle('full', full);
    if (full) {
        fill.style.transform = 'scaleX(1)';
        return;
    }
    fill.style.transform = '';
    fill.animate([ {
        transform: 'scaleX(0)'
    }, {
        transform: 'scaleX(1)'
    } ], {
        duration: Math.max(1, ms),
        easing: 'linear',
        fill: 'forwards'
    });
}

function ftSpawn(data, body, t) {
    const foe = body.side < 0;
    const node = div(`ft-body k-${body.k}${foe ? ' foe' : ''} lv-${body.lv}`);
    if (!foe) node.style.setProperty('--tint', FT_COLOURS[body.side]);
    const life = div('ft-life');
    const fig = ftArtImage(body.k, foe ? undefined : FT_COLOURS[body.side], 'ft-fig');
    life.appendChild(fig);
    const bar = div('ft-hp');
    const fill = document.createElement('i');
    bar.appendChild(fill);
    node.append(life, bar);
    node.style.zIndex = Math.round(body.track[1] || 0);
    ftNodes.bodies.appendChild(node);
    ftNodes.figures.set(body.id, {
        node: node,
        life: life,
        fig: fig,
        bar: bar,
        fill: fill,
        body: body,
        flashedAt: -1e3
    });
    if (!foe && t - body.born < 300) ftOpenGate(body.track[1]);
    if (body.k === 'boss') {
        ftBanner(ftWords('ft_boss', 'Here comes the boss!'), 'boss');
        playSound('ft_boss');
    }
    const points = body.track.length / 2;
    if (points < 2) {
        node.style.transform = ftAt(body.track[0], body.track[1]);
        return;
    }
    const hop = body.k === 'ram' || body.k === 'boss' ? .4 : body.k === 'knight' || body.k === 'brute' ? .9 : 1.4;
    const frames = [];
    for (let i = 0; i < points; i++) {
        const x = body.track[i * 2], y = body.track[i * 2 + 1];
        const moving = i > 0 && Math.abs(x - body.track[i * 2 - 2]) + Math.abs(y - body.track[i * 2 - 1]) > 1.5;
        frames.push({
            transform: ftAt(x, y - (moving && i % 2 ? hop : 0))
        });
    }
    const walk = node.animate(frames, {
        duration: (points - 1) * data.step,
        easing: 'linear',
        fill: 'forwards'
    });
    walk.currentTime = t - body.born;
}

function ftMoment([at, what, id, value], t) {
    const figure = ftNodes.figures.get(id);
    if (!figure) return;
    if (what === 0) {
        figure.fill.style.transform = `scaleX(${Math.max(0, value) / figure.body.max})`;
        figure.bar.style.opacity = value > 0 ? 1 : 0;
        if (at - figure.flashedAt > 160 && t - at < 100) {
            figure.flashedAt = at;
            figure.fig.animate([ {
                filter: 'brightness(2.2)'
            }, {
                filter: 'none'
            } ], {
                duration: 160,
                easing: 'ease-out'
            });
        }
    } else if (what === 1) {
        if (t - at < 100) {
            figure.fig.animate([ {
                transform: 'none'
            }, {
                transform: 'translateX(18%) rotate(14deg)',
                offset: .35
            }, {
                transform: 'none'
            } ], {
                duration: 240,
                easing: 'ease-out'
            });
            ftSound(figure.body.side < 0 ? 'ft_thump' : 'ft_clash', 110);
        }
    } else if (what === 2) {
        figure.life.style.transform = value < 0 ? 'scaleX(-1)' : '';
    } else if (what === 4) {
        figure.chilledUntil = Math.max(figure.chilledUntil || 0, value);
        figure.node.classList.add('chilled');
    } else if (what === 5) {
        if (at >= (figure.chilledUntil || 0)) figure.node.classList.remove('chilled');
    } else {
        figure.bar.style.opacity = 0;
        const fall = figure.fig.animate([ {
            opacity: 1,
            transform: 'none'
        }, {
            opacity: 1,
            transform: 'rotate(40deg)',
            offset: .3
        }, {
            opacity: 0,
            transform: 'rotate(85deg) scale(.6) translateY(1vh)'
        } ], {
            duration: 650,
            easing: 'ease-in',
            fill: 'forwards'
        });
        fall.currentTime = Math.min(649, t - at);
        const x = figure.body.track[figure.body.track.length - 2], y = figure.body.track[figure.body.track.length - 1];
        const dust = div(`ft-dust${figure.body.side < 0 ? '' : ' ours'}`);
        dust.style.transform = ftAt(x, y);
        ftNodes.effects.appendChild(dust);
        setTimeout((() => dust.remove()), 700);
    }
}

function ftShot(shot) {
    const node = div(`ft-shot k-${shot.k}`);
    const angle = Math.atan2(shot.y2 - shot.y1, shot.x2 - shot.x1) * 180 / Math.PI;
    const reach = Math.hypot(shot.x2 - shot.x1, shot.y2 - shot.y1) * FT_K;
    const lift = shot.k === 'arrow' ? -Math.min(4, reach * .12) : shot.k === 'rock' ? -Math.min(22, reach * .4) : 0;
    const turn = shot.k === 'rock' ? [ 0, 200, 400 ] : [ angle, angle, angle ];
    const mid = `translate3d(${ftX((shot.x1 + shot.x2) / 2)}vh,${ftY((shot.y1 + shot.y2) / 2) + lift}vh,0)`;
    const frames = [ {
        transform: `${ftAt(shot.x1, shot.y1)} rotate(${turn[0]}deg)`
    }, {
        transform: `${mid} rotate(${turn[1]}deg)`
    }, {
        transform: `${ftAt(shot.x2, shot.y2)} rotate(${turn[2]}deg)`
    } ];
    ftNodes.effects.appendChild(node);
    node.animate(frames, {
        duration: Math.max(80, shot.ms),
        easing: 'linear'
    }).onfinish = () => node.remove();
    if (shot.k === 'arrow') ftSound('ft_arrow', 80); else if (shot.k === 'bolt' || shot.k === 'rock') ftSound('ft_engine', 150, shot.k); else ftSound('ft_cast', 120, shot.k);
}

function ftBoom(boom) {
    const node = div(`ft-boom k-${boom.k}`);
    node.style.transform = ftAt(boom.x, boom.y);
    node.style.setProperty('--r', `${ftX(boom.r) * 2}vh`);
    ftNodes.effects.appendChild(node);
    setTimeout((() => node.remove()), 700);
    if (boom.k === 'heal') return;
    ftSound(boom.k === 'ice' ? 'ft_ice' : boom.k === 'stomp' ? 'bonk_big' : boom.k === 'rock' ? 'thud' : 'ft_fire', 120);
}