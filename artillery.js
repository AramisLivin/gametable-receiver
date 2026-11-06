const ARTY_K = 100 / 562;

let artyNodes = null;

let artySeq = 0;

let artyDriveSeq = 0;

let artyDropSeq = 0;

let artyFlying = false;

let artyOver = false;

let artyTimers = [];

let artyHull = null;

let artyDealing = false;

let artyView = null;

const artyX = x => x * ARTY_K;

const artyY = y => (562 - y) * ARTY_K;

function stopArtillery() {
    artyTimers.forEach(clearTimeout);
    artyTimers = [];
    artyNodes = null;
    artySeq = 0;
    artyDriveSeq = 0;
    artyDropSeq = 0;
    letterbox(false);
    $('artillery').className = 'screen';
    artyFlying = false;
    artyOver = false;
    artyHull = null;
    artyDealing = false;
}

function artyLater(ms, action) {
    artyTimers.push(setTimeout(action, ms));
}

function groundPath(view) {
    const points = view.ground.map(((h, i) => `${i * view.column} ${562 - h}`));
    return `M0 562L${points.join('L')}L1000 562Z`;
}

function starShadows() {
    const stars = [];
    for (let i = 0; i < 90; i++) {
        const x = (Math.random() * 178).toFixed(1), y = (Math.random() * 62).toFixed(1), size = Math.random() < .2 ? .12 : 0;
        stars.push(`${x}vh ${y}vh 0 ${size}vh rgba(255, 255, 255, ${(.25 + Math.random() * .55).toFixed(2)})`);
    }
    return stars.join(',');
}

function buildCannon(field, side) {
    const cannon = div(`arty-cannon side-${side}`);
    const lamp = div('arty-lamp');
    const aim = div('arty-aim');
    const barrel = div('arty-barrel');
    const flash = div('arty-flash');
    barrel.appendChild(flash);
    aim.appendChild(barrel);
    const smoke = div('arty-wounds');
    for (let i = 0; i < 3; i++) smoke.appendChild(div(`arty-wisp arty-wisp-${i}`));
    smoke.appendChild(div('arty-flamelet'));
    cannon.append(lamp, aim, div('arty-turret'), div('arty-hull'), div('arty-tracks'), smoke);
    field.appendChild(cannon);
    return {
        cannon: cannon,
        aim: aim,
        barrel: barrel,
        flash: flash,
        lamp: lamp,
        smoke: smoke
    };
}

function buildArtillery(view) {
    const root = $('artillery');
    root.textContent = '';
    root.classList.add('map-' + view.map);
    const camera = div('arty-camera');
    const field = div('arty-field');
    camera.appendChild(field);
    const stars = div('arty-stars');
    stars.style.boxShadow = starShadows();
    field.append(stars, div('arty-moon'));
    const clouds = [ 0, 1, 2, 3 ].map((i => {
        const cloud = div(`arty-cloud arty-cloud-${i}`);
        field.appendChild(cloud);
        const drift = cloud.animate([ {
            transform: 'translate3d(-60vh,0,0)'
        }, {
            transform: 'translate3d(190vh,0,0)'
        } ], {
            duration: 9e4 + i * 25e3,
            iterations: Infinity
        });
        drift.currentTime = (i * .27 + Math.random() * .1) * (9e4 + i * 25e3);
        return drift;
    }));
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'arty-ground');
    svg.setAttribute('viewBox', '0 0 1000 562');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.innerHTML = `<defs><linearGradient id="arty-dirt" x1="0" y1="0" x2="0" y2="1"><stop class="arty-d1" offset="0"/><stop class="arty-d2" offset=".35"/><stop class="arty-d3" offset=".7"/><stop class="arty-d4" offset="1"/></linearGradient>\n    <radialGradient id="arty-burn"><stop offset="0" stop-color="#0a0705" stop-opacity=".8"/><stop offset="1" stop-color="#0a0705" stop-opacity="0"/></radialGradient>\n    <clipPath id="arty-land-clip"><path class="arty-clip"/></clipPath></defs>\n    <path class="arty-far"/><path class="arty-land" fill="url(#arty-dirt)"/><g class="arty-scars" clip-path="url(#arty-land-clip)"></g><path class="arty-edge" fill="none" stroke-width="7"/><path class="arty-grass" fill="none" stroke-width="3"/>`;
    field.appendChild(svg);
    const land = field.querySelector('.arty-land');
    const grass = field.querySelector('.arty-grass');
    const edge = field.querySelector('.arty-edge');
    const far = view.ground.map(((h, i) => `${i * view.column} ${562 - (h * .75 + 110 + 26 * Math.sin(i / 17))}`));
    field.querySelector('.arty-far').setAttribute('d', `M0 562L${far.join('L')}L1000 562Z`);
    const scars = field.querySelector('.arty-scars');
    const clip = field.querySelector('.arty-clip');
    if (view.water) {
        const water = div('arty-water');
        water.style.top = `${artyY(view.water)}vh`;
        field.appendChild(water);
    }
    const cannons = [ 0, 1 ].map((side => buildCannon(field, side)));
    const guide = div('arty-guide');
    field.appendChild(guide);
    const skyFlash = div('arty-sky-flash');
    field.appendChild(skyFlash);
    const hud = div('arty-hud');
    const heads = [ 0, 1 ].map((side => {
        const head = div(`arty-head side-${side}`);
        const name = div('arty-name');
        const bar = div('arty-bar');
        const fill = document.createElement('i');
        bar.appendChild(fill);
        const value = div('arty-value');
        const arsenal = div('arty-arsenal');
        head.append(name, bar, value, arsenal);
        return {
            head: head,
            name: name,
            fill: fill,
            value: value,
            arsenal: arsenal
        };
    }));
    const middle = div('arty-middle');
    const status = div('arty-status');
    const clock = div('arty-clock');
    const wind = div('arty-wind');
    middle.append(status, clock, wind);
    hud.append(heads[0].head, middle, heads[1].head);
    root.append(camera, hud, div('siege-effects'));
    artyNodes = {
        camera: camera,
        field: field,
        land: land,
        clip: clip,
        grass: grass,
        edge: edge,
        cannons: cannons,
        clouds: clouds,
        scars: scars,
        guide: guide,
        guideDots: [],
        skyFlash: skyFlash,
        heads: heads,
        status: status,
        clock: clock,
        wind: wind,
        crates: new Map,
        mines: new Map,
        effects: root.querySelector('.siege-effects')
    };
    setGround(view);
}

function setGround(view) {
    const d = groundPath(view);
    artyNodes.land.setAttribute('d', d);
    artyNodes.clip.setAttribute('d', d);
    const line = `M${view.ground.map(((h, i) => `${i * view.column} ${562 - h}`)).join('L')}`;
    artyNodes.grass.setAttribute('d', line);
    artyNodes.edge.setAttribute('d', line);
}

function setCannons(view) {
    view.ys.forEach(((y, side) => {
        artyNodes.cannons[side].cannon.style.transform = `translate3d(${artyX(view.xs[side])}vh,${artyY(y)}vh,0)`;
    }));
}

function setAims(view) {
    view.aims.forEach(((angle, side) => {
        artyNodes.cannons[side].aim.style.transform = `rotate(${-angle}deg)`;
    }));
}

function setHulls(view) {
    view.hull.forEach(((value, side) => {
        const head = artyNodes.heads[side];
        head.fill.style.transform = `scaleX(${value / view.hullMax})`;
        head.value.textContent = value;
        setWounds(side, value);
    }));
    artyHull = view.hull.slice();
}

function setWounds(side, value) {
    const wounds = artyNodes.cannons[side].smoke;
    wounds.classList.toggle('smoking', value > 0 && value <= 60);
    wounds.classList.toggle('burning', value > 0 && value <= 30);
    artyNodes.cannons[side].cannon.classList.toggle('wreck', value <= 0);
}

function setGuide(view) {
    const path = view.aimPath;
    const dots = artyNodes.guideDots;
    while (dots.length < path.length) {
        const dot = div('arty-dot');
        dot.appendChild(document.createElement('i'));
        artyNodes.guide.appendChild(dot);
        dots.push(dot);
    }
    const sway = Math.min(1.4, .25 + Math.abs(view.wind) * .28);
    dots.forEach(((dot, i) => {
        const on = i < path.length;
        dot.classList.toggle('on', on);
        if (!on) return;
        dot.style.transform = `translate3d(${artyX(path[i][0])}vh,${artyY(path[i][1])}vh,0)`;
        dot.firstChild.style.setProperty('--sway', `${((i + 1) / path.length * sway * (view.wind < 0 ? -1 : 1)).toFixed(2)}vh`);
        dot.firstChild.style.animationDelay = `${-i * 90}ms`;
        dot.firstChild.style.opacity = (1 - i / (path.length + 3)).toFixed(2);
    }));
}

function artyCall(text, cls) {
    artyNodes.effects.querySelectorAll('.callout').forEach((old => old.remove()));
    const note = div(`callout ${cls}`, text);
    note.addEventListener('animationend', (() => note.remove()));
    artyNodes.effects.appendChild(note);
}

function artyLine(key, fallback) {
    const lines = word(key, fallback).split('|');
    return lines[Math.floor(Math.random() * lines.length)];
}

function explode(x, y, size) {
    blastAt(artyNodes.field, artyX(x), artyY(y), size);
}

function blastAt(field, xVh, yVh, size) {
    const blast = div(`arty-blast ${size}`);
    blast.style.transform = `translate3d(${xVh}vh,${yVh}vh,0)`;
    blast.appendChild(div('arty-fire'));
    blast.appendChild(div('arty-ring'));
    for (let i = 0; i < {
        small: 1,
        normal: 3,
        huge: 6
    }[size]; i++) {
        const ball = div('arty-smokeball');
        ball.style.setProperty('--x', `${(Math.random() - .5) * {
            small: 4,
            normal: 9,
            huge: 26
        }[size]}vh`);
        ball.style.animationDelay = `${120 + i * 90}ms`;
        blast.appendChild(ball);
    }
    const pieces = {
        small: 4,
        normal: 9,
        huge: 18
    }[size];
    const reach = {
        small: 7,
        normal: 12,
        huge: 26
    }[size];
    for (let i = 0; i < pieces; i++) {
        const clod = div('arty-clod');
        const angle = -Math.PI * (.1 + .8 * Math.random());
        const far = reach * (.5 + Math.random());
        clod.style.setProperty('--x', `${Math.cos(angle) * far}vh`);
        clod.style.setProperty('--y', `${Math.sin(angle) * far}vh`);
        clod.style.animationDelay = `${Math.random() * 60}ms`;
        blast.appendChild(clod);
    }
    field.appendChild(blast);
    setTimeout((() => blast.remove()), 2200);
}

function scar(x, y, size) {
    const reach = {
        small: 26,
        normal: 54,
        huge: 118
    }[size];
    const mark = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    mark.setAttribute('cx', x);
    mark.setAttribute('cy', 562 - y);
    mark.setAttribute('rx', reach);
    mark.setAttribute('ry', reach * .7);
    mark.setAttribute('fill', 'url(#arty-burn)');
    artyNodes.scars.appendChild(mark);
    while (artyNodes.scars.children.length > 24) artyNodes.scars.firstChild.remove();
}

function skyFlash(size) {
    const flash = artyNodes.skyFlash;
    flash.classList.remove('go', 'go-huge');
    void flash.offsetWidth;
    flash.classList.add(size === 'huge' ? 'go-huge' : 'go');
}

function floatOnField(x, y, text, cls = '') {
    const note = div(`arty-damage ${cls}`, text);
    note.style.left = `${artyX(x)}vh`;
    note.style.top = `${artyY(y)}vh`;
    note.addEventListener('animationend', (() => note.remove()));
    artyNodes.field.appendChild(note);
}

function kickField(big) {
    const field = artyNodes.field;
    field.classList.remove('shake', 'shake-big');
    void field.offsetWidth;
    field.classList.add(big ? 'shake-big' : 'shake');
}

function flySegment(segment, slow) {
    const shell = div(`arty-shell ${segment.kind}`);
    artyNodes.field.appendChild(shell);
    const frames = segment.path.map((([x, y]) => ({
        transform: `translate3d(${artyX(x)}vh,${artyY(y)}vh,0)`
    })));
    shell.animate(frames, {
        duration: Math.max(1, segment.ms * slow),
        easing: 'linear',
        fill: 'forwards'
    });
    const every = Math.max(1, Math.round(segment.path.length / ({
        bomblet: 5,
        bomb: 4,
        drilling: 10,
        rocket: 34
    }[segment.kind] || 16)));
    const stepMs = segment.ms * slow / Math.max(1, segment.path.length - 1);
    segment.path.forEach((([x, y], i) => {
        if (i % every || i === 0) return;
        artyLater(i * stepMs, (() => {
            const puff = div(`arty-puff ${segment.kind}`);
            puff.style.transform = `translate3d(${artyX(x)}vh,${artyY(y)}vh,0)`;
            puff.addEventListener('animationend', (() => puff.remove()));
            artyNodes.field.appendChild(puff);
        }));
    }));
    artyLater(segment.ms * slow, (() => shell.remove()));
}

function openCrate(event, view) {
    const crate = artyNodes.crates.get(event.id);
    if (crate) {
        crate.remove();
        artyNodes.crates.delete(event.id);
    }
    const line = word('arty_crate_' + event.holds, event.holds);
    floatOnField(event.x, event.y + 30, line, 'crate-prize');
    playSound(event.holds === 'repair' ? 'repair' : event.holds === 'surprise' ? 'fire' : 'crate');
}

function shownHull(side, change) {
    artyHull[side] = Math.max(0, artyHull[side] + change);
    const head = artyNodes.heads[side];
    head.fill.style.transform = `scaleX(${artyHull[side] / 100})`;
    head.value.textContent = artyHull[side];
    setWounds(side, artyHull[side]);
}

function playBlast(blast, shot, view, first) {
    if (first) setGround(view);
    if (blast.mine != null) removeMine(blast.mine);
    const size = shot.finale && blast.size === 'normal' ? 'huge' : blast.size;
    explode(blast.x, blast.y, size);
    scar(blast.x, blast.y, size);
    if (size !== 'small') skyFlash(size);
    kickField(size === 'huge');
    [ 0, 1 ].forEach((side => {
        if (!blast.damage[side]) return;
        shownHull(side, -blast.damage[side]);
        floatOnField(view.xs[side], view.ys[side] + 58, `−${blast.damage[side]}`);
        blastOn(side, blast.direct === side || blast.size === 'huge');
    }));
    const inWater = view.water && blast.y <= view.water;
    playSound(blast.size === 'huge' || shot.finale ? 'mega' : blast.kind === 'bomb' ? 'bomb_hit' : blast.size === 'small' ? 'pop' : inWater ? 'miss' : blast.damage[0] || blast.damage[1] || blast.kind === 'surprise' ? 'blast' : 'thud');
}

function shotVerdict(shot) {
    const rival = 1 - shot.side;
    const toRival = shot.blasts.reduce(((sum, blast) => sum + blast.damage[rival]), 0);
    const toSelf = shot.blasts.reduce(((sum, blast) => sum + blast.damage[shot.side]), 0);
    if (shot.laid && shot.laid.length && !shot.blasts.length) return null;
    if (!shot.blasts.length) return [ artyLine('arty_gone', 'Gone!'), 'callout-miss' ];
    if (toSelf && !toRival) return [ artyLine('arty_self', 'Own goal!'), 'callout-sunk' ];
    if (shot.blasts.some((blast => blast.direct === rival))) return [ artyLine('arty_direct', 'Direct hit!'), 'callout-sunk' ];
    if (toRival) return [ artyLine('arty_near', 'Close!'), 'callout-hit' ];
    if (shot.opened.length) return null;
    return [ artyLine('arty_miss', 'Miss'), 'callout-miss' ];
}

function artyCloseUp(x, y) {
    const zoom = 1.7, bars = 11, fieldWidth = 177.94, width = 177.78;
    const left = width / 2 - fieldWidth / 2;
    const within = (value, low, high) => Math.min(Math.max(value, low), high);
    const moveX = within(width / 2 - zoom * (left + artyX(x)), width - zoom * (left + fieldWidth), -zoom * left);
    const moveY = within(58 - zoom * artyY(y), 100 - bars - zoom * 100, bars);
    return `translate(${moveX}vh,${moveY}vh) scale(${zoom})`;
}

function fly(view) {
    const shot = view.shot;
    artyFlying = true;
    artyHull = artyHull || view.hull.slice();
    const cannon = artyNodes.cannons[shot.side];
    cannon.aim.style.transform = `rotate(${-shot.angle}deg)`;
    cannon.barrel.classList.remove('recoil');
    void cannon.barrel.offsetWidth;
    cannon.barrel.classList.add('recoil');
    playSound('launch');
    const slow = shot.slow;
    const flightEnd = Math.max(...shot.segments.map((segment => segment.start + segment.ms)));
    playSound('whistle', flightEnd * slow / 1e3);
    if (shot.finale) {
        letterbox(true);
        const loser = view.hull.indexOf(0);
        if (loser >= 0) {
            const target = artyNodes.camera;
            const frame = artyCloseUp(view.xs[loser], view.ys[loser]);
            artyLater(flightEnd * slow * .45, (() => {
                target.style.transform = frame;
            }));
        }
    }
    for (const segment of shot.segments) artyLater(segment.start * slow, (() => flySegment(segment, slow)));
    for (const bounce of shot.bounces) artyLater(bounce.t * slow, (() => {
        playSound('boing');
        floatOnField(bounce.x, bounce.y + 30, artyLine('arty_boing', 'Boing!'), 'boing');
    }));
    for (const split of shot.splits) artyLater(split.t * slow, (() => {
        playSound('fire');
        explode(split.x, split.y, 'small');
    }));
    for (const opened of shot.opened) artyLater(opened.t * slow, (() => openCrate(opened, view)));
    for (const drill of shot.drills || []) {
        const under = shot.segments.find((segment => segment.kind === 'drilling' && Math.abs(segment.start - drill.t) < 1));
        artyLater(drill.t * slow, (() => drillIn(drill, under ? under.ms * slow : 400)));
    }
    for (const ignite of shot.ignites || []) artyLater(ignite.t * slow, (() => lightRocket(ignite)));
    for (const mark of shot.marks || []) artyLater(mark.t * slow, (() => lightFlare(mark, shot.strike, slow)));
    if (shot.strike) callStrike(shot.strike, slow);
    for (const mine of shot.laid || []) artyLater(mine.t * slow, (() => {
        placeMine(mine, true);
        floatOnField(mine.x, mine.y + 40, artyLine('arty_mine_laid', 'Mine laid'), 'boing');
    }));
    shot.blasts.forEach(((blast, i) => artyLater(blast.t * slow, (() => playBlast(blast, shot, view, i === 0)))));
    const strikeEnd = shot.strike ? [ shot.strike.t + 1800 ] : [];
    const times = [ ...shot.segments.map((segment => segment.start + segment.ms)), ...shot.blasts.map((blast => blast.t)), ...shot.opened.map((opened => opened.t)), ...strikeEnd ];
    artyLater(Math.max(0, ...times) * slow + 80, (() => {
        artyFlying = false;
        setGround(view);
        setCannons(view);
        setHulls(view);
        setMines(view);
        setArsenals(view);
        const verdict = shotVerdict(shot);
        if (verdict) artyCall(verdict[0], verdict[1]);
    }));
}

function driveCannon(view) {
    const trip = view.drive;
    artyFlying = true;
    artyHull = artyHull || view.hull.slice();
    const cannon = artyNodes.cannons[trip.side].cannon;
    const frames = trip.path.map((([x, y]) => ({
        transform: `translate3d(${artyX(x)}vh,${artyY(y)}vh,0)`
    })));
    cannon.style.transition = 'none';
    cannon.style.transform = frames[frames.length - 1].transform;
    cannon.animate(frames, {
        duration: trip.ms,
        easing: 'ease-in-out'
    });
    artyLater(trip.ms + 30, (() => {
        cannon.style.transition = '';
    }));
    playSound('drive', trip.ms / 1e3);
    artyCall(artyLine('arty_drive', 'Off it goes'), 'callout-miss');
    for (const opened of trip.opened) artyLater(opened.t, (() => openCrate(opened, view)));
    trip.blasts.forEach(((blast, i) => artyLater(blast.t, (() => playBlast(blast, trip, view, i === 0)))));
    const times = [ trip.ms, ...trip.blasts.map((blast => blast.t)), ...trip.opened.map((opened => opened.t)) ];
    if (trip.blasts.some((blast => blast.kind === 'mine'))) artyLater(trip.ms, (() => artyCall(artyLine('arty_mine_boom', 'Mine!'), 'callout-sunk')));
    artyLater(Math.max(...times) + 80, (() => {
        artyFlying = false;
        setGround(view);
        setCannons(view);
        setHulls(view);
        setMines(view);
    }));
}

function playDrop(view) {
    const drop = view.drop;
    artyHull = artyHull || view.hull.slice();
    for (const opened of drop.opened) openCrate(opened, view);
    if (!drop.blasts.length) return;
    artyFlying = true;
    drop.blasts.forEach(((blast, i) => artyLater(blast.t, (() => playBlast(blast, {
        finale: false
    }, view, i === 0)))));
    artyLater(Math.max(...drop.blasts.map((blast => blast.t))) + 80, (() => {
        artyFlying = false;
        setGround(view);
        setCannons(view);
        setHulls(view);
    }));
}

function setCrates(view) {
    const present = new Set(view.crates.map((crate => crate.id)));
    for (const [id, node] of artyNodes.crates) {
        if (present.has(id)) continue;
        node.remove();
        artyNodes.crates.delete(id);
    }
    for (const crate of view.crates) {
        let node = artyNodes.crates.get(crate.id);
        if (!node) {
            node = div('arty-crate');
            node.appendChild(div('arty-chute'));
            node.appendChild(div('arty-box'));
            node.style.transform = `translate3d(${artyX(crate.x)}vh,-12vh,0)`;
            artyNodes.field.appendChild(node);
            artyNodes.crates.set(crate.id, node);
            void node.offsetWidth;
        }
        node.style.transform = `translate3d(${artyX(crate.x)}vh,${artyY(crate.y)}vh,0)`;
        node.classList.toggle('landed', !crate.inAir);
    }
}

function setWind(view) {
    const wind = artyNodes.wind;
    wind.dataset.wind = view.wind;
    const rate = view.wind === 0 ? .25 : view.wind * 1.1;
    artyNodes.clouds.forEach((drift => {
        if (drift.playbackRate !== rate) drift.playbackRate = rate;
    }));
    const arrows = view.wind === 0 ? '·' : (view.wind > 0 ? '→' : '←').repeat(Math.abs(view.wind));
    wind.textContent = `${word('arty_wind', 'Wind')} ${arrows}`;
}

function setArsenals(view) {
    if (artyDealing) return;
    view.arsenals.forEach(((arsenal, side) => {
        const line = Object.entries(arsenal).map((([kind, count]) => `${word('arty_weapon_' + kind, kind)}${count > 1 ? ` ×${count}` : ''}`)).join(' · ');
        if (artyNodes.heads[side].arsenal.textContent !== line) artyNodes.heads[side].arsenal.textContent = line;
    }));
}

function drawArtillery(state) {
    const view = state.view;
    artyView = view;
    if (artyNodes && view.shots === 0 && view.drives === 0 && (artySeq > 0 || artyDriveSeq > 0)) {
        stopArtillery();
        $('artillery').textContent = '';
    }
    if (!artyNodes) {
        buildArtillery(view);
        setCannons(view);
        setHulls(view);
        setAims(view);
        setCrates(view);
        setWind(view);
        setMines(view);
        if (view.shots === 0 && view.drives === 0 && view.dealt && view.dealt.some((kinds => kinds.length))) playSlots(view);
    }
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    view.sides.forEach(((id, side) => {
        artyNodes.heads[side].name.textContent = nameOf(id);
        artyNodes.heads[side].head.classList.toggle('active', view.phase === 'aiming' && view.turn === side);
    }));
    if (view.drop && view.drop.seq !== artyDropSeq) {
        artyDropSeq = view.drop.seq;
        playDrop(view);
    }
    if (view.shot && view.shot.seq !== artySeq) {
        artySeq = view.shot.seq;
        fly(view);
    } else if (view.drive && view.drive.seq !== artyDriveSeq) {
        artyDriveSeq = view.drive.seq;
        driveCannon(view);
    } else if (!artyFlying) {
        setGround(view);
        setCannons(view);
        setHulls(view);
        setAims(view);
        setCrates(view);
        setWind(view);
        setMines(view);
        setArsenals(view);
    }
    setGuide(view);
    artyNodes.cannons.forEach(((cannon, side) => cannon.lamp.classList.toggle('on', view.phase === 'aiming' && view.turn === side)));
    artyNodes.status.textContent = view.phase === 'over' ? view.winner === 'draw' ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner)) : view.phase === 'flying' ? '' : word('arty_aims', '{name} aims').replace('{name}', nameOf(view.sides[view.turn]));
    artyNodes.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'aiming' ? view.clock : '';
    artyNodes.clock.classList.toggle('urgent', view.phase === 'aiming' && view.clock <= 5 && !away);
    if (view.phase === 'over' && !artyOver) {
        artyOver = true;
        const winner = view.sides.indexOf(view.winner);
        lightHalf(winner);
        playSound('win_artillery');
        letterbox(false);
        artyNodes.camera.style.transform = '';
        if (winner >= 0) {
            artyNodes.cannons[winner].cannon.classList.add('champion');
            drawVictory(artyNodes.effects, '');
        }
    } else if (view.phase === 'aiming') {
        lightHalf(view.turn);
        artyOver = false;
    }
    show('artillery');
}

function drillIn(drill, ms) {
    playSound('drill', ms / 1e3);
    kickField(false);
    for (let i = 0; i < 6; i++) {
        const clod = div('arty-clod');
        const angle = -Math.PI * (.15 + .7 * Math.random());
        const far = 4 + Math.random() * 6;
        clod.style.setProperty('--x', `${Math.cos(angle) * far}vh`);
        clod.style.setProperty('--y', `${Math.sin(angle) * far}vh`);
        const spot = div('arty-blast small');
        spot.style.transform = `translate3d(${artyX(drill.x)}vh,${artyY(drill.y)}vh,0)`;
        spot.appendChild(clod);
        artyNodes.field.appendChild(spot);
        setTimeout((() => spot.remove()), 1e3);
    }
}

function lightFlare(mark, strike, slow) {
    const flare = div('arty-flare');
    flare.style.transform = `translate3d(${artyX(mark.x)}vh,${artyY(mark.y)}vh,0)`;
    for (let i = 0; i < 4; i++) {
        const smoke = div('arty-flare-smoke');
        smoke.style.animationDelay = `${-i * .35}s`;
        flare.appendChild(smoke);
    }
    artyNodes.field.appendChild(flare);
    playSound('flare');
    floatOnField(mark.x, mark.y + 40, artyLine('arty_flare', 'Calling it in!'), 'boing');
    const until = strike ? (strike.t - mark.t) * slow + 1400 : 1500;
    artyLater(until, (() => flare.classList.add('out')));
    artyLater(until + 700, (() => flare.remove()));
}

function callStrike(strike, slow) {
    const edge = strike.dir > 0 ? -120 : 1120;
    const exit = strike.dir > 0 ? 1120 : -120;
    const speed = strike.speed / slow;
    const lead = Math.abs(strike.x - edge) / speed * 1e3;
    const begin = strike.t * slow - lead;
    const total = Math.abs(exit - edge) / speed * 1e3;
    const y = artyY(strike.y);
    artyLater(Math.max(0, begin), (() => {
        const plane = div(`arty-plane${strike.dir < 0 ? ' left' : ''}`);
        plane.append(div('arty-plane-body'), div('arty-plane-wing'), div('arty-plane-tail'), div('arty-plane-prop'));
        artyNodes.field.appendChild(plane);
        const skip = Math.max(0, -begin);
        const motion = plane.animate([ {
            transform: `translate3d(${artyX(edge)}vh,${y}vh,0)`
        }, {
            transform: `translate3d(${artyX(exit)}vh,${y}vh,0)`
        } ], {
            duration: total,
            easing: 'linear',
            fill: 'forwards'
        });
        motion.currentTime = skip;
        playSound('bomber', (total - skip) / 1e3);
        artyLater(total - skip, (() => plane.remove()));
    }));
}

function placeMine(mine, fresh) {
    let node = artyNodes.mines.get(mine.id);
    if (!node) {
        node = div('arty-mine');
        node.append(div('arty-mine-body'), div('arty-mine-light'));
        artyNodes.field.appendChild(node);
        artyNodes.mines.set(mine.id, node);
        if (fresh) {
            node.classList.add('fresh');
            playSound('mine_set');
        }
    }
    node.style.transform = `translate3d(${artyX(mine.x)}vh,${artyY(mine.y)}vh,0)`;
}

function removeMine(id) {
    const node = artyNodes.mines.get(id);
    if (!node) return;
    node.remove();
    artyNodes.mines.delete(id);
}

function setMines(view) {
    const present = new Set((view.mines || []).map((mine => mine.id)));
    for (const id of [ ...artyNodes.mines.keys() ]) if (!present.has(id)) removeMine(id);
    for (const mine of view.mines || []) placeMine(mine, false);
}

const ARTY_REEL = [ 'cluster', 'bouncer', 'drill', 'homing', 'mine', 'airstrike', 'mega' ];

const ARTY_REEL_ITEMS = 16;

const ARTY_ITEM_VH = 12;

function reelItem(kind) {
    const item = div('arty-reel-item');
    const icon = div(`arty-icon ${kind}`);
    icon.appendChild(div(`arty-shell ${kind}`));
    item.append(icon, div('arty-reel-name', word('arty_weapon_' + kind, kind)));
    return item;
}

function playSlots(view) {
    artyDealing = true;
    if (typeof counting !== 'undefined' && counting) {
        artyLater(100, (() => playSlots(view)));
        return;
    }
    const root = $('artillery');
    const box = div('arty-slots');
    let last = 0;
    view.dealt.forEach(((kinds, side) => {
        const machine = div(`arty-machine side-${side}`);
        const lights = div('arty-lights');
        for (let i = 0; i < 12; i++) {
            const bulb = document.createElement('i');
            bulb.style.animationDelay = `${-i * .09}s`;
            lights.appendChild(bulb);
        }
        const reels = div('arty-reels');
        kinds.forEach(((kind, r) => {
            const window_ = div('arty-reel');
            const strip = div('arty-strip');
            const items = [];
            const offset = Math.floor(Math.random() * ARTY_REEL.length);
            for (let i = 0; i < ARTY_REEL_ITEMS; i++) items.push(ARTY_REEL[(i + offset) % ARTY_REEL.length]);
            items.push(kind, ARTY_REEL[(offset + 3) % ARTY_REEL.length]);
            items.forEach((item => strip.appendChild(reelItem(item))));
            window_.appendChild(strip);
            reels.appendChild(window_);
            const stopAt = 1500 + (r * 2 + side) * 420;
            last = Math.max(last, stopAt);
            strip.animate([ {
                transform: 'translate3d(0,0,0)'
            }, {
                transform: `translate3d(0,${-ARTY_REEL_ITEMS * ARTY_ITEM_VH}vh,0)`
            } ], {
                duration: stopAt,
                easing: 'cubic-bezier(.2,.55,.3,1.08)',
                fill: 'forwards'
            });
            artyLater(stopAt - 60, (() => {
                window_.classList.add('stopped');
                playSound('reel_stop', kind === 'mega');
            }));
        }));
        machine.append(lights, reels);
        box.appendChild(machine);
    }));
    root.appendChild(box);
    let at = 0;
    while (at < last - 80) {
        const share = at / last;
        artyLater(at, (() => playSound('reel', share)));
        at += 55 + 220 * share * share;
    }
    artyLater(last + 1500, (() => {
        box.classList.add('leaving');
        artyDealing = false;
        setArsenals(artyView || view);
        artyNodes && artyNodes.heads.forEach((head => {
            head.arsenal.classList.remove('dealt');
            void head.arsenal.offsetWidth;
            head.arsenal.classList.add('dealt');
        }));
    }));
    artyLater(last + 2200, (() => box.remove()));
}

function lightRocket(ignite) {
    playSound('rocket_launch');
    const burst = div('arty-ignite');
    burst.style.transform = `translate3d(${artyX(ignite.x)}vh,${artyY(ignite.y)}vh,0)`;
    burst.addEventListener('animationend', (() => burst.remove()));
    artyNodes.field.appendChild(burst);
    floatOnField(ignite.x, Math.min(ignite.y + 40, 470), artyLine('arty_rocket', 'Locked on!'), 'boing');
}