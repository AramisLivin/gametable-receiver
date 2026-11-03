const DD_SVG = 'http://www.w3.org/2000/svg';

const DD_K = 100 / 562;

function ddSvg(cls, viewBox) {
    const svg = document.createElementNS(DD_SVG, 'svg');
    if (cls) svg.setAttribute('class', cls);
    if (viewBox) svg.setAttribute('viewBox', viewBox);
    return svg;
}

function ddShape(tag, attrs) {
    const shape = document.createElementNS(DD_SVG, tag);
    for (const [key, value] of Object.entries(attrs)) shape.setAttribute(key, value);
    return shape;
}

const ddPoints = flat => {
    let out = '';
    for (let i = 0; i + 1 < flat.length; i += 2) out += `${flat[i]},${flat[i + 1]} `;
    return out;
};

const ddLine = (flat, cls, width) => ddShape('polyline', {
    points: ddPoints(flat),
    class: cls,
    ...width ? {
        'stroke-width': width
    } : {}
});

function ddOneOf(key, fallback) {
    const lines = word(key, fallback).split('|');
    return lines[Math.floor(Math.random() * lines.length)];
}

function ddPencil(side) {
    const pencil = div(`dd-pencil side-${side}`);
    const svg = ddSvg('dd-scrawl', '0 0 200 80');
    svg.appendChild(ddShape('path', {
        d: 'M6 52C24 8 34 74 54 34S84 12 94 52 126 66 138 26 170 18 194 50'
    }));
    const hand = div('dd-pencil-hand');
    hand.appendChild(div('dd-pencil-body'));
    pencil.append(svg, hand, div('dd-pencil-done', '✓'));
    return pencil;
}

function doodleScreen(id, game) {
    let ui = null, seq = 0, over = false, showing = false, timers = [], shownPoints = [ 0, 0 ];
    const later = (ms, action) => timers.push(setTimeout(action, ms));
    function stop() {
        timers.forEach(clearTimeout);
        timers = [];
        ui = null;
        seq = 0;
        over = false;
        showing = false;
        shownPoints = [ 0, 0 ];
        $(id).textContent = '';
        $(id).classList.remove('on');
    }
    function build(view) {
        const root = $(id);
        root.textContent = '';
        const stage = div('dd-stage');
        const hud = div('arty-hud');
        const heads = [ 0, 1 ].map((side => {
            const head = div(`arty-head side-${side}`);
            const name = div('arty-name');
            const pips = div('dd-pips');
            head.append(name, pips);
            return {
                head: head,
                name: name,
                pips: pips
            };
        }));
        const middle = div('arty-middle');
        const statusLine = div('arty-status');
        const clock = div('arty-clock');
        middle.append(statusLine, clock);
        hud.append(heads[0].head, middle, heads[1].head);
        const pencils = [ 0, 1 ].map(ddPencil);
        const sketch = div('dd-sketch');
        sketch.append(...pencils);
        const effects = div('siege-effects');
        root.append(stage, sketch, hud, effects);
        ui = {
            root: root,
            stage: stage,
            heads: heads,
            status: statusLine,
            clock: clock,
            effects: effects,
            pencils: pencils
        };
        game.build(ui, view);
    }
    function setPips(view) {
        view.points.forEach(((value, side) => {
            const pips = ui.heads[side].pips;
            pips.textContent = '';
            if (view.pointsToWin < 2) return;
            for (let i = 0; i < view.pointsToWin; i++) {
                const pip = document.createElement('i');
                if (i < value) pip.className = i === value - 1 && value > shownPoints[side] ? 'on fresh' : 'on';
                pips.appendChild(pip);
            }
            shownPoints[side] = value;
        }));
    }
    function draw(state) {
        const view = state.view;
        if (ui && (view.show ? view.show.seq : 0) < seq) stop();
        if (!ui) build(view);
        const nameOf = who => (state.players.find((p => p.id === who)) || {}).name || '?';
        const away = view.sides.find((who => !(state.players.find((p => p.id === who)) || {}).online));
        view.sides.forEach(((who, side) => {
            ui.heads[side].name.textContent = nameOf(who);
        }));
        ui.pencils.forEach(((pencil, side) => {
            pencil.classList.toggle('at-work', view.phase === 'drawing' && !view.ready[side]);
            pencil.classList.toggle('done', view.phase === 'drawing' && view.ready[side]);
        }));
        if (view.show && view.show.seq !== seq) {
            seq = view.show.seq;
            showing = true;
            game.play(ui, view.show, view, later);
            later(view.show.total || view.show.ms, (() => {
                showing = false;
                setPips(view);
            }));
        }
        if (view.phase !== 'showing') showing = false;
        if (!showing) setPips(view);
        if (view.phase !== 'showing' && !showing) game.idle(ui, view, state);
        ui.status.textContent = view.phase === 'over' ? view.winner === 'draw' ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner)) : view.phase === 'showing' ? '' : game.status(view);
        ui.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'drawing' ? view.clock : '';
        ui.clock.classList.toggle('urgent', view.phase === 'drawing' && view.clock <= 5 && !away);
        if (view.phase === 'over' && !over) {
            over = true;
            playSound('win');
            if (view.sides.includes(view.winner)) drawVictory(ui.effects, '');
        }
        lightHalf(-1);
        show(id);
    }
    return {
        draw: draw,
        stop: stop
    };
}

function ddCall(ui, text, cls = 'callout-hit') {
    ui.effects.querySelectorAll('.callout').forEach((old => old.remove()));
    const note = div(`callout ${cls}`, text);
    note.addEventListener('animationend', (() => note.remove()));
    ui.effects.appendChild(note);
}

function ddShake(node, big) {
    node.classList.remove('shake', 'shake-big');
    void node.offsetWidth;
    node.classList.add(big ? 'shake-big' : 'shake');
}

const RAM_BOX = 210;

const RAM_CHUNKS = 16;

const ramX = x => x * DD_K;

const ramY = y => (562 - y) * DD_K;

function ramCave() {
    const svg = ddSvg('ram-cave', '0 0 1000 562');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.appendChild(ddShape('polygon', {
        class: 'ram-far',
        points: '0,562 0,300 70,250 130,320 210,210 290,330 360,270 450,360 560,350 640,260 720,340 800,220 880,320 950,240 1000,300 1000,562'
    }));
    svg.appendChild(ddShape('polygon', {
        class: 'ram-roof',
        points: '0,0 1000,0 1000,70 930,120 870,60 790,110 720,50 640,95 560,40 470,90 400,45 320,115 240,55 170,100 90,50 0,120'
    }));
    svg.appendChild(ddShape('path', {
        class: 'ram-crust',
        d: 'M0 492 Q60 478 120 492 T240 492 T360 492 T480 492 T600 492 T720 492 T840 492 T960 492 T1080 492 V562 H0 Z'
    }));
    return svg;
}

function ramChunk(i, left, width, top) {
    const chunk = div('ram-chunk');
    chunk.style.cssText = `left:${left + i * width}vh;top:${top}vh;width:${width + .15}vh`;
    const r = n => (i * 37 + n * 53) % 19 / 19;
    chunk.style.clipPath = `polygon(0 0, 100% 0, 100% ${58 + r(1) * 30}%, ${70 + r(2) * 20}% ${80 + r(3) * 20}%, ${35 + r(4) * 25}% ${72 + r(5) * 28}%, ${r(6) * 18}% ${55 + r(7) * 35}%, 0 ${40 + r(8) * 30}%)`;
    return chunk;
}

function ramEyes(lines, side) {
    const front = side === 0 ? 1 : -1;
    let best = null, score = -Infinity;
    for (const line of lines) {
        for (let i = 0; i + 1 < line.length; i += 2) {
            const value = line[i + 1] + line[i] * front * .45;
            if (value > score) {
                score = value;
                best = [ line[i], -line[i + 1] ];
            }
        }
    }
    const eyes = document.createElementNS(DD_SVG, 'g');
    if (!best) return eyes;
    const [x, y] = best;
    for (const [dx, r] of [ [ -11, 11 ], [ 11, 13 ] ]) {
        const cx = x + dx * front;
        eyes.appendChild(ddShape('circle', {
            cx: cx,
            cy: y,
            r: r + 2,
            class: 'ram-eye-rim'
        }));
        eyes.appendChild(ddShape('circle', {
            cx: cx,
            cy: y,
            r: r,
            class: 'ram-eye'
        }));
        eyes.appendChild(ddShape('circle', {
            cx: cx + 4 * front,
            cy: y + 1,
            r: r * .5,
            class: 'ram-pupil'
        }));
    }
    return eyes;
}

const RAM_SCREEN = doodleScreen('ram', {
    build(ui, view) {
        const field = div('dd-field ram-field');
        field.appendChild(ramCave());
        for (let i = 0; i < 7; i++) {
            const ember = div('ram-ember');
            ember.style.left = `${12 + i * 13 + i % 2 * 5}%`;
            ember.style.animationDuration = `${5 + i * 7 % 4}s`;
            ember.style.animationDelay = `${-i * 1.1}s`;
            field.appendChild(ember);
        }
        const shelf = div('ram-shelf');
        const width = view.shelfHalf * 2 * DD_K / RAM_CHUNKS;
        const chunks = [];
        for (let i = 0; i < RAM_CHUNKS; i++) {
            const chunk = ramChunk(i, ramX(500 - view.shelfHalf), width, ramY(view.floor));
            shelf.appendChild(chunk);
            chunks.push(chunk);
        }
        field.appendChild(shelf);
        const lava = div('ram-lava');
        field.appendChild(lava);
        ui.stage.appendChild(field);
        ui.field = field;
        ui.chunks = chunks;
        ui.bodies = [];
    },
    idle(ui, view) {
        if (view.phase === 'over') return;
        ui.bodies.forEach((body => body.remove()));
        ui.bodies = [];
        ui.chunks.forEach((chunk => chunk.getAnimations().forEach((animation => animation.cancel()))));
    },
    status: () => word('dd_drawing', 'Drawing…'),
    play(ui, show, view, later) {
        ui.bodies.forEach((body => body.remove()));
        const count = show.frames.length / 6;
        const lead = show.lead;
        const at = (i, side) => {
            const index = i * 6 + side * 3;
            return `translate3d(${ramX(show.frames[index])}vh,${ramY(show.frames[index + 1])}vh,0) rotate(${-show.frames[index + 2]}rad)`;
        };
        ui.bodies = show.shapes.map(((lines, side) => {
            const body = div(`ram-body side-${side}`);
            const svg = ddSvg('', `${-RAM_BOX} ${-RAM_BOX} ${RAM_BOX * 2} ${RAM_BOX * 2}`);
            const size = RAM_BOX * 2 * DD_K;
            svg.style.cssText = `left:${-size / 2}vh;top:${-size / 2}vh;width:${size}vh;height:${size}vh`;
            const flipped = lines.map((line => line.map(((value, i) => i % 2 ? -value : value))));
            for (const line of flipped) svg.appendChild(ddLine(line, 'ram-rim', 26));
            for (const line of flipped) svg.appendChild(ddLine(line, 'dd-line', 16));
            svg.appendChild(ramEyes(lines, side));
            body.appendChild(svg);
            ui.field.appendChild(body);
            const start = at(0, side);
            body.style.transform = start;
            body.animate([ {
                transform: `translate3d(${ramX(show.frames[side * 3])}vh,-40vh,0) rotate(${side ? -.5 : .5}rad)`
            }, {
                transform: start
            } ], {
                duration: lead * .55,
                delay: side * 180,
                easing: 'cubic-bezier(.5, 0, .9, .6)',
                fill: 'backwards'
            });
            later(lead * .55 + side * 180, (() => {
                playSound('thud');
                ddShake(ui.field, false);
            }));
            later(lead, (() => {
                const frames = [];
                for (let i = 0; i < count; i++) frames.push({
                    transform: at(i, side)
                });
                body.animate(frames, {
                    duration: (count - 1) * show.step,
                    easing: 'linear',
                    fill: 'forwards'
                });
            }));
            return body;
        }));
        later(lead * .72, (() => ddCall(ui, word('dd_fight', 'Fight!'), 'callout-hit')));
        const half = RAM_CHUNKS / 2;
        ui.chunks.forEach(((chunk, i) => {
            const fromMiddle = Math.abs(i + .5 - half) / half;
            chunk.animate([ {
                transform: 'none',
                opacity: 1
            }, {
                transform: `translate3d(${i < half ? -2 : 2}vh,46vh,0) rotate(${i % 2 ? 40 : -35}deg)`,
                opacity: .2
            } ], {
                delay: lead + show.crumbleAfter + show.crumbleMs * (1 - fromMiddle),
                duration: 900,
                easing: 'cubic-bezier(.5, 0, 1, .7)',
                fill: 'forwards'
            });
        }));
        for (const kick of show.kicks) {
            later(lead + kick.t, (() => {
                playSound('thud');
                const index = Math.round(kick.t / show.step) * 6 + kick.side * 3;
                const puff = div('ram-dust');
                puff.style.transform = `translate3d(${ramX(show.frames[index])}vh,${ramY(view.floor)}vh,0)`;
                puff.addEventListener('animationend', (() => puff.remove()));
                ui.field.appendChild(puff);
            }));
        }
        for (const hit of show.hits) {
            later(lead + hit.t, (() => {
                const big = hit.power > 280;
                blastAt(ui.field, ramX(hit.x), ramY(hit.y), big ? 'normal' : 'small');
                playSound(big ? 'blast' : 'pop');
                ddShake(ui.field, big);
            }));
        }
        show.falls.forEach(((time, side) => {
            if (time < 0) return;
            later(lead + time, (() => {
                const index = Math.min(Math.round(time / show.step), count - 1) * 6 + side * 3;
                blastAt(ui.field, ramX(show.frames[index]), ramY(50), 'huge');
                playSound('mega');
                ddShake(ui.field, true);
                ui.bodies[side].style.visibility = 'hidden';
                ddCall(ui, ddOneOf('dd_lava', 'Into the lava!'), 'callout-sunk');
            }));
        }));
        if (show.loser === null) later(show.total - 300, (() => ddCall(ui, word('dd_tie', 'Nobody scores'), 'callout-miss')));
    }
});

const CP_MAP_VH = 76;

const CP_K = CP_MAP_VH / 400;

function cpLand(land) {
    const svg = ddSvg('cp-land', '0 0 400 400');
    for (let i = 50; i < 400; i += 50) {
        svg.appendChild(ddShape('line', {
            x1: i,
            y1: 0,
            x2: i,
            y2: 400,
            class: 'cp-gridline'
        }));
        svg.appendChild(ddShape('line', {
            x1: 0,
            y1: i,
            x2: 400,
            y2: i,
            class: 'cp-gridline'
        }));
    }
    for (const [x, y, r] of land.woods) {
        svg.appendChild(ddShape('circle', {
            cx: x,
            cy: y,
            r: r,
            class: 'cp-wood'
        }));
        svg.appendChild(ddShape('circle', {
            cx: x + r * .5,
            cy: y - r * .3,
            r: r * .7,
            class: 'cp-wood'
        }));
    }
    svg.appendChild(ddLine(land.river, 'cp-river'));
    svg.appendChild(ddLine(land.road, 'cp-road-edge'));
    svg.appendChild(ddLine(land.road, 'cp-road'));
    return svg;
}

const CARPET_SCREEN = doodleScreen('carpet', {
    build(ui, view) {
        const maps = div('cp-maps');
        ui.maps = [ 0, 1 ].map((side => {
            const holder = div(`cp-holder side-${side}`);
            const map = div(`cp-map side-${side}`);
            map.appendChild(cpLand(view.terrain[side]));
            const bar = div('cp-bar');
            const fill = document.createElement('i');
            const line = div('cp-bar-line');
            line.style.left = `${100 - view.lostAt}%`;
            bar.append(fill, line);
            const left = div('cp-left');
            bar.appendChild(left);
            holder.append(map, bar);
            maps.appendChild(holder);
            return {
                map: map,
                fill: fill,
                left: left,
                marks: [],
                outline: null
            };
        }));
        ui.stage.appendChild(maps);
    },
    idle(ui, view) {
        ui.maps.forEach(((board, side) => {
            cpSetLeft(board, view.left[side]);
            if (board.marks.length !== view.marks[side].length) {
                board.marks.forEach((mark => mark.remove()));
                board.marks = view.marks[side].map((([x, y, hit]) => cpMark(board, x, y, hit)));
            }
            if (view.bases && view.bases[side] && !board.outline) {
                const svg = ddSvg('cp-outline', '0 0 400 400');
                svg.appendChild(ddShape('polygon', {
                    points: ddPoints(view.bases[side])
                }));
                board.map.appendChild(svg);
                board.outline = svg;
            }
        }));
    },
    status: view => word(view.stage === 'base' ? 'dd_base_stage' : 'dd_run_stage', 'Drawing…'),
    play(ui, show, view, later) {
        for (const run of show.runs) {
            const board = ui.maps[1 - run.side];
            if (run.path.length < 4 || !run.ms) continue;
            const route = ddSvg('cp-outline', '0 0 400 400');
            route.appendChild(ddLine(run.path, `cp-run side-${run.side}`));
            board.map.appendChild(route);
            later(show.ms - 600, (() => route.remove()));
            const plane = div(`cp-plane side-${run.side}`);
            const shadow = div('cp-plane-shadow');
            const frames = [];
            let total = 0;
            for (let i = 0; i + 3 < run.path.length; i += 2) total += Math.hypot(run.path[i + 2] - run.path[i], run.path[i + 3] - run.path[i + 1]);
            let along = 0;
            for (let i = 0; i + 1 < run.path.length; i += 2) {
                const next = i + 3 < run.path.length ? i + 2 : i;
                const before = next === i ? i - 2 : i;
                const angle = Math.atan2(run.path[before + 3] - run.path[before + 1], run.path[before + 2] - run.path[before]);
                frames.push({
                    transform: `translate3d(${run.path[i] * CP_K}vh,${run.path[i + 1] * CP_K}vh,0) rotate(${angle}rad)`,
                    offset: total ? along / total : 0
                });
                if (i + 3 < run.path.length) along += Math.hypot(run.path[i + 2] - run.path[i], run.path[i + 3] - run.path[i + 1]);
            }
            board.map.append(shadow, plane);
            plane.animate(frames, {
                duration: run.ms,
                easing: 'linear',
                fill: 'forwards'
            });
            shadow.animate(frames, {
                duration: run.ms,
                easing: 'linear',
                fill: 'forwards'
            });
            later(run.ms + 80, (() => {
                plane.remove();
                shadow.remove();
            }));
            let hits = 0, shookAt = -Infinity;
            for (const bomb of run.bombs) {
                later(bomb.t, (() => {
                    board.marks.push(cpMark(board, bomb.x, bomb.y, bomb.hit));
                    if (!bomb.hit) {
                        playSound('pop');
                        return;
                    }
                    playSound('blast');
                    if (hits++ % 2 === 0) blastAt(board.map, bomb.x * CP_K, bomb.y * CP_K, 'small');
                    if (bomb.t - shookAt >= 450) {
                        shookAt = bomb.t;
                        ddShake(board.map, false);
                    }
                }));
            }
        }
        later(show.ms - 1400, (() => {
            ui.maps.forEach(((board, side) => cpSetLeft(board, show.left[side])));
            const hits = show.runs.map((run => run.bombs.filter((bomb => bomb.hit)).length));
            if (hits[0] || hits[1]) ddCall(ui, ddOneOf('arty_direct', 'Direct hit!'), 'callout-sunk'); else ddCall(ui, ddOneOf('arty_miss', 'Miss'), 'callout-miss');
        }));
    }
});

function cpSetLeft(board, value) {
    board.fill.style.transform = `scaleX(${value / 100})`;
    board.left.textContent = `${value}%`;
}

function cpMark(board, x, y, hit) {
    const mark = div('cp-mark' + (hit ? ' hit' : ''));
    mark.style.left = `${x * CP_K}vh`;
    mark.style.top = `${y * CP_K}vh`;
    board.map.appendChild(mark);
    return mark;
}

function rkStars() {
    const stars = div('rk-stars');
    const shadows = [];
    for (let i = 0; i < 110; i++) {
        const big = i % 6 === 0;
        shadows.push(`${(Math.random() * 178).toFixed(1)}vh ${(Math.random() * 100).toFixed(1)}vh 0 ${big ? .1 : 0}vh rgba(${i % 4 ? '230, 235, 255' : '255, 215, 190'}, ${(.3 + Math.random() * .6).toFixed(2)})`);
    }
    stars.style.boxShadow = shadows.join(',');
    return stars;
}

const ROCKETS_SCREEN = doodleScreen('rockets', {
    build(ui, view) {
        const sky = div('rk-sky');
        sky.append(rkStars());
        ui.stage.appendChild(sky);
        const field = div('dd-field rk-field');
        const lines = ddSvg('rk-lines', `0 0 ${view.width} ${view.height}`);
        field.appendChild(lines);
        ui.bases = [ view.baseX, view.width - view.baseX ].map(((x, side) => {
            const base = div(`rk-base side-${side}`);
            base.style.left = `${x * DD_K}vh`;
            base.style.top = `${view.height / 2 * DD_K}vh`;
            const ring = div('rk-ring');
            const globe = div('rk-globe');
            const scars = [ 0, 1, 2 ].map((i => {
                const scar = div(`rk-scar rk-scar-${i}`);
                globe.appendChild(scar);
                return scar;
            }));
            base.append(globe, ring);
            field.appendChild(base);
            return {
                base: base,
                scars: scars
            };
        }));
        ui.stage.appendChild(field);
        ui.field = field;
        ui.lines = lines;
    },
    idle(ui, view) {
        if (view.phase !== 'over') ui.lines.textContent = '';
        rkScars(ui, view.points);
    },
    status: () => word('dd_drawing', 'Drawing…'),
    play(ui, show, view, later) {
        ui.lines.textContent = '';
        for (const wall of show.walls) {
            if (wall.length < 4) continue;
            ui.lines.appendChild(ddLine(wall, 'rk-wall-glow'));
            ui.lines.appendChild(ddLine(wall, 'rk-wall'));
        }
        for (const rocket of show.rockets) if (rocket.path.length >= 4) ui.lines.appendChild(ddLine(rocket.path, `rk-route dd-line side-${rocket.side}`));
        for (const rocket of show.rockets) {
            if (rocket.end === 'none') continue;
            const frames = rkFrames(rocket);
            const node = div(`rk-rocket side-${rocket.side}`);
            node.appendChild(div('rk-flame'));
            ui.field.appendChild(node);
            node.animate(frames, {
                duration: Math.max(1, rocket.ms),
                easing: 'linear',
                fill: 'forwards'
            });
            playSound('launch');
            rkTrail(ui, rocket, later);
            later(rocket.ms, (() => {
                node.remove();
                const big = rocket.end === 'base';
                blastAt(ui.field, rocket.x * DD_K, rocket.y * DD_K, big ? 'huge' : 'normal');
                playSound(big ? 'mega' : rocket.end === 'fuel' ? 'thud' : 'blast');
                if (!big && !(rocket.end === 'rocket' && rocket.side === 1)) rkLabel(ui, rocket);
                ddShake(ui.field, big);
                if (big) {
                    const base = ui.bases[1 - rocket.side].base;
                    base.classList.remove('hit');
                    void base.offsetWidth;
                    base.classList.add('hit');
                    rkScars(ui, view.points);
                }
            }));
        }
        const results = show.rockets.map((rocket => rocket.end));
        const last = Math.max(...show.rockets.map((rocket => rocket.ms)));
        later(last + 100, (() => {
            if (results.includes('base')) ddCall(ui, ddOneOf('dd_hit_base', 'Bullseye!'), 'callout-sunk'); else if (results.every((end => end === 'none'))) ddCall(ui, word('dd_none', 'Nothing launched'), 'callout-miss');
        }));
    }
});

function rkScars(ui, points) {
    ui.bases.forEach((({scars: scars}, side) => scars.forEach(((scar, i) => scar.classList.toggle('on', i < points[1 - side])))));
}

function rkTrail(ui, rocket, later) {
    const every = Math.max(30, rocket.flown / 22);
    let along = 0, next = every;
    for (let i = 0; i + 3 < rocket.path.length && along < rocket.flown; i += 2) {
        const dx = rocket.path[i + 2] - rocket.path[i], dy = rocket.path[i + 3] - rocket.path[i + 1];
        const step = Math.hypot(dx, dy);
        while (next < along + step && next < rocket.flown) {
            const part = (next - along) / step;
            const x = rocket.path[i] + dx * part, y = rocket.path[i + 1] + dy * part, time = next / rocket.flown * rocket.ms;
            later(time, (() => {
                const puff = div('arty-puff shell');
                puff.style.transform = `translate3d(${x * DD_K}vh,${y * DD_K}vh,0)`;
                puff.addEventListener('animationend', (() => puff.remove()));
                ui.field.appendChild(puff);
            }));
            next += every;
        }
        along += step;
    }
}

function rkLabel(ui, rocket) {
    const text = rocket.end === 'wall' ? ddOneOf('dd_on_wall', 'Into the wall!') : rocket.end === 'rocket' ? word('dd_head_on', 'Head on!') : ddOneOf('dd_fuel', 'Line ends here');
    const note = div('arty-damage rk-label', text);
    note.style.left = `${rocket.x * DD_K}vh`;
    note.style.top = `${Math.max(14, (rocket.y - 40) * DD_K)}vh`;
    note.addEventListener('animationend', (() => note.remove()));
    ui.field.appendChild(note);
}

function rkFrames(rocket) {
    const points = [];
    for (let i = 0; i + 1 < rocket.path.length; i += 2) points.push([ rocket.path[i], rocket.path[i + 1] ]);
    const frames = [];
    let along = 0;
    for (let i = 0; i < points.length; i++) {
        const [x, y] = points[i];
        const [nx, ny] = points[Math.min(i + 1, points.length - 1)];
        const step = Math.hypot(nx - x, ny - y);
        const angle = step ? Math.atan2(ny - y, nx - x) : frames.length ? frames[frames.length - 1].angle : 0;
        const stop = along + step >= rocket.flown;
        frames.push({
            transform: `translate3d(${x * DD_K}vh,${y * DD_K}vh,0) rotate(${angle}rad)`,
            offset: Math.min(1, along / Math.max(1, rocket.flown)),
            angle: angle
        });
        if (stop) {
            const left = step ? (rocket.flown - along) / step : 0;
            frames.push({
                transform: `translate3d(${(x + (nx - x) * left) * DD_K}vh,${(y + (ny - y) * left) * DD_K}vh,0) rotate(${angle}rad)`,
                offset: 1,
                angle: angle
            });
            break;
        }
        along += step;
    }
    return frames.map((({transform: transform, offset: offset}) => ({
        transform: transform,
        offset: offset
    })));
}

const RECALL_SCREEN = doodleScreen('recall', {
    build(ui, view) {
        ui.stage.appendChild(div('rc-desk'));
        ui.pad = view.pad;
        ui.flashKey = null;
        ui.sheet = div('rc-work');
        ui.stage.appendChild(ui.sheet);
    },
    idle(ui, view) {
        if (view.phase === 'over') return;
        const key = view.phase === 'prelude' ? `flash${view.round}` : view.phase;
        if (key === ui.flashKey) return;
        ui.flashKey = key;
        ui.sheet.textContent = '';
        if (view.phase === 'prelude' && view.flash) {
            const sheet = div('rc-page rc-flash-page');
            const svg = ddSvg('rc-flash', `-20 -20 ${view.pad + 40} ${view.pad + 40}`);
            for (const line of view.flash) svg.appendChild(ddLine(line));
            const time = div('rc-time');
            const fill = document.createElement('i');
            fill.style.animationDuration = `${view.flashMs}ms`;
            time.appendChild(fill);
            sheet.append(svg, time);
            ui.sheet.appendChild(sheet);
            playSound('place');
        } else if (view.phase === 'drawing') {
            const sheet = div('rc-page rc-empty-page', '?');
            ui.sheet.appendChild(sheet);
        }
    },
    status: view => view.phase === 'prelude' ? word('dd_remember', 'Remember it!') : word('dd_recall_stage', 'Drawing from memory…'),
    play(ui, show, view, later) {
        ui.flashKey = null;
        ui.sheet.textContent = '';
        const big = div('rc-big');
        const best = show.scores[0] === show.scores[1] ? -1 : show.scores[0] > show.scores[1] ? 0 : 1;
        show.drawings.forEach(((lines, side) => {
            const panel = div(`rc-page rc-panel side-${side}`);
            const svg = ddSvg('', `-20 -20 ${ui.pad + 40} ${ui.pad + 40}`);
            for (const line of show.target) svg.appendChild(ddLine(line, 'rc-target'));
            for (const line of lines) svg.appendChild(ddLine(line, 'rc-drawn dd-line'));
            const score = div('rc-score', '0%');
            panel.append(svg, score);
            big.appendChild(panel);
            const steps = 12;
            for (let i = 1; i <= steps; i++) {
                later(1e3 + i * 110, (() => {
                    score.textContent = `${Math.round(show.scores[side] * i / steps)}%`;
                }));
            }
            if (best === side) {
                const star = div('rc-star', '★');
                later(2500, (() => panel.appendChild(star)));
            }
        }));
        ui.sheet.appendChild(big);
        playSound('ready');
        later(2500, (() => {
            playSound(best < 0 ? 'miss' : 'sunk');
            if (best < 0) ddCall(ui, word('dd_same', 'Dead even!'), 'callout-hit');
        }));
    }
});