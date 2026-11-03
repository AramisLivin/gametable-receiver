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

function doodleScreen(id, game) {
    let ui = null, seq = 0, over = false, showing = false, timers = [];
    const later = (ms, action) => timers.push(setTimeout(action, ms));
    function stop() {
        timers.forEach(clearTimeout);
        timers = [];
        ui = null;
        seq = 0;
        over = false;
        showing = false;
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
            const tag = div('dd-tag');
            head.append(name, pips, tag);
            return {
                head: head,
                name: name,
                pips: pips,
                tag: tag
            };
        }));
        const middle = div('arty-middle');
        const statusLine = div('arty-status');
        const clock = div('arty-clock');
        middle.append(statusLine, clock);
        hud.append(heads[0].head, middle, heads[1].head);
        const effects = div('siege-effects');
        root.append(stage, hud, effects);
        ui = {
            root: root,
            stage: stage,
            heads: heads,
            status: statusLine,
            clock: clock,
            effects: effects
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
                if (i < value) pip.className = 'on';
                pips.appendChild(pip);
            }
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
            ui.heads[side].tag.textContent = view.phase === 'drawing' && view.ready[side] ? word('dd_ready', 'Ready') : '';
        }));
        if (view.show && view.show.seq !== seq) {
            seq = view.show.seq;
            showing = true;
            game.play(ui, view.show, view, later);
            later(view.show.ms, (() => {
                showing = false;
            }));
        }
        if (!showing) setPips(view);
        if (view.phase !== 'showing' && !showing) game.idle(ui, view, state);
        ui.status.textContent = view.phase === 'over' ? view.winner === 'draw' ? word('siege_draw', 'A draw') : word('won', '{name} won!').replace('{name}', nameOf(view.winner)) : view.phase === 'showing' ? '' : game.status(view);
        ui.clock.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : view.phase === 'drawing' ? view.clock : '';
        ui.clock.classList.toggle('urgent', view.phase === 'drawing' && view.clock <= 5 && !away);
        if (view.phase === 'over' && !over) {
            over = true;
            const winner = view.sides.indexOf(view.winner);
            lightHalf(winner);
            playSound('win');
            if (winner >= 0) drawVictory(ui.effects, '');
        } else if (view.phase !== 'over') {
            lightHalf(-1);
        }
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

const ramX = x => x * DD_K;

const ramY = y => (562 - y) * DD_K;

const RAM_SCREEN = doodleScreen('ram', {
    build(ui, view) {
        const field = div('dd-field ram-field');
        field.appendChild(div('ram-lava'));
        const shelf = div('ram-shelf');
        shelf.style.left = `${ramX(500 - view.shelfHalf)}vh`;
        shelf.style.width = `${view.shelfHalf * 2 * DD_K}vh`;
        shelf.style.top = `${ramY(view.floor)}vh`;
        field.appendChild(shelf);
        ui.stage.appendChild(field);
        ui.field = field;
        ui.shelf = shelf;
        ui.bodies = [];
    },
    idle(ui, view) {
        if (view.phase === 'over') return;
        ui.bodies.forEach((body => body.remove()));
        ui.bodies = [];
        ui.shelf.getAnimations().forEach((animation => animation.cancel()));
    },
    status: () => word('dd_drawing', 'Drawing…'),
    play(ui, show, view, later) {
        ui.bodies.forEach((body => body.remove()));
        const count = show.frames.length / 6;
        ui.bodies = show.shapes.map(((lines, side) => {
            const body = div(`ram-body side-${side}`);
            const svg = ddSvg('', `${-RAM_BOX} ${-RAM_BOX} ${RAM_BOX * 2} ${RAM_BOX * 2}`);
            const size = RAM_BOX * 2 * DD_K;
            svg.style.cssText = `left:${-size / 2}vh;top:${-size / 2}vh;width:${size}vh;height:${size}vh`;
            for (const line of lines) {
                const flipped = line.map(((value, i) => i % 2 ? -value : value));
                svg.appendChild(ddLine(flipped, 'dd-line', 16));
            }
            body.appendChild(svg);
            ui.field.appendChild(body);
            const frames = [];
            for (let i = 0; i < count; i++) {
                const at = i * 6 + side * 3;
                frames.push({
                    transform: `translate3d(${ramX(show.frames[at])}vh,${ramY(show.frames[at + 1])}vh,0) rotate(${-show.frames[at + 2]}rad)`
                });
            }
            body.animate(frames, {
                duration: (count - 1) * show.step,
                easing: 'linear',
                fill: 'forwards'
            });
            return body;
        }));
        ui.shelf.animate([ {
            transform: 'scaleX(1)'
        }, {
            transform: 'scaleX(0)'
        } ], {
            delay: show.crumbleAfter,
            duration: show.crumbleMs,
            easing: 'linear',
            fill: 'forwards'
        });
        for (const kick of show.kicks) later(kick.t, (() => playSound('thud')));
        for (const hit of show.hits) {
            later(hit.t, (() => {
                const big = hit.power > 280;
                blastAt(ui.field, ramX(hit.x), ramY(hit.y), big ? 'normal' : 'small');
                playSound(big ? 'blast' : 'pop');
                ddShake(ui.field, big);
            }));
        }
        show.falls.forEach(((time, side) => {
            if (time < 0) return;
            later(time, (() => {
                const at = Math.min(Math.round(time / show.step), count - 1) * 6 + side * 3;
                blastAt(ui.field, ramX(show.frames[at]), ramY(50), 'huge');
                playSound('mega');
                ddShake(ui.field, true);
                blastOn(side, true);
                ui.bodies[side].style.visibility = 'hidden';
                ddCall(ui, ddOneOf('dd_lava', 'Into the lava!'), 'callout-sunk');
            }));
        }));
        if (show.loser === null) later(show.ms - 300, (() => ddCall(ui, word('dd_tie', 'Nobody scores'), 'callout-miss')));
    }
});

const CP_K = 78 / 400;

const CARPET_SCREEN = doodleScreen('carpet', {
    build(ui) {
        const maps = div('cp-maps');
        ui.maps = [ 0, 1 ].map((side => {
            const map = div(`cp-map side-${side}`);
            const left = div('cp-left');
            map.appendChild(left);
            maps.appendChild(map);
            return {
                map: map,
                left: left,
                marks: [],
                outline: null
            };
        }));
        ui.stage.appendChild(maps);
    },
    idle(ui, view) {
        ui.maps.forEach(((board, side) => {
            board.left.textContent = view.stage === 'base' ? '' : `${view.left[side]}%`;
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
            const plane = div(`cp-plane side-${run.side}`);
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
            board.map.appendChild(plane);
            plane.animate(frames, {
                duration: run.ms,
                easing: 'linear',
                fill: 'forwards'
            });
            later(run.ms + 80, (() => plane.remove()));
            for (const bomb of run.bombs) {
                later(bomb.t, (() => {
                    board.marks.push(cpMark(board, bomb.x, bomb.y, bomb.hit));
                    if (bomb.hit) {
                        blastAt(board.map, bomb.x * CP_K, bomb.y * CP_K, 'small');
                        playSound('blast');
                        ddShake(board.map, false);
                        blastOn(1 - run.side, false);
                    } else playSound('pop');
                }));
            }
        }
        later(show.ms - 1400, (() => {
            ui.maps.forEach(((board, side) => {
                board.left.textContent = `${show.left[side]}%`;
            }));
            const hits = show.runs.map((run => run.bombs.filter((bomb => bomb.hit)).length));
            if (hits[0] || hits[1]) ddCall(ui, ddOneOf('arty_direct', 'Direct hit!'), 'callout-sunk'); else ddCall(ui, ddOneOf('arty_miss', 'Miss'), 'callout-miss');
        }));
    }
});

function cpMark(board, x, y, hit) {
    const mark = div('cp-mark' + (hit ? ' hit' : ''));
    mark.style.left = `${x * CP_K}vh`;
    mark.style.top = `${y * CP_K}vh`;
    board.map.insertBefore(mark, board.left);
    return mark;
}

const ROCKETS_SCREEN = doodleScreen('rockets', {
    build(ui, view) {
        const field = div('dd-field rk-field');
        const lines = ddSvg('rk-lines', `0 0 ${view.width} ${view.height}`);
        field.appendChild(lines);
        ui.bases = [ view.baseX, view.width - view.baseX ].map(((x, side) => {
            const base = div(`rk-base side-${side}`);
            base.style.left = `${x * DD_K}vh`;
            base.style.top = `${view.height / 2 * DD_K}vh`;
            field.appendChild(base);
            return base;
        }));
        ui.stage.appendChild(field);
        ui.field = field;
        ui.lines = lines;
    },
    idle(ui, view) {
        if (view.phase !== 'over') ui.lines.textContent = '';
    },
    status: () => word('dd_drawing', 'Drawing…'),
    play(ui, show, view, later) {
        ui.lines.textContent = '';
        for (const wall of show.walls) if (wall.length >= 4) ui.lines.appendChild(ddLine(wall, 'rk-wall'));
        for (const rocket of show.rockets) {
            if (rocket.end === 'none') continue;
            const frames = rkFrames(rocket);
            const node = div(`rk-rocket side-${rocket.side}`);
            ui.field.appendChild(node);
            node.animate(frames, {
                duration: Math.max(1, rocket.ms),
                easing: 'linear',
                fill: 'forwards'
            });
            playSound('launch');
            later(rocket.ms, (() => {
                node.remove();
                ui.lines.appendChild(ddLine(rocket.path, `rk-route dd-line side-${rocket.side}`));
                const big = rocket.end === 'base';
                blastAt(ui.field, rocket.x * DD_K, rocket.y * DD_K, big ? 'huge' : 'normal');
                playSound(big ? 'mega' : rocket.end === 'fuel' ? 'thud' : 'blast');
                ddShake(ui.field, big);
                if (big) {
                    const base = ui.bases[1 - rocket.side];
                    base.classList.remove('hit');
                    void base.offsetWidth;
                    base.classList.add('hit');
                    blastOn(1 - rocket.side, true);
                }
            }));
        }
        const results = show.rockets.map((rocket => rocket.end));
        const last = Math.max(...show.rockets.map((rocket => rocket.ms)));
        later(last + 100, (() => {
            if (results.includes('base')) ddCall(ui, ddOneOf('dd_hit_base', 'Bullseye!'), 'callout-sunk'); else if (results.includes('rocket')) ddCall(ui, word('dd_head_on', 'Head on!'), 'callout-sunk'); else if (results.includes('wall')) ddCall(ui, ddOneOf('dd_on_wall', 'Into the wall!'), 'callout-hit'); else if (results.includes('fuel')) ddCall(ui, ddOneOf('dd_fuel', 'Out of ink!'), 'callout-miss'); else ddCall(ui, word('dd_none', 'Nothing launched'), 'callout-miss');
        }));
    }
});

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
        ui.pad = view.pad;
        ui.flashKey = null;
    },
    idle(ui, view) {
        const key = view.phase === 'prelude' ? `flash${view.round}` : view.phase;
        if (key === ui.flashKey) return;
        ui.flashKey = key;
        ui.stage.textContent = '';
        if (view.phase === 'prelude' && view.flash) {
            const svg = ddSvg('rc-flash', `0 0 ${view.pad} ${view.pad}`);
            for (const line of view.flash) svg.appendChild(ddLine(line));
            ui.stage.appendChild(svg);
            playSound('place');
        } else if (view.phase === 'drawing') {
            ui.stage.appendChild(div('dd-center-note', '✎'));
        }
    },
    status: view => view.phase === 'prelude' ? word('dd_remember', 'Remember it!') : word('dd_recall_stage', 'Drawing from memory…'),
    play(ui, show, view, later) {
        ui.flashKey = null;
        ui.stage.textContent = '';
        const big = div('rc-big');
        const best = show.scores[0] === show.scores[1] ? -1 : show.scores[0] > show.scores[1] ? 0 : 1;
        show.drawings.forEach(((lines, side) => {
            const panel = div(`rc-panel side-${side}`);
            const svg = ddSvg('', `-20 -20 ${ui.pad + 40} ${ui.pad + 40}`);
            for (const line of show.target) svg.appendChild(ddLine(line, 'rc-target'));
            for (const line of lines) svg.appendChild(ddLine(line, 'rc-drawn dd-line'));
            const score = div('rc-score', '0%');
            panel.append(svg, score);
            big.appendChild(panel);
            const steps = 20;
            for (let i = 1; i <= steps; i++) {
                later(1e3 + i * 70, (() => {
                    score.textContent = `${Math.round(show.scores[side] * i / steps)}%`;
                }));
            }
            if (best === side) later(2600, (() => panel.classList.add('best')));
        }));
        ui.stage.appendChild(big);
        playSound('ready');
        later(2600, (() => {
            playSound(best < 0 ? 'miss' : 'sunk');
            if (best < 0) ddCall(ui, word('dd_same', 'Dead even!'), 'callout-hit');
        }));
    }
});