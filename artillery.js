const ARTY_K = 100 / 562;

let artyNodes = null;

let artySeq = 0;

let artyDriveSeq = 0;

let artyFlying = false;

let artyOver = false;

let artyTimers = [];

let artyHull = null;

const artyX = x => x * ARTY_K;

const artyY = y => (562 - y) * ARTY_K;

function stopArtillery() {
    artyTimers.forEach(clearTimeout);
    artyTimers = [];
    artyNodes = null;
    artySeq = 0;
    artyDriveSeq = 0;
    artyFlying = false;
    artyOver = false;
    artyHull = null;
}

function artyLater(ms, action) {
    artyTimers.push(setTimeout(action, ms));
}

function groundPath(view) {
    const points = view.ground.map(((h, i) => `${i * view.column} ${562 - h}`));
    return `M0 562L${points.join('L')}L1000 562Z`;
}

function buildArtillery(view) {
    const root = $('artillery');
    root.textContent = '';
    const field = div('arty-field');
    field.innerHTML = `<svg class="arty-ground" viewBox="0 0 1000 562" preserveAspectRatio="none">\n    <defs><linearGradient id="arty-dirt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6f5a3a"/><stop offset=".45" stop-color="#3f3324"/><stop offset="1" stop-color="#1c1712"/></linearGradient></defs>\n    <path class="arty-land" fill="url(#arty-dirt)"/><path class="arty-grass" fill="none" stroke="#7fa650" stroke-width="4"/></svg>`;
    const land = field.querySelector('.arty-land');
    const grass = field.querySelector('.arty-grass');
    const cannons = [ 0, 1 ].map((side => {
        const cannon = div(`arty-cannon side-${side}`);
        const aim = div('arty-aim');
        const barrel = div('arty-barrel');
        const flash = div('arty-flash');
        barrel.appendChild(flash);
        aim.appendChild(barrel);
        cannon.append(aim, div('arty-hull'));
        field.appendChild(cannon);
        return {
            cannon: cannon,
            aim: aim,
            barrel: barrel,
            flash: flash
        };
    }));
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
    root.append(field, hud, div('siege-effects'));
    artyNodes = {
        field: field,
        land: land,
        grass: grass,
        cannons: cannons,
        heads: heads,
        status: status,
        clock: clock,
        wind: wind,
        crates: new Map,
        effects: root.querySelector('.siege-effects')
    };
    setGround(view);
}

function setGround(view) {
    const d = groundPath(view);
    artyNodes.land.setAttribute('d', d);
    artyNodes.grass.setAttribute('d', `M${view.ground.map(((h, i) => `${i * view.column} ${562 - h}`)).join('L')}`);
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
    }));
    artyHull = view.hull.slice();
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
    const blast = div(`arty-blast ${size}`);
    blast.style.transform = `translate3d(${artyX(x)}vh,${artyY(y)}vh,0)`;
    blast.appendChild(div('arty-fire'));
    blast.appendChild(div('arty-ring'));
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
    artyNodes.field.appendChild(blast);
    artyLater(1300, (() => blast.remove()));
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

function flySegment(segment, shot) {
    const shell = div(`arty-shell ${segment.kind}`);
    artyNodes.field.appendChild(shell);
    const frames = segment.path.map((([x, y]) => ({
        transform: `translate3d(${artyX(x)}vh,${artyY(y)}vh,0)`
    })));
    shell.animate(frames, {
        duration: Math.max(1, segment.ms),
        easing: 'linear',
        fill: 'forwards'
    });
    const every = Math.max(1, Math.round(segment.path.length / (segment.kind === 'bomblet' ? 5 : 16)));
    const stepMs = segment.ms / Math.max(1, segment.path.length - 1);
    segment.path.forEach((([x, y], i) => {
        if (i % every || i === 0) return;
        artyLater(i * stepMs, (() => {
            const puff = div('arty-puff');
            puff.style.transform = `translate3d(${artyX(x)}vh,${artyY(y)}vh,0)`;
            puff.addEventListener('animationend', (() => puff.remove()));
            artyNodes.field.appendChild(puff);
        }));
    }));
    artyLater(segment.ms, (() => shell.remove()));
}

function openCrate(event, view) {
    const crate = artyNodes.crates.get(event.id);
    if (crate) {
        crate.remove();
        artyNodes.crates.delete(event.id);
    }
    const line = word('arty_crate_' + event.holds, event.holds);
    floatOnField(event.x, event.y + 30, line, 'crate-prize');
    playSound(event.holds === 'surprise' ? 'fire' : 'ready');
}

function shownHull(side, change) {
    artyHull[side] = Math.max(0, artyHull[side] + change);
    const head = artyNodes.heads[side];
    head.fill.style.transform = `scaleX(${artyHull[side] / 100})`;
    head.value.textContent = artyHull[side];
}

function playBlast(blast, shot, view, first) {
    if (first) setGround(view);
    explode(blast.x, blast.y, blast.size);
    kickField(blast.size === 'huge');
    [ 0, 1 ].forEach((side => {
        if (!blast.damage[side]) return;
        shownHull(side, -blast.damage[side]);
        floatOnField(view.xs[side], view.ys[side] + 58, `−${blast.damage[side]}`);
        blastOn(side, blast.direct === side || blast.size === 'huge');
    }));
    playSound(blast.size === 'huge' || blast.direct !== null ? 'sunk' : blast.size === 'small' ? 'hit' : blast.damage[0] || blast.damage[1] ? 'hit' : 'thud');
}

function shotVerdict(shot) {
    const rival = 1 - shot.side;
    const toRival = shot.blasts.reduce(((sum, blast) => sum + blast.damage[rival]), 0);
    const toSelf = shot.blasts.reduce(((sum, blast) => sum + blast.damage[shot.side]), 0);
    if (!shot.blasts.length) return [ artyLine('arty_gone', 'Gone!'), 'callout-miss' ];
    if (toSelf && !toRival) return [ artyLine('arty_self', 'Own goal!'), 'callout-sunk' ];
    if (shot.blasts.some((blast => blast.direct === rival))) return [ artyLine('arty_direct', 'Direct hit!'), 'callout-sunk' ];
    if (toRival) return [ artyLine('arty_near', 'Close!'), 'callout-hit' ];
    if (shot.opened.length) return null;
    return [ artyLine('arty_miss', 'Miss'), 'callout-miss' ];
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
    for (const segment of shot.segments) artyLater(segment.start, (() => flySegment(segment, shot)));
    for (const bounce of shot.bounces) artyLater(bounce.t, (() => {
        playSound('thud');
        floatOnField(bounce.x, bounce.y + 30, artyLine('arty_boing', 'Boing!'), 'boing');
    }));
    for (const split of shot.splits) artyLater(split.t, (() => {
        playSound('fire');
        explode(split.x, split.y, 'small');
    }));
    for (const opened of shot.opened) artyLater(opened.t, (() => openCrate(opened, view)));
    shot.blasts.forEach(((blast, i) => artyLater(blast.t, (() => playBlast(blast, shot, view, i === 0)))));
    const times = [ ...shot.segments.map((segment => segment.start + segment.ms)), ...shot.blasts.map((blast => blast.t)), ...shot.opened.map((opened => opened.t)) ];
    artyLater(Math.max(0, ...times) + 80, (() => {
        artyFlying = false;
        setGround(view);
        setCannons(view);
        setHulls(view);
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
    playSound('fire');
    artyCall(artyLine('arty_drive', 'Off it goes'), 'callout-miss');
    for (const opened of trip.opened) artyLater(opened.t, (() => openCrate(opened, view)));
    trip.blasts.forEach(((blast, i) => artyLater(blast.t, (() => playBlast(blast, trip, view, i === 0)))));
    const times = [ trip.ms, ...trip.blasts.map((blast => blast.t)), ...trip.opened.map((opened => opened.t)) ];
    artyLater(Math.max(...times) + 80, (() => {
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
    const arrows = view.wind === 0 ? '·' : (view.wind > 0 ? '→' : '←').repeat(Math.abs(view.wind));
    wind.textContent = `${word('arty_wind', 'Wind')} ${arrows}`;
}

function setArsenals(view) {
    view.arsenals.forEach(((arsenal, side) => {
        const line = Object.entries(arsenal).map((([kind, count]) => `${word('arty_weapon_' + kind, kind)}${count > 1 ? ` ×${count}` : ''}`)).join(' · ');
        if (artyNodes.heads[side].arsenal.textContent !== line) artyNodes.heads[side].arsenal.textContent = line;
    }));
}

function drawArtillery(state) {
    const view = state.view;
    if (artyNodes && view.shots === 0 && view.drives === 0 && (artySeq > 0 || artyDriveSeq > 0)) stopArtillery();
    if (!artyNodes) {
        buildArtillery(view);
        setCannons(view);
        setHulls(view);
        setAims(view);
        setCrates(view);
        setWind(view);
    }
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    view.sides.forEach(((id, side) => {
        artyNodes.heads[side].name.textContent = nameOf(id);
        artyNodes.heads[side].head.classList.toggle('active', view.phase === 'aiming' && view.turn === side);
    }));
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
        setArsenals(view);
    }
    artyNodes.status.textContent = view.phase === 'over' ? view.winner === 'draw' ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner)) : view.phase === 'flying' ? '' : word('arty_aims', '{name} aims').replace('{name}', nameOf(view.sides[view.turn]));
    artyNodes.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'aiming' ? view.clock : '';
    artyNodes.clock.classList.toggle('urgent', view.phase === 'aiming' && view.clock <= 5 && !away);
    if (view.phase === 'over' && !artyOver) {
        artyOver = true;
        const winner = view.sides.indexOf(view.winner);
        lightHalf(winner);
        playSound('win');
        if (winner >= 0) drawVictory(artyNodes.effects, '');
    } else if (view.phase === 'aiming') {
        lightHalf(view.turn);
        artyOver = false;
    }
    show('artillery');
}