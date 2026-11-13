let ciNodes = null;

let ciTimers = new Set;

let ciClackAt = 0;

const CI_TINTS = [ '#7db7f0', '#f27d86', '#8fd694', '#f2c14e', '#c49cf2', '#ffa25c', '#7fe0d8', '#ff9fd0' ];

const CI_VISIBLE = 6;

const CI_STEP = 70;

const CI_GAP = 110;

const CI_TYPE_STEP = 45;

const CI_SPIN = 4;

const CI_LETTERS = {
    ru: 'абвгдежзиклмнопрстуфхцчшщыэюя',
    en: 'abcdefghijklmnopqrstuvwxyz'
};

const CI_MARKS = {
    g: 'place',
    y: 'here',
    '-': 'none'
};

function stopCipher() {
    ciClearTimers();
    ciNodes = null;
}

function ciLater(ms, action) {
    const id = setTimeout((() => {
        ciTimers.delete(id);
        action();
    }), ms);
    ciTimers.add(id);
}

function ciClearTimers() {
    ciTimers.forEach(clearTimeout);
    ciTimers = new Set;
}

const ciWord = (key, fallback, values = {}) => Object.entries(values).reduce(((text, [k, v]) => text.replace(`{${k}}`, v)), word(key, fallback));

function ciClack() {
    const now = performance.now();
    if (now - ciClackAt < 34) return;
    ciClackAt = now;
    playSound('cipher_flap');
}

function ciTile(cls = '') {
    const tile = div(('ci-tile ' + cls).trim());
    const half = (where, fold) => {
        const node = div(`ci-half ${where}${fold ? ' fold' : ''}`);
        node.append(document.createElement('i'), document.createElement('span'));
        tile.appendChild(node);
        return node;
    };
    const upper = half('up'), lower = half('down'), foldUp = half('up', true), foldDown = half('down', true);
    tile.flap = {
        char: '',
        run: 0,
        upper: upper.lastChild,
        lower: lower.lastChild,
        foldUp: foldUp,
        foldDown: foldDown
    };
    return tile;
}

function ciShow(tile, char) {
    const f = tile.flap;
    f.run++;
    f.char = char;
    f.upper.textContent = char;
    f.lower.textContent = char;
    for (const fold of [ f.foldUp, f.foldDown ]) fold.getAnimations().forEach((a => a.cancel()));
}

function ciFlip(tile, path, step, wait, done) {
    const f = tile.flap;
    const run = ++f.run;
    path.forEach(((next, i) => ciLater(wait + i * step, (() => {
        if (f.run !== run) return;
        const now = f.char;
        f.char = next;
        f.upper.textContent = next;
        f.lower.textContent = now;
        f.foldUp.lastChild.textContent = now;
        f.foldDown.lastChild.textContent = next;
        f.foldUp.animate([ {
            transform: 'rotateX(0deg)',
            opacity: 1
        }, {
            transform: 'rotateX(-90deg)',
            opacity: 1
        } ], {
            duration: step / 2,
            easing: 'ease-in'
        });
        f.foldDown.animate([ {
            transform: 'rotateX(90deg)',
            opacity: 1
        }, {
            transform: 'rotateX(0deg)',
            opacity: 1
        } ], {
            duration: step / 2,
            delay: step / 2,
            easing: 'ease-out',
            fill: 'both'
        });
        ciClack();
        if (i === path.length - 1 && done) ciLater(step, (() => {
            if (f.run === run) done();
        }));
    }))));
}

function ciPath(target, n, lang) {
    const letters = CI_LETTERS[lang] || CI_LETTERS.en;
    const path = [];
    for (let i = 0; i < n; i++) path.push(letters[Math.floor(Math.random() * letters.length)]);
    path.push(target);
    return path;
}

function ciFlapWord(text, cls, lang, wait = 0) {
    const row = div('ci-flapword');
    for (const char of text) row.appendChild(ciTile(cls + (char === ' ' ? ' space' : '')));
    ciSpell(row, text, lang, wait);
    return row;
}

function ciSpell(row, text, lang, wait) {
    [ ...text ].forEach(((char, i) => {
        if (char !== ' ') ciFlip(row.children[i], ciPath(char, 3 + i % 3, lang), CI_STEP, wait + i * 80);
    }));
}

function buildCipher(view) {
    const root = $('cipher');
    root.textContent = '';
    const left = div('ci-left');
    const title = ciFlapWord(word('game_cipher', 'Cipher'), 'title', view.lang);
    title.classList.add('ci-title');
    const round = div('ci-round');
    const hearts = div('ci-lives');
    const head = div('ci-lives-head');
    const livesTiles = [ ciTile('digit'), ciTile('digit') ];
    head.append(div('ci-lives-heart', '♥'), ...livesTiles);
    const lamps = div('ci-lamps');
    hearts.append(head, lamps);
    const table = div('ci-table');
    left.append(title, round, hearts, table);
    const middle = div('ci-middle');
    const housing = div('ci-housing');
    const board = div('ci-board');
    housing.appendChild(board);
    const message = div('ci-message');
    middle.append(housing, message);
    const right = div('ci-right');
    const clock = div('ci-clock');
    const clockTiles = [ ciTile('digit'), ciTile('digit') ];
    clock.append(...clockTiles);
    const away = div('ci-away');
    const history = div('ci-history');
    right.append(clock, away, history);
    const effects = div('ci-effects');
    const flash = div('ci-flash');
    root.append(left, middle, right, flash, effects);
    ciNodes = {
        root: root,
        title: title,
        round: round,
        hearts: hearts,
        livesTiles: livesTiles,
        lamps: lamps,
        table: table,
        seats: new Map,
        housing: housing,
        board: board,
        message: message,
        clock: clock,
        clockTiles: clockTiles,
        away: away,
        history: history,
        effects: effects,
        flash: flash,
        rows: new Map,
        boardKey: null,
        shownRows: 0,
        draft: '',
        draftRow: -1,
        reject: 0,
        shake: 0,
        phase: null,
        tableKey: null,
        historyKey: null,
        doneSeen: null,
        overShown: false,
        heartsShown: null,
        scramble: 0,
        clockShown: '',
        first: true
    };
}

function ciBoard(view) {
    const ui = ciNodes;
    ui.board.textContent = '';
    ui.rows = new Map;
    const tile = Math.min(10.5, 66 / CI_VISIBLE - 1.2, 88 / view.length - 1.2);
    ui.board.style.setProperty('--tile', `${tile}vh`);
    ui.shownRows = 0;
    ui.draft = '';
    ui.draftRow = -1;
    if (ui.first) ciSpell(ui.title, word('game_cipher', 'Cipher'), view.lang, 300);
    ui.scramble = ui.first ? 7 : 3;
    ui.first = false;
}

function ciRow(view, r, wait) {
    const ui = ciNodes;
    if (ui.rows.has(r)) return ui.rows.get(r);
    const paid = r >= view.free;
    const row = div('ci-row' + (paid ? ' fresh paid' : ''));
    row.style.setProperty('--row-wait', `${wait}ms`);
    const tag = div('ci-tag');
    row.appendChild(tag);
    const cells = [];
    for (let c = 0; c < view.length; c++) {
        const tile = ciTile();
        row.appendChild(tile);
        cells.push(tile);
        if (ui.scramble) ciFlip(tile, ciPath('', ui.scramble, view.lang), CI_STEP, (r + c) * 55);
    }
    const cost = paid ? div('ci-cost') : null;
    if (cost) row.appendChild(cost);
    ui.board.appendChild(row);
    const made = {
        row: row,
        tag: tag,
        cells: cells,
        cost: cost
    };
    ui.rows.set(r, made);
    return made;
}

function ciTag(tag, id, view, nameOf) {
    const index = view.sides.indexOf(id);
    const text = id ? nameOf(id) : '';
    if (tag.textContent !== text) tag.textContent = text;
    tag.style.setProperty('--tint', CI_TINTS[index % CI_TINTS.length]);
}

function ciHearts(view, wait) {
    const ui = ciNodes;
    const before = ui.heartsShown;
    if (before === view.hearts) return;
    ui.heartsShown = view.hearts;
    const count = String(view.hearts).padStart(2, ' ');
    ui.livesTiles.forEach(((tile, i) => {
        const char = count[i] === ' ' ? '' : count[i];
        if (tile.flap.char === char) return;
        if (before === null) ciShow(tile, char); else ciFlip(tile, [ char ], 140, wait);
    }));
    const slots = Math.max(view.hearts, view.heartsMax);
    while (ui.lamps.children.length < slots) {
        const lamp = div('ci-lamp');
        lamp.appendChild(document.createElement('i'));
        ui.lamps.appendChild(lamp);
    }
    while (ui.lamps.children.length > slots) ui.lamps.lastChild.remove();
    let dying = null;
    [ ...ui.lamps.children ].forEach(((lamp, i) => {
        const on = i < view.hearts;
        lamp.style.setProperty('--wait', `${wait}ms`);
        lamp.classList.remove('dying', 'waking');
        if (before !== null && !on && i < before) {
            lamp.classList.add('dying');
            dying = dying || lamp;
        }
        if (before !== null && on && i >= before) lamp.classList.add('waking');
        lamp.classList.toggle('on', on);
    }));
    if (dying) ciLater(wait, (() => ciHeartLost(view, dying)));
    if (before !== null && view.hearts > before) {
        ciLater(wait, (() => {
            if (!ui.hearts.isConnected) return;
            const gift = div('ci-gift', `+${view.hearts - before} ♥`);
            ui.hearts.appendChild(gift);
            playSound('cipher_gift');
            ciLater(1600, (() => gift.remove()));
        }));
    }
}

function ciHeartLost(view, lamp) {
    const ui = ciNodes;
    if (!ui) return;
    playSound('cipher_heart');
    ui.flash.animate([ {
        opacity: 0
    }, {
        opacity: 1,
        offset: .15
    }, {
        opacity: 0
    } ], {
        duration: 900,
        easing: 'ease-out'
    });
    const row = ui.rows.get(view.rows.length);
    if (!row || !row.cost || !lamp.isConnected) return;
    const vh = innerHeight / 100;
    const from = onStage(lamp.getBoundingClientRect()), to = onStage(row.cost.getBoundingClientRect());
    const dx = (from.x - to.x) / vh, dy = (from.y - to.y) / vh;
    const spark = div('ci-spark');
    spark.style.left = `${to.x / vh}vh`;
    spark.style.top = `${to.y / vh}vh`;
    ui.effects.appendChild(spark);
    row.cost.style.opacity = '0';
    spark.animate([ {
        transform: `translate(-50%, -50%) translate(${dx}vh, ${dy}vh) scale(1.4)`
    }, {
        transform: `translate(-50%, -50%) translate(${dx / 2}vh, ${dy / 2 - 8}vh) scale(1.1)`,
        offset: .45
    }, {
        transform: 'translate(-50%, -50%) scale(1)'
    } ], {
        duration: 800,
        easing: 'ease-in-out',
        fill: 'both'
    }).onfinish = () => {
        spark.remove();
        row.cost.style.opacity = '';
        row.cost.animate([ {
            transform: 'translateY(-50%) scale(1.8)'
        }, {
            transform: 'translateY(-50%) scale(1)'
        } ], {
            duration: 300,
            easing: 'ease-out'
        });
    };
}

function ciClock(view, guessing, away, nameOf) {
    const ui = ciNodes;
    const text = guessing && !away ? String(view.clock).padStart(2, ' ') : '  ';
    if (text !== ui.clockShown) {
        ui.clockShown = text;
        ui.clockTiles.forEach(((tile, i) => {
            const char = text[i] === ' ' ? '' : text[i];
            if (tile.flap.char !== char) ciFlip(tile, [ char ], 140, 0);
        }));
    }
    ui.clock.classList.toggle('urgent', guessing && !away && view.clock <= 10);
    ui.away.textContent = away ? word('siege_away', 'Waiting for {name}').replace('{name}', nameOf(away)) : '';
}

function drawCipher(state) {
    const view = state.view;
    if (!ciNodes || !$('cipher').contains(ciNodes.board)) buildCipher(view);
    const ui = ciNodes;
    const nameOf = id => (state.players.find((p => p.id === id)) || {}).name || '?';
    const away = view.sides.find((id => !(state.players.find((p => p.id === id)) || {}).online));
    const guessing = view.phase === 'guessing';
    ui.round.textContent = ciWord('cp_round', 'Word {n} of {all}', {
        n: view.round,
        all: view.rounds
    });
    const tableKey = JSON.stringify([ view.sides.map(nameOf), view.turn, view.cracked ]);
    if (tableKey !== ui.tableKey) {
        ui.tableKey = tableKey;
        ui.table.textContent = '';
        ui.seats.clear();
        view.sides.forEach(((id, i) => {
            const seat = div('ci-seat' + (view.turn === id ? ' on' : ''));
            seat.style.setProperty('--tint', CI_TINTS[i % CI_TINTS.length]);
            seat.append(div('ci-seat-name', nameOf(id)), div('ci-seat-score', view.cracked[id] ? `★ ${view.cracked[id]}` : ''));
            ui.table.appendChild(seat);
            ui.seats.set(id, seat);
        }));
    }
    const boardKey = `${view.round}|${view.length}`;
    const fresh = boardKey !== ui.boardKey;
    if (fresh) {
        ui.boardKey = boardKey;
        ciClearTimers();
        ui.effects.textContent = '';
        ui.overShown = false;
        ui.clockShown = '';
        ciBoard(view);
        if (view.round > 1) playSound('cipher_new');
    }
    ciClock(view, guessing, away, nameOf);
    const historyKey = JSON.stringify(view.done);
    let arriving = null;
    if (historyKey !== ui.historyKey) {
        ui.historyKey = historyKey;
        ui.history.textContent = '';
        view.done.forEach(((done, i) => {
            const item = div('ci-past' + (done.by ? ' cracked' : ''));
            const letters = div('ci-past-word');
            for (const letter of done.answer) letters.appendChild(div('ci-mini', letter));
            item.append(letters, div('ci-past-by', done.by ? nameOf(done.by) : '✗'));
            ui.history.appendChild(item);
            if (ui.doneSeen !== null && i >= ui.doneSeen) {
                item.classList.add('arriving');
                arriving = item;
            }
        }));
        ui.doneSeen = view.done.length;
    }
    const opened = view.rows.length > ui.shownRows && !fresh;
    const opening = opened ? (view.length - 1) * CI_GAP + (CI_SPIN + 2) * CI_STEP + 150 : 0;
    const last = Math.max(view.free - 1, guessing ? view.rows.length : view.rows.length - 1);
    const first = Math.max(0, last - CI_VISIBLE + 1);
    for (const [r, made] of ui.rows) {
        if (r < first) {
            made.row.remove();
            ui.rows.delete(r);
        }
    }
    for (let r = first; r <= last; r++) ciRow(view, r, r === view.rows.length ? opening : 0);
    ui.scramble = 0;
    ciHearts(view, opening ? Math.max(0, opening - 250) : 0);
    view.rows.forEach(((sent, r) => {
        if (r < first || r < ui.shownRows) return;
        const {tag: tag, cells: cells} = ui.rows.get(r);
        ciTag(tag, sent.by, view, nameOf);
        const live = opened && r === view.rows.length - 1;
        [ ...sent.word ].forEach(((letter, c) => {
            const tile = cells[c];
            const mark = CI_MARKS[sent.marks[c]];
            if (!live) {
                ciShow(tile, letter);
                tile.classList.add(mark, 'lit');
                return;
            }
            ciFlip(tile, ciPath(letter, CI_SPIN + c % 2, view.lang), CI_STEP, c * CI_GAP, (() => {
                tile.classList.add(mark, 'lit');
                playSound('cipher_flip', sent.marks[c]);
            }));
        }));
    }));
    ui.shownRows = view.rows.length;
    const current = guessing ? ui.rows.get(view.rows.length) : null;
    for (const [r, {row: row}] of ui.rows) row.classList.toggle('current', guessing && r === view.rows.length);
    if (current) {
        if (ui.draftRow !== view.rows.length) {
            ui.draftRow = view.rows.length;
            ui.draft = '';
        }
        ciTag(current.tag, view.turn, view, nameOf);
        const draft = view.draft;
        current.cells.forEach(((tile, c) => {
            const letter = draft[c] || '';
            if ((ui.draft[c] || '') === letter) return;
            ciFlip(tile, letter ? ciPath(letter, 1, view.lang) : [ '' ], CI_TYPE_STEP, opening);
        }));
        const seat = ui.seats.get(view.turn);
        if (seat && draft.length > ui.draft.length) {
            seat.animate([ {
                transform: 'translateX(1.4vh) scale(1)'
            }, {
                transform: 'translateX(1.4vh) scale(1.06)'
            }, {
                transform: 'translateX(1.4vh) scale(1)'
            } ], {
                duration: 180,
                easing: 'ease-out'
            });
        }
        ui.draft = draft;
    }
    const reject = view.rejected ? view.rejected.seq : 0;
    if (reject !== ui.reject) {
        ui.reject = reject;
        if (view.rejected && current) {
            ui.shake = 1 - ui.shake;
            current.row.classList.remove('shake0', 'shake1');
            current.row.classList.add(`shake${ui.shake}`);
            playSound('cipher_wrong');
        }
    }
    const why = view.rejected && guessing ? {
        short: ciWord('cp_short', 'Not enough letters'),
        unknown: ciWord('cp_unknown', 'No such word'),
        again: ciWord('cp_again', 'Already tried')
    }[view.rejected.why] : '';
    if (view.phase !== ui.phase || guessing) {
        const before = ui.phase;
        ui.phase = view.phase;
        if (guessing) {
            ui.message.className = 'ci-message';
            ui.message.textContent = why || ciWord('cp_turn', '{name} is typing', {
                name: nameOf(view.turn)
            });
            ui.message.classList.toggle('warn', !!why);
        } else if (view.phase === 'over' && before === 'shown') {
            ciFinal(view, nameOf);
        } else {
            ui.message.className = 'ci-message';
            ciRoundOver(view, nameOf, opening, arriving);
        }
    }
    show('cipher');
}

function ciRoundOver(view, nameOf, wait, arriving) {
    const ui = ciNodes;
    const last = view.rows[view.rows.length - 1];
    const cracked = !!(last && last.word === view.answer);
    ui.message.textContent = '';
    ciLater(wait, (() => {
        if (cracked) {
            const made = ui.rows.get(view.rows.length - 1);
            made.cells.forEach(((tile, c) => {
                tile.style.setProperty('--wait', `${c * 80}ms`);
                tile.classList.add('cheer');
            }));
            ui.message.textContent = `${ciWord('cp_cracked', 'Cracked!')} ${ciWord('cp_by', '{name} got it', {
                name: nameOf(last.by)
            })}`;
            ui.message.classList.add('good');
            playSound('cipher_crack');
            ciBurst(made.row);
            if (arriving) ciLater(1300, (() => ciFly(made.row, arriving)));
        } else {
            const reveal = div('ci-reveal');
            reveal.append(div('ci-reveal-label', ciWord('cp_failed', 'The word was')), ciFlapWord(view.answer, 'answer', view.lang));
            ui.message.appendChild(reveal);
            playSound('cipher_fail');
            if (arriving) ciLater(1200, (() => arriving.classList.remove('arriving')));
        }
        if (view.phase === 'over') ciLater(2200, (() => ciFinal(view, nameOf)));
    }));
}

function ciBurst(from) {
    const ui = ciNodes;
    if (!from.isConnected) return;
    const vh = innerHeight / 100;
    const at = onStage(from.getBoundingClientRect());
    const colours = [ '#3fbf5f', '#f2b632', '#f6efdc', '#7db7f0', '#ff6a7a' ];
    for (let i = 0; i < 46; i++) {
        const bit = div('ci-bit');
        bit.style.left = `${at.x / vh}vh`;
        bit.style.top = `${at.y / vh}vh`;
        bit.style.background = colours[i % colours.length];
        ui.effects.appendChild(bit);
        const angle = Math.random() * Math.PI * 2, reach = 18 + Math.random() * 34;
        const dx = Math.cos(angle) * reach, dy = Math.sin(angle) * reach * .7 - 12;
        bit.animate([ {
            transform: 'translate(-50%, -50%) rotate(0deg)',
            opacity: 1
        }, {
            transform: `translate(-50%, -50%) translate(${dx}vh, ${dy}vh) rotate(${Math.random() * 720 - 360}deg)`,
            opacity: 1,
            offset: .55
        }, {
            transform: `translate(-50%, -50%) translate(${dx * 1.15}vh, ${dy + 26}vh) rotate(${Math.random() * 720 - 360}deg)`,
            opacity: 0
        } ], {
            duration: 1500 + Math.random() * 600,
            easing: 'cubic-bezier(.2, .7, .4, 1)',
            fill: 'both'
        }).onfinish = () => bit.remove();
    }
}

function ciFly(from, item) {
    const ui = ciNodes;
    if (!ui || !from.isConnected || !item.isConnected) {
        item.classList.remove('arriving');
        return;
    }
    const vh = innerHeight / 100;
    const target = item.firstChild;
    const a = from.getBoundingClientRect(), b = target.getBoundingClientRect();
    const p = onStage(a), q = onStage(b);
    const dx = (p.x - q.x) / vh, dy = (p.y - q.y) / vh;
    const fly = div('ci-fly');
    fly.appendChild(target.cloneNode(true));
    fly.style.left = `${q.x / vh}vh`;
    fly.style.top = `${q.y / vh}vh`;
    ui.effects.appendChild(fly);
    const scale = Math.min(4, a.width / Math.max(1, b.width));
    playSound('cipher_whoosh');
    fly.animate([ {
        transform: `translate(-50%, -50%) translate(${dx}vh, ${dy}vh) scale(${scale})`,
        opacity: 0
    }, {
        transform: `translate(-50%, -50%) translate(${dx}vh, ${dy}vh) scale(${scale})`,
        opacity: 1,
        offset: .1
    }, {
        transform: 'translate(-50%, -50%) scale(1)',
        opacity: 1
    } ], {
        duration: 950,
        easing: 'cubic-bezier(.55, 0, .25, 1)',
        fill: 'both'
    }).onfinish = () => {
        fly.remove();
        item.classList.remove('arriving');
        item.animate([ {
            transform: 'scale(1.25)'
        }, {
            transform: 'scale(1)'
        } ], {
            duration: 300,
            easing: 'ease-out'
        });
    };
}

function ciFinal(view, nameOf) {
    const ui = ciNodes;
    if (!ui || ui.overShown) return;
    ui.overShown = true;
    const won = view.winner === 'won';
    const count = view.done.filter((d => d.by)).length;
    const card = div('ci-final' + (won ? ' won' : ''));
    card.appendChild(ciFlapWord(won ? ciWord('cp_won', 'Code broken!') : ciWord('cp_lost', 'The code held'), 'verdict', view.lang, 300));
    card.appendChild(div('ci-final-count', `${ciWord('cp_total', 'Cracked {n} of {all}', {
        n: count,
        all: view.rounds
    })}  ·  ♥ ${view.hearts}`));
    const list = div('ci-final-list');
    view.sides.forEach(((id, i) => {
        const line = div('ci-final-line');
        line.style.setProperty('--tint', CI_TINTS[i % CI_TINTS.length]);
        line.style.setProperty('--wait', `${1400 + i * 180}ms`);
        const words = div('ci-final-words');
        const mine = view.done.filter((d => d.by === id));
        for (const done of mine) words.appendChild(div('ci-final-word', done.answer));
        if (!mine.length) words.appendChild(div('ci-final-none', '—'));
        line.append(div('ci-final-name', nameOf(id)), words);
        list.appendChild(line);
    }));
    card.appendChild(list);
    ui.effects.appendChild(card);
    if (won) {
        playSound('win');
        drawVictory(ui.effects, '');
    } else playSound('ft_lost');
}