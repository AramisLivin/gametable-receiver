const FT_K = 100 / 562;

const FT_COLOURS = [ '#7db7f0', '#f27d86', '#8fd16a', '#f2c14e' ];

const FT_ICONS = {
    sword: '⚔️',
    knight: '🛡️',
    archer: '🏹',
    fire: '🔥',
    ice: '❄️',
    ballista: '🎯',
    catapult: '🪨',
    mint: '🪙',
    forge: '🔨',
    bastion: '🧱',
    cell: '⬜'
};

const FT_ENEMY_ICONS = {
    grunt: '👺',
    runner: '💨',
    brute: '🪓',
    ram: '🪵',
    boss: '👹'
};

let ftNodes = null;

let ftBattle = null;

let ftFrame = 0;

let ftOver = false;

let ftShownWave = 0;

const ftSoundAt = {};

const ftX = x => x * FT_K;

const ftY = y => y * FT_K;

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

function buildFortress(view) {
    const root = $('fortress');
    root.textContent = '';
    const stage = div('ft-stage');
    const wallVh = ftX(view.wallX);
    const field = div('ft-field');
    field.style.left = `${wallVh}vh`;
    const meadow = 177.78 - wallVh;
    for (let i = 0; i < 16; i++) {
        const tree = div('ft-tree');
        const far = i < 8;
        tree.style.left = far ? `${meadow - 6 + i % 2 * 3.2}vh` : `${12 + (i - 8) % 4 * (meadow - 24) / 4}vh`;
        tree.style.top = far ? `${i % 8 * 13 - 3}vh` : `${i < 12 ? -5 : 96}vh`;
        tree.style.setProperty('--s', (.8 + i * 37 % 10 / 20).toFixed(2));
        field.appendChild(tree);
    }
    for (let i = 0; i < 30; i++) {
        const tuft = div('ft-tuft');
        tuft.style.left = `${4 + i * 53 % Math.floor(meadow - 12)}vh`;
        tuft.style.top = `${4 + i * 29 % 92}vh`;
        field.appendChild(tuft);
    }
    const yard = div('ft-yard');
    yard.style.width = `${wallVh}vh`;
    const wall = div('ft-wall');
    wall.style.left = `${wallVh - 4.2}vh`;
    const cracks = div('ft-cracks');
    wall.appendChild(cracks);
    const bodies = div('ft-bodies');
    const engines = div('ft-engines');
    const effects = div('ft-effects');
    const fields = view.fields.map(((_, side) => {
        const box = div(`ft-plot side-${side}`);
        box.style.setProperty('--tint', FT_COLOURS[side]);
        const head = div('ft-plot-head');
        const name = div('ft-plot-name');
        const coins = div('ft-plot-coins');
        const ready = div('ft-plot-ready', '✔');
        head.append(name, coins, ready);
        const grid = div('ft-grid');
        box.append(grid, head);
        yard.appendChild(box);
        return {
            box: box,
            name: name,
            coins: coins,
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
    const armor = div('ft-armor');
    wallBar.append(wallFill, wallText, armor);
    const clock = div('ft-clock');
    hud.append(waveBox, wallBar, clock);
    const coming = div('ft-coming');
    coming.style.left = `${wallVh + meadow / 2}vh`;
    const banner = div('ft-banner');
    banner.style.left = `${wallVh}vh`;
    banner.style.width = `${meadow}vh`;
    stage.append(field, yard, wall, engines, bodies, effects, hud, coming, banner);
    root.appendChild(stage);
    ftNodes = {
        root: root,
        stage: stage,
        field: field,
        yard: yard,
        wall: wall,
        cracks: cracks,
        bodies: bodies,
        effects: effects,
        fields: fields,
        waveBox: waveBox,
        wallFill: wallFill,
        wallText: wallText,
        armor: armor,
        clock: clock,
        coming: coming,
        banner: banner,
        figures: new Map,
        shownWall: null,
        engines: engines,
        engineNodes: new Map
    };
}

function drawEngines(view) {
    const seen = new Set;
    for (const engine of view.engines) {
        const key = engine.id;
        seen.add(key);
        let node = ftNodes.engineNodes.get(key);
        if (!node) {
            node = div(`ft-body ft-engine k-${engine.k}`);
            const fig = div('ft-fig');
            fig.append(div('ft-limb'), div('ft-gear'));
            node.appendChild(fig);
            node.classList.add('fresh');
            ftNodes.engines.appendChild(node);
            ftNodes.engineNodes.set(key, node);
        }
        node.style.setProperty('--tint', FT_COLOURS[engine.side]);
        node.classList.toggle('lv-2', engine.lv === 2);
        node.classList.toggle('lv-3', engine.lv === 3);
        node.style.transform = `translate3d(${ftX(engine.x)}vh,${ftY(engine.y)}vh,0)`;
        node.style.zIndex = Math.round(engine.y);
    }
    for (const [key, node] of ftNodes.engineNodes) {
        if (seen.has(key)) continue;
        node.remove();
        ftNodes.engineNodes.delete(key);
    }
}

function drawPlot(view, side, plot) {
    const data = view.fields[side];
    const key = JSON.stringify([ data.cells, data.pieces ]);
    const cell = view.cell;
    plot.box.style.left = `${ftX(view.yards[side].x)}vh`;
    plot.box.style.top = `${ftY(view.yards[side].y)}vh`;
    plot.box.style.width = `${ftX(view.cols * cell)}vh`;
    plot.box.style.height = `${ftX(view.rows * cell)}vh`;
    if (key === plot.key) return;
    const before = plot.key ? new Set(JSON.parse(plot.key)[1].map((p => `${p.id}:${p.lv}:${p.x}:${p.y}:${p.turn}`))) : null;
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
        const block = div(`ft-block k-${piece.k} lv-${piece.lv}`);
        const xs = piece.cells.map((c => c[0])), ys = piece.cells.map((c => c[1]));
        const left = Math.min(...xs), top = Math.min(...ys);
        block.style.transform = `translate(${left * size}vh, ${top * size}vh)`;
        block.style.width = `${(Math.max(...xs) - left + 1) * size}vh`;
        block.style.height = `${(Math.max(...ys) - top + 1) * size}vh`;
        for (const [x, y] of piece.cells) {
            const part = div('ft-part');
            part.style.left = `${(x - left) * size}vh`;
            part.style.top = `${(y - top) * size}vh`;
            part.style.width = part.style.height = `${size}vh`;
            block.appendChild(part);
        }
        const icon = div('ft-icon', FT_ICONS[piece.k] || '?');
        const cx = piece.cells.reduce(((s, c) => s + c[0] - left + .5), 0) / piece.cells.length;
        const cy = piece.cells.reduce(((s, c) => s + c[1] - top + .5), 0) / piece.cells.length;
        icon.style.left = `${cx * size}vh`;
        icon.style.top = `${cy * size}vh`;
        block.appendChild(icon);
        if (piece.lv > 1) {
            const stars = div('ft-stars', '★'.repeat(piece.lv));
            stars.style.left = `${cx * size}vh`;
            stars.style.top = `${cy * size}vh`;
            block.appendChild(stars);
        }
        if (before && !before.has(`${piece.id}:${piece.lv}:${piece.x}:${piece.y}:${piece.turn}`)) {
            block.classList.add('fresh');
            ftSound(piece.lv > 1 && ![ ...before ].some((b => b.startsWith(piece.id + ':' + piece.lv))) ? 'ft_merge' : 'place', 120);
        }
        plot.grid.appendChild(block);
    }
}

function setWall(hp, max, hit) {
    const share = Math.max(0, hp) / max;
    ftNodes.wallFill.style.transform = `scaleX(${share})`;
    ftNodes.wallFill.classList.toggle('low', share < .34);
    ftNodes.wallText.textContent = `${Math.max(0, Math.round(hp))} / ${max}`;
    ftNodes.wall.classList.toggle('worn', share < .67);
    ftNodes.wall.classList.toggle('broken', share < .34);
    ftNodes.wall.classList.toggle('fallen', hp <= 0);
    if (hit && ftNodes.shownWall !== null && hp < ftNodes.shownWall) {
        ftNodes.wall.classList.remove('hit');
        void ftNodes.wall.offsetWidth;
        ftNodes.wall.classList.add('hit');
        ftSound('ft_wall', 160);
    }
    ftNodes.shownWall = hp;
}

function drawComing(view) {
    ftNodes.coming.textContent = '';
    if (view.phase !== 'build') return;
    const title = div('ft-coming-title', view.wave === view.waves ? ftWords('ft_last', 'The last wave!') : ftWords('ft_coming', 'Coming next'));
    ftNodes.coming.appendChild(title);
    for (const kind of [ 'grunt', 'runner', 'brute', 'ram', 'boss' ]) {
        const count = view.coming[kind];
        if (!count) continue;
        const entry = div(`ft-coming-entry e-${kind}`);
        entry.append(div('ft-coming-icon', FT_ENEMY_ICONS[kind]), div('ft-coming-name', `${ftWords('ft_enemy_' + kind, kind)} × ${count}`));
        ftNodes.coming.appendChild(entry);
    }
}

function ftBanner(text, cls) {
    const banner = ftNodes.banner;
    banner.className = `ft-banner ${cls}`;
    banner.textContent = text;
    void banner.offsetWidth;
    banner.classList.add('on');
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
        plot.coins.textContent = `🪙 ${data.coins}`;
        plot.box.classList.toggle('ready', view.phase === 'build' && data.ready);
    }));
    ftNodes.waveBox.textContent = ftWords('ft_wave', 'Wave {n} of {all}', {
        n: view.wave,
        all: view.waves
    });
    ftNodes.armor.textContent = view.armor ? `🧱 ${view.armor}%` : '';
    ftNodes.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'build' ? view.clock : '';
    ftNodes.clock.classList.toggle('urgent', view.phase === 'build' && view.clock <= 5 && !away);
    drawComing(view);
    drawEngines(view);
    if (view.battle && (!ftBattle || ftBattle.data !== view.battle)) {
        playBattle(view);
    } else if (!view.battle) {
        if (ftBattle) {
            cancelAnimationFrame(ftFrame);
            ftBattle = null;
            ftNodes.figures.forEach((f => f.node.classList.add('home')));
            const figures = [ ...ftNodes.figures.values() ];
            ftNodes.figures.clear();
            setTimeout((() => figures.forEach((f => f.node.remove()))), 600);
        }
        setWall(view.wall, view.wallMax, false);
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

function ftFigure(body) {
    const node = div(`ft-body k-${body.k}${body.side < 0 ? ' foe' : ''} lv-${body.lv}`);
    if (body.side >= 0) node.style.setProperty('--tint', FT_COLOURS[body.side]);
    const fig = div('ft-fig');
    fig.append(div('ft-limb'), div('ft-gear'));
    if (body.side < 0) fig.appendChild(div('ft-eyes'));
    const bar = div('ft-hp');
    const fill = document.createElement('i');
    bar.appendChild(fill);
    node.append(fig, bar);
    ftNodes.bodies.appendChild(node);
    return {
        node: node,
        fill: fill,
        hpAt: 0,
        shownHp: body.max,
        gone: false
    };
}

function playBattle(view) {
    const data = view.battle;
    ftNodes.figures.forEach((f => f.node.remove()));
    ftNodes.figures.clear();
    ftNodes.effects.textContent = '';
    ftBattle = {
        data: data,
        start: performance.now(),
        shot: 0,
        boom: 0,
        kill: 0,
        swing: 0,
        volley: 0,
        wall: 0,
        max: view.wallMax,
        bossCalled: false
    };
    setWall(view.wall, view.wallMax, false);
    ftBanner(view.wave === view.waves ? ftWords('ft_last', 'The last wave!') : ftWords('ft_wave', 'Wave {n} of {all}', {
        n: view.wave,
        all: view.waves
    }), 'wave');
    playSound('ft_horn');
    const byId = new Map(data.bodies.map((b => [ b.id, b ])));
    ftBattle.byId = byId;
    cancelAnimationFrame(ftFrame);
    const loop = () => {
        if (!ftBattle || ftBattle.data !== data || !ftNodes) return;
        const t = performance.now() - ftBattle.start;
        stepBattle(t);
        if (t < data.ms + 2500) ftFrame = requestAnimationFrame(loop); else ftBattle.done = true;
    };
    ftFrame = requestAnimationFrame(loop);
}

function stepBattle(t) {
    const b = ftBattle, data = b.data;
    for (const body of data.bodies) {
        if (t < body.born) continue;
        let fig = ftNodes.figures.get(body.id);
        if (!fig) {
            fig = ftFigure(body);
            ftNodes.figures.set(body.id, fig);
            if (body.k === 'boss') {
                ftBanner(ftWords('ft_boss', 'Here comes the boss!'), 'boss');
                playSound('ft_boss');
            }
        }
        if (fig.gone) continue;
        const dead = body.died >= 0 && t >= body.died;
        if (dead && t > body.died + 700) {
            fig.node.remove();
            fig.gone = true;
            continue;
        }
        const steps = body.track.length / 2;
        const at = Math.min((Math.min(t, dead ? body.died : t) - body.born) / data.step, steps - 1);
        const i = Math.max(0, Math.floor(at)), f = at - i;
        const j = Math.min(i + 1, steps - 1);
        const x = body.track[i * 2] + (body.track[j * 2] - body.track[i * 2]) * f;
        const y = body.track[i * 2 + 1] + (body.track[j * 2 + 1] - body.track[i * 2 + 1]) * f;
        fig.node.style.transform = `translate3d(${ftX(x)}vh,${ftY(y)}vh,0)`;
        fig.node.style.zIndex = Math.round(y);
        if (j > i) {
            const dx = body.track[j * 2] - body.track[i * 2];
            if (Math.abs(dx) > .5) fig.node.classList.toggle('flip', body.side < 0 ? dx > 0 : dx < 0);
        }
        while (fig.hpAt < body.hp.length && body.hp[fig.hpAt] <= t) {
            const hp = body.hp[fig.hpAt + 1];
            if (hp < fig.shownHp) {
                fig.node.classList.add('wounded');
                fig.node.classList.remove('hurt');
                void fig.node.offsetWidth;
                fig.node.classList.add('hurt');
            }
            fig.shownHp = hp;
            fig.fill.style.transform = `scaleX(${Math.max(0, hp) / body.max})`;
            fig.hpAt += 2;
        }
        if (dead && !fig.node.classList.contains('dead')) fig.node.classList.add('dead');
    }
    while (b.shot < data.shots.length && data.shots[b.shot].t <= t) ftShot(data.shots[b.shot++]);
    while (b.boom < data.booms.length && data.booms[b.boom].t <= t) ftBoom(data.booms[b.boom++]);
    while (b.kill < data.kills.length && data.kills[b.kill].t <= t) ftKill(data.kills[b.kill++]);
    while (b.swing < data.swings.length && data.swings[b.swing] <= t) {
        const fig = ftNodes.figures.get(data.swings[b.swing + 1]);
        if (fig && !fig.gone) {
            fig.node.classList.remove('swing');
            void fig.node.offsetWidth;
            fig.node.classList.add('swing');
            ftSound(ftBattle.byId.get(data.swings[b.swing + 1]).side < 0 ? 'ft_thump' : 'ft_clash', 110);
        }
        b.swing += 2;
    }
    while (b.volley < data.volleys.length && data.volleys[b.volley] <= t) {
        const node = ftNodes.engineNodes.get(data.volleys[b.volley + 1]);
        if (node) {
            node.classList.remove('swing');
            void node.offsetWidth;
            node.classList.add('swing');
        }
        b.volley += 2;
    }
    while (b.wall < data.wall.length && data.wall[b.wall] <= t) {
        setWall(data.wall[b.wall + 1], b.max, true);
        b.wall += 2;
    }
}

function ftShot(shot) {
    const node = div(`ft-shot k-${shot.k}`);
    const angle = Math.atan2(shot.y2 - shot.y1, shot.x2 - shot.x1) * 180 / Math.PI;
    const from = `translate3d(${ftX(shot.x1)}vh,${ftY(shot.y1)}vh,0) rotate(${angle}deg)`;
    const to = `translate3d(${ftX(shot.x2)}vh,${ftY(shot.y2)}vh,0) rotate(${angle}deg)`;
    ftNodes.effects.appendChild(node);
    const reach = Math.hypot(shot.x2 - shot.x1, shot.y2 - shot.y1) * FT_K;
    const lift = shot.k === 'arrow' ? -Math.min(4, reach * .12) : shot.k === 'rock' ? -Math.min(22, reach * .4) : 0;
    const mid = `translate3d(${ftX((shot.x1 + shot.x2) / 2)}vh,${ftY((shot.y1 + shot.y2) / 2) + lift}vh,0) rotate(${angle}deg)`;
    const flight = node.animate([ {
        transform: from
    }, {
        transform: mid
    }, {
        transform: to
    } ], {
        duration: Math.max(80, shot.ms),
        easing: 'linear'
    });
    flight.onfinish = () => node.remove();
    if (shot.k === 'arrow') ftSound('ft_arrow', 80); else if (shot.k === 'bolt' || shot.k === 'rock') ftSound('ft_engine', 150, shot.k); else ftSound('ft_cast', 120, shot.k);
}

function ftBoom(boom) {
    const node = div(`ft-boom k-${boom.k}`);
    node.style.transform = `translate3d(${ftX(boom.x)}vh,${ftY(boom.y)}vh,0)`;
    node.style.setProperty('--r', `${ftX(boom.r) * 2}vh`);
    ftNodes.effects.appendChild(node);
    setTimeout((() => node.remove()), 700);
    ftSound(boom.k === 'ice' ? 'ft_ice' : boom.k === 'stomp' ? 'bonk_big' : boom.k === 'rock' ? 'thud' : 'ft_fire', 120);
}

function ftKill(kill) {
    const node = div('ft-coin', `+${kill.coins}`);
    node.style.setProperty('--tint', FT_COLOURS[kill.side]);
    node.style.left = `${ftX(kill.x)}vh`;
    node.style.top = `${ftY(kill.y)}vh`;
    ftNodes.effects.appendChild(node);
    setTimeout((() => node.remove()), 1100);
    ftSound('ft_coin', 140);
}