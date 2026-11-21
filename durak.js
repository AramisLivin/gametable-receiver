let dk = null;

const DK_COLORS = [ '#e8645a', '#f2b544', '#5fb47a', '#5aa6e8', '#a77be0', '#e87fb3', '#6fd0c4' ];

const DK_RING = 2 * Math.PI * 46;

const dkFace = (code, cls) => dkCardFace(code, cls);

function setText(node, text) {
    if (node.textContent !== text) node.textContent = text;
}

function stopDurak() {
    if (dk) dk.timers.forEach(clearTimeout);
    dk = null;
}

function dkLater(ms, action) {
    dk.timers.push(setTimeout(action, ms));
}

const DK_ICONS = {
    attack: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M20.5 2.5l-1 4.4L9.8 16.6l-2.4-2.4 9.7-9.7zM6.3 15.3l2.4 2.4-1.5 1.5 1.6 1.6-1.4 1.4-1.6-1.6-2 2-1.4-1.4 2-2-1.6-1.6 1.4-1.4 1.6 1.6z"/></svg>',
    defend: '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l8 3v6c0 5.2-3.4 9.6-8 11-4.6-1.4-8-5.8-8-11V5z"/></svg>'
};

const DK_CAP = '<svg viewBox="0 0 120 80"><path fill="#c72634" d="M60 64L14 18c-6-6 2-14 8-8l32 38z"/><path fill="#f2c14e" d="M60 64l46-46c6-6-2-14-8-8L66 48z"/><path fill="#3f7be0" d="M48 62L58 6c2-6 6-6 8 0l6 56z"/><circle cx="12" cy="14" r="8" fill="#f2c14e"/><circle cx="108" cy="14" r="8" fill="#c72634"/><circle cx="62" cy="6" r="7" fill="#fff"/><path fill="#f2c14e" d="M28 58h68c4 0 6 10 0 12H28c-6-2-4-12 0-12z"/></svg>';

function buildDurak() {
    const root = $('durak');
    root.textContent = '';
    const felt = div('dk-felt');
    felt.appendChild(div('dk-lamp'));
    const seats = div('dk-seats');
    const deck = div('dk-deck');
    const trumpSlot = div('dk-trump');
    const stack = div('dk-stack');
    const deckCount = div('dk-count');
    deck.append(trumpSlot, stack, deckCount);
    const table = div('dk-table');
    const pile = div('dk-pile');
    const pileStack = div('dk-pile-stack');
    const pileCount = div('dk-count');
    pile.append(pileStack, pileCount);
    const plate = div('dk-plate');
    const mode = div('dk-mode');
    const status = div('dk-status');
    const clock = div('dk-clock');
    plate.append(mode, status, clock);
    const fx = div('dk-fx');
    const banner = div('dk-banner');
    const end = div('dk-end');
    root.append(felt, deck, table, pile, seats, plate, fx, banner, end);
    dk = {
        root: root,
        seats: seats,
        seatNodes: new Map,
        deck: deck,
        stack: stack,
        trumpSlot: trumpSlot,
        deckCount: deckCount,
        table: table,
        pile: pile,
        pileStack: pileStack,
        pileCount: pileCount,
        plate: plate,
        status: status,
        mode: mode,
        clock: clock,
        fx: fx,
        banner: banner,
        end: end,
        timers: [],
        seq: -1,
        game: null,
        view: null,
        tableKey: null,
        seatsKey: null,
        trumpShown: null,
        stackShown: -1
    };
}

function dkSeatsFor(view, nameOf) {
    const key = view.seats.join();
    if (dk.seatsKey === key) return;
    dk.seatsKey = key;
    dk.seats.textContent = '';
    dk.seatNodes.clear();
    const n = view.seats.length;
    const spread = n > 1 ? Math.min(124, 34 * (n - 1)) : 0;
    view.seats.forEach(((id, i) => {
        const angle = (-90 - spread / 2 + (n > 1 ? spread * i / (n - 1) : 0)) * Math.PI / 180;
        const seat = div('dk-seat');
        seat.style.left = `${88.9 + 66 * Math.cos(angle)}vh`;
        seat.style.top = `${56 + 44 * Math.sin(angle)}vh`;
        const face = div('dk-avatar');
        face.style.background = DK_COLORS[i % DK_COLORS.length];
        const initial = div('dk-initial', dkIsBot(id) ? undefined : ([ ...nameOf(id) ][0] || '?').toUpperCase());
        if (dkIsBot(id)) initial.innerHTML = DK_ROBOT;
        const ring = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        ring.setAttribute('viewBox', '0 0 100 100');
        ring.setAttribute('class', 'dk-ring');
        ring.innerHTML = `<circle cx="50" cy="50" r="46" stroke-dasharray="${DK_RING}" stroke-dashoffset="0"/>`;
        const badge = div('dk-badge');
        const cap = div('dk-cap');
        cap.innerHTML = DK_CAP;
        face.append(initial, ring, badge, cap);
        const name = div('dk-name');
        const fan = div('dk-fan');
        const count = div('dk-hand-count');
        seat.append(face, name, fan, count);
        dk.seats.appendChild(seat);
        dk.seatNodes.set(id, {
            seat: seat,
            face: face,
            ring: ring.firstChild,
            badge: badge,
            name: name,
            fan: fan,
            count: count,
            shown: -1,
            cls: '',
            badgeKind: null,
            ringKey: null
        });
    }));
}

function dkFan(node, n) {
    if (!node || node.shown === n) return;
    node.shown = n;
    node.fan.textContent = '';
    const shown = Math.min(n, 12);
    for (let i = 0; i < shown; i++) {
        const back = dkCardBack();
        const at = shown > 1 ? i / (shown - 1) - .5 : 0;
        back.style.transform = `rotate(${at * Math.min(80, shown * 11)}deg)`;
        node.fan.appendChild(back);
    }
    setText(node.count, n ? String(n) : '');
}

function dkAwaited(view) {
    if (view.phase === 'lead') return [ view.attacker ];
    if (view.phase === 'defend') return [ view.defender ];
    if (view.phase === 'throw') return view.seats.filter((id => id !== view.defender && !view.out.includes(id) && !view.passed.includes(id) && view.hands[id] > 0));
    return [];
}

function dkSeats(view, nameOf, state) {
    const awaited = dkAwaited(view);
    const over = view.phase === 'over';
    for (const id of view.seats) {
        const node = dk.seatNodes.get(id);
        setText(node.name, nameOf(id));
        const away = !dkIsBot(id) && !(state.players.find((p => p.id === id)) || {}).online;
        const waiting = awaited.includes(id) && !over && !away;
        const cls = [ 'dk-seat', !over && id === view.defender ? 'defender' : '', !over && id === view.attacker ? 'attacker' : '', waiting ? 'awaited' : '', view.out.includes(id) ? 'out' : '', away ? 'away' : '', over && id === view.loser ? 'fool' : '', view.phase === 'throw' && view.passed.includes(id) ? 'passed' : '' ].filter(Boolean).join(' ');
        if (cls !== node.cls) {
            node.cls = cls;
            node.seat.className = cls;
        }
        const kind = over || view.out.includes(id) ? null : id === view.defender ? 'defend' : id === view.attacker ? 'attack' : null;
        if (kind !== node.badgeKind) {
            node.badgeKind = kind;
            node.badge.innerHTML = kind ? DK_ICONS[kind] : '';
        }
        const ringKey = waiting ? `${view.phase}|${view.round}|${view.table.length}|${view.event.seq}|${view.passed.length}` : '';
        if (ringKey !== node.ringKey) {
            node.ringKey = ringKey;
            node.ring.style.transition = 'none';
            node.ring.style.strokeDashoffset = '0';
        }
        if (waiting) {
            const left = Math.max(0, view.clock - 1) / (view.wait || 30);
            requestAnimationFrame((() => {
                node.ring.style.transition = 'stroke-dashoffset 1s linear';
                node.ring.style.strokeDashoffset = String(DK_RING * (1 - left));
            }));
        }
    }
}

function dkTable(view) {
    const key = view.table.map((p => p.a + '/' + (p.d || ''))).join() + '|' + view.taking;
    if (key === dk.tableKey) return;
    const slots = [ ...dk.table.children ];
    if (!view.table.length || slots.length > view.table.length) {
        dk.table.textContent = '';
        slots.length = 0;
    }
    view.table.forEach(((pair, i) => {
        let slot = slots[i];
        if (!slot) {
            slot = div('dk-pair');
            slot.dataset.at = i;
            const attack = dkFace(pair.a, 'attack');
            attack.style.transform = `rotate(${i * 37 % 9 - 4}deg)`;
            slot.appendChild(attack);
            dk.table.appendChild(slot);
        }
        if (pair.d && !slot.querySelector('.cover')) {
            const cover = dkFace(pair.d, 'cover');
            cover.style.transform = `translate(1.1em, 1.5em) rotate(${i * 53 % 13 + 5}deg)`;
            slot.appendChild(cover);
        }
    }));
    dk.tableKey = key;
    dk.table.classList.toggle('taking', !!view.taking);
}

function dkDeck(view) {
    const suit = view.trump.slice(-1);
    if (dk.trumpShown !== view.trump) {
        dk.trumpShown = view.trump;
        dk.trumpSlot.textContent = '';
        dk.trumpSlot.append(dkFace(view.trump, 'trump'), div('dk-trump-suit' + (dkRed(suit) ? ' red' : ''), DK_SUIT[suit]));
    }
    dk.trumpSlot.classList.toggle('gone', view.deck === 0);
    const backs = Math.min(view.deck > 1 ? Math.ceil((view.deck - 1) / 3) : 0, 8);
    if (dk.stackShown !== backs) {
        dk.stackShown = backs;
        dk.stack.textContent = '';
        for (let i = 0; i < backs; i++) {
            const back = dkCardBack();
            back.style.transform = `translate(${-i * .06}em, ${-i * .08}em)`;
            dk.stack.appendChild(back);
        }
    }
    setText(dk.deckCount, view.deck ? String(view.deck) : '');
}

function dkPile(view) {
    const backs = Math.min(Math.ceil(view.discarded / 2), 14);
    if (!backs) dk.pileStack.textContent = '';
    while (dk.pileStack.childElementCount < backs) {
        const i = dk.pileStack.childElementCount;
        const back = dkCardBack();
        back.style.transform = `translate(${i * 13 % 7 * .1 - .3}em, ${i * 29 % 7 * .1 - .3}em) rotate(${i * 71 % 60 - 30}deg)`;
        dk.pileStack.appendChild(back);
    }
    setText(dk.pileCount, view.discarded ? word('dk_beaten_count', 'Beaten {n}').replace('{n}', view.discarded) : '');
}

const dkAt = node => onStage(node.getBoundingClientRect());

function dkFly(node, from, to, ms, delay = 0, spin = 0) {
    return node.animate([ {
        transform: `translate(${from.x}px, ${from.y}px) rotate(${spin}deg) scale(${from.scale || 1})`,
        opacity: from.opacity ?? 1
    }, {
        transform: `translate(${to.x}px, ${to.y}px) rotate(0deg) scale(${to.scale || 1})`,
        opacity: to.opacity ?? 1
    } ], {
        duration: ms,
        delay: delay,
        easing: 'cubic-bezier(.2, .8, .3, 1)',
        fill: 'both'
    });
}

function dkLand(ev) {
    const slot = dk.table.querySelector(`.dk-pair[data-at="${ev.at}"]`);
    const seat = dk.seatNodes.get(ev.by);
    if (!slot || !seat) return;
    const card = slot.querySelector(ev.kind === 'cover' ? '.cover' : '.attack');
    if (!card) return;
    const there = dkAt(card), from = dkAt(seat.fan);
    const base = card.style.transform;
    card.animate([ {
        transform: `translate(${from.x - there.x}px, ${from.y - there.y}px) rotate(-40deg) scale(.45)`
    }, {
        transform: base + ' scale(1.06)',
        offset: .8
    }, {
        transform: base
    } ], {
        duration: 460,
        easing: 'cubic-bezier(.2, .9, .3, 1)'
    });
}

function dkSweep(ev) {
    const cards = [ ...dk.table.querySelectorAll('.dk-card') ];
    const seat = dk.seatNodes.get(ev.by);
    const target = ev.kind === 'took' ? seat && seat.fan : dk.pileStack;
    if (!cards.length || !target) {
        dk.table.textContent = '';
        return 0;
    }
    const to = dkAt(target);
    cards.forEach(((card, i) => {
        const at = dkAt(card);
        const ghost = ev.kind === 'beaten' ? dkCardBack() : card.cloneNode(true);
        ghost.style.transform = '';
        dk.fx.appendChild(ghost);
        const flight = dkFly(ghost, at, {
            x: to.x,
            y: to.y,
            scale: ev.kind === 'took' ? .45 : 1,
            opacity: ev.kind === 'took' ? .3 : 1
        }, 520, i * 40, (i % 2 ? 1 : -1) * 25);
        flight.onfinish = () => ghost.remove();
    }));
    dk.table.textContent = '';
    return 520 + cards.length * 40;
}

function dkDeal(order, wait, after) {
    if (!order.length) return wait;
    const from = dkAt(dk.stack.lastChild || dk.deck);
    const targets = new Map;
    order.forEach((([id], n) => {
        const seat = dk.seatNodes.get(id);
        if (!seat) return;
        if (!targets.has(id)) targets.set(id, dkAt(seat.fan));
        const back = dkCardBack();
        dk.fx.appendChild(back);
        const flight = dkFly(back, from, {
            x: targets.get(id).x,
            y: targets.get(id).y,
            scale: .42
        }, 360, wait + n * 75, 90);
        flight.onfinish = () => back.remove();
        dkLater(wait + n * 75, (() => playSound('dk_deal')));
        dkLater(wait + n * 75 + 340, (() => after(id)));
    }));
    return wait + order.length * 75 + 360;
}

function dkOneMore(view, id) {
    const node = dk.seatNodes.get(id);
    if (node) dkFan(node, Math.min(view.hands[id], node.shown + 1));
}

function dkBanner(text, cls) {
    dk.banner.textContent = '';
    const shout = div('dk-shout ' + cls);
    shout.appendChild(div('dk-shout-text', text));
    dk.banner.appendChild(shout);
    dkLater(1600, (() => shout.remove()));
}

function dkEnd(view, nameOf) {
    dk.end.textContent = '';
    const box = div('dk-end-card');
    if (view.loser) {
        box.append(div('dk-end-word', word('dk_fool_big', 'FOOL')), div('dk-end-name', nameOf(view.loser)));
        const order = div('dk-end-order');
        view.out.forEach(((id, i) => order.appendChild(div('dk-end-place', `${i + 1}. ${nameOf(id)}`))));
        box.appendChild(order);
    } else {
        box.append(div('dk-end-word draw', word('dk_draw', 'Draw')), div('dk-end-name', word('dk_draw_note', 'Nobody is the fool')));
    }
    dk.end.appendChild(box);
    dk.end.classList.add('on');
    playSound(view.loser ? 'dk_fool' : 'win');
    dkLater(4200, (() => dk.end.classList.add('aside')));
}

function dkStatus(view, nameOf, state) {
    const away = view.seats.find((id => !dkIsBot(id) && !(state.players.find((p => p.id === id)) || {}).online));
    let text = '';
    if (view.phase === 'over') text = ''; else if (away) text = word('dk_away_wait', 'Waiting for {name}').replace('{name}', nameOf(away)); else if (view.phase === 'lead') text = word('dk_leads', '{name} leads').replace('{name}', nameOf(view.attacker)); else if (view.phase === 'defend') text = word('dk_beats', '{name} is beating').replace('{name}', nameOf(view.defender)); else if (view.taking) text = word('dk_takes', '{name} takes. Throw in more?').replace('{name}', nameOf(view.defender)); else text = word('dk_throw', 'Beaten? Throw in more or say done');
    setText(dk.status, text);
    setText(dk.mode, word(`mode_durak_${view.transfer ? 'transfer' : 'throw'}`, ''));
    dk.plate.classList.toggle('hidden', !text);
    setText(dk.clock, view.phase === 'over' || away ? '' : String(view.clock));
    dk.clock.classList.toggle('urgent', view.phase !== 'over' && !away && view.clock <= 5);
}

function dkDrawOrder(before, view, ev, tableCards) {
    if (!before) return [];
    const gains = new Map(view.seats.map((id => [ id, view.hands[id] - before.hands[id] - (ev.kind === 'took' && id === ev.by ? tableCards : 0) ])));
    const start = view.seats.indexOf(before.attacker);
    const round = view.seats.map(((_, i) => view.seats[(start + i) % view.seats.length])).filter((id => id !== before.defender)).concat([ before.defender ]);
    const order = [];
    for (const id of round) for (let i = 0; i < gains.get(id); i++) order.push([ id ]);
    return order;
}

function drawDurak(state) {
    const view = state.view;
    const nameOf = id => dkIsBot(id) ? dkBotName(id, view.seats, word('dk_bot', 'Bot')) : (state.players.find((p => p.id === id)) || {}).name || '?';
    const game = view.seats.join() + '|' + view.trump;
    if (!dk || !$('durak').contains(dk.seats) || dk.game !== game || view.event.seq < dk.seq) {
        stopDurak();
        buildDurak();
        dk.game = game;
    }
    dkUseDeck(word('dk_deck_file', 'durak-deck-en.webp'));
    show('durak');
    const before = dk.view;
    const ev = view.event;
    dkSeatsFor(view, nameOf);
    dkDeck(view);
    dkStatus(view, nameOf, state);
    dkSeats(view, nameOf, state);
    if (ev.seq !== dk.seq) {
        dk.seq = ev.seq;
        if (ev.kind === 'deal') {
            dkTable(view);
            dkPile(view);
            for (const node of dk.seatNodes.values()) dkFan(node, 0);
            const order = [];
            for (let round = 0; round < 6; round++) for (const id of view.seats) if (view.hands[id] > round) order.push([ id ]);
            dk.trumpSlot.classList.remove('shown');
            const done = dkDeal(order, 150, (id => dkOneMore(view, id)));
            dkLater(done, (() => {
                dk.trumpSlot.classList.add('shown');
                playSound('dk_trump');
            }));
        } else if (ev.kind === 'beaten' || ev.kind === 'took') {
            const tableCards = before ? before.table.reduce(((n, p) => n + 1 + (p.d ? 1 : 0)), 0) : 0;
            if (ev.kind === 'took') {
                dkBanner(word('dk_take_shout', 'I\'ll take!'), 'take');
                playSound('dk_take');
            } else {
                dkBanner(word('dk_beaten_shout', 'Beaten!'), 'beaten');
                playSound('dk_beaten');
            }
            const wait = dkSweep(ev);
            dk.tableKey = null;
            dkTable(view);
            const order = dkDrawOrder(before, view, ev, tableCards);
            for (const id of view.seats) dkFan(dk.seatNodes.get(id), view.hands[id] - order.filter((([who]) => who === id)).length);
            dkLater(wait, (() => dkPile(view)));
            const dealt = dkDeal(order, wait, (id => dkOneMore(view, id)));
            if (view.phase === 'over') dkLater(dealt + 400, (() => dkEnd(view, nameOf)));
        } else {
            dkTable(view);
            for (const id of view.seats) dkFan(dk.seatNodes.get(id), view.hands[id]);
            if (ev.kind === 'take') {
                dkBanner(word('dk_take_shout', 'I\'ll take!'), 'take');
                playSound('dk_take_call');
            } else {
                dkLand(ev);
                playSound(ev.kind === 'cover' ? 'dk_cover' : 'dk_card');
                if (ev.kind === 'transfer') {
                    dkBanner(word('dk_transfer_shout', 'Passed on!'), 'transfer');
                    playSound('dk_transfer');
                }
            }
        }
    } else {
        dkTable(view);
    }
    dk.view = view;
}