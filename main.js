const engine = new globalThis['GameTable:core'].com.dezesar.gametable.core.Engine;

const seatOfSecret = new Map;

const addressOf = new Map;

const seatOf = new Map;

let seatsGiven = 0;

let players = 0;

const HUB_PREFIX = 'hub:';

const hub = {
    sender: null,
    conns: new Set
};

function sendTo(address, message) {
    if (relay.owns(address)) relay.send(address, message); else if (address.startsWith(HUB_PREFIX)) {
        context.sendCustomMessage(NAMESPACE, hub.sender, {
            type: 'hub-to',
            conn: address.slice(HUB_PREFIX.length),
            data: message
        });
    } else context.sendCustomMessage(NAMESPACE, address, message);
}

function hubGone(conn) {
    hub.conns.delete(conn);
    senderGone(HUB_PREFIX + conn);
}

function fromHub(sender, msg) {
    if (msg.type === 'hub') {
        if (hub.sender && hub.sender !== sender) return;
        hub.sender = sender;
        [ ...hub.conns ].forEach(hubGone);
        showJoin(msg.url, msg.room);
    } else if (sender === hub.sender) {
        if (msg.type === 'hub-connected') {
            hub.conns.add(msg.conn);
            clearTimeout(closing);
        } else if (msg.type === 'hub-from') {
            received(HUB_PREFIX + msg.conn, msg.data);
        } else if (msg.type === 'hub-gone') {
            hubGone(msg.conn);
        }
    }
}

function deliver(json) {
    for (const {to: to, message: message} of JSON.parse(json)) {
        if (to === 'tv') draw(message); else if (addressOf.has(to)) sendTo(addressOf.get(to), message);
    }
}

function draw(state) {
    players = state.players.length;
    document.body.classList.toggle('playing', !!state.playing);
    setMusic(!players ? null : state.view && state.view.phase === 'playing' && !state.view.winner ? 'battle' : 'calm');
    if (state.playing || !players) playMenuVideo(null);
    if (state.playing === 'battleship') {
        drawBattleship(state);
        return;
    }
    dropLanding();
    if (!players) {
        show('home');
        return;
    }
    drawMenu(state);
}

function seatFor(secret) {
    if (!seatOfSecret.has(secret)) seatOfSecret.set(secret, 'seat' + ++seatsGiven);
    return seatOfSecret.get(secret);
}

function received(address, data) {
    let msg;
    try {
        msg = typeof data === 'string' ? JSON.parse(data) : data;
    } catch {
        return;
    }
    if (!msg || typeof msg !== 'object') return;
    if (msg.type === 'join' && typeof msg.id === 'string' && msg.id) {
        const seat = seatFor(msg.id);
        addressOf.set(seat, address);
        seatOf.set(address, seat);
        if (msg.texts && !Object.keys(texts).length) {
            texts = msg.texts;
            $('waiting').textContent = word('waiting', $('waiting').textContent);
            writeJoinWords();
        }
    }
    const seat = seatOf.get(address);
    if (seat) deliver(engine.receive(seat, JSON.stringify(msg)));
}

context.addCustomMessageListener(NAMESPACE, (event => {
    let msg = event.data;
    try {
        if (typeof msg === 'string') msg = JSON.parse(msg);
    } catch {
        return;
    }
    if (msg && typeof msg.type === 'string' && msg.type.startsWith('hub')) fromHub(event.senderId, msg); else received(event.senderId, msg);
}));

const EMPTY_TABLE_MS = 10 * 60 * 1e3;

let closing = null;

function senderGone(address) {
    if (address === hub.sender) {
        hub.sender = null;
        [ ...hub.conns ].forEach(hubGone);
        $('join').classList.remove('on');
        context.sendCustomMessage(NAMESPACE, undefined, {
            type: 'need-hub'
        });
    }
    const seat = seatOf.get(address);
    seatOf.delete(address);
    if (seat && addressOf.get(seat) === address) {
        addressOf.delete(seat);
        deliver(engine.offline(seat));
    }
    if (addressOf.size || relay.count() || hub.conns.size) return;
    if (!players) context.stop(); else closing = setTimeout((() => context.stop()), EMPTY_TABLE_MS);
}

function softQrSvg(qr, soft = .42, finderSoft = .15) {
    const size = qr.getModuleCount();
    const dark = (y, x) => y >= 0 && x >= 0 && y < size && x < size && qr.isDark(y, x);
    const inFinder = (y, x) => y < 7 && x < 7 || y < 7 && x >= size - 7 || y >= size - 7 && x < 7;
    const arc = (x, y) => `A${soft} ${soft} 0 0 1 ${x} ${y}`;
    let cells = '';
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            if (!dark(y, x) || inFinder(y, x)) continue;
            const up = dark(y - 1, x), down = dark(y + 1, x), left = dark(y, x - 1), right = dark(y, x + 1);
            const tl = !up && !left ? soft : 0, tr = !up && !right ? soft : 0, br = !down && !right ? soft : 0, bl = !down && !left ? soft : 0;
            cells += `M${x + tl} ${y}H${x + 1 - tr}${tr ? arc(x + 1, y + tr) : ''}V${y + 1 - br}${br ? arc(x + 1 - br, y + 1) : ''}H${x + bl}${bl ? arc(x, y + 1 - bl) : ''}V${y + tl}${tl ? arc(x + tl, y) : ''}Z`;
        }
    }
    const box = (x, y, side, r) => `M${x + r} ${y}H${x + side - r}A${r} ${r} 0 0 1 ${x + side} ${y + r}V${y + side - r}A${r} ${r} 0 0 1 ${x + side - r} ${y + side}H${x + r}A${r} ${r} 0 0 1 ${x} ${y + side - r}V${y + r}A${r} ${r} 0 0 1 ${x + r} ${y}Z`;
    const finder = (x, y) => box(x, y, 7, finderSoft) + box(x + 1, y + 1, 5, finderSoft * .55) + box(x + 2, y + 2, 3, finderSoft * .5);
    const paths = cells + finder(0, 0) + finder(size - 7, 0) + finder(0, size - 7);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}"><path d="${paths}" fill="#0c2748" fill-rule="evenodd" stroke="#0c2748" stroke-width=".03"/></svg>`;
}

function writeJoinWords() {
    $('join-caption').textContent = word('board', 'Come aboard');
    $('join-code-label').textContent = word('table_code', 'Table code');
}

function showJoin(url, room) {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    $('join-qr').innerHTML = softQrSvg(qr);
    $('join-code').textContent = room;
    writeJoinWords();
    $('join').classList.add('on');
}

show('home');

relay.start({
    onRoom: room => showJoin(`${PLAYER_URL}?room=${room}`, room),
    onConnected: () => clearTimeout(closing),
    onMessage: received,
    onGone: senderGone
});

if (new URLSearchParams(location.search).has('dev')) {
    const s = document.createElement('script');
    s.src = 'dev.js?v=' + Date.now();
    document.body.appendChild(s);
}

if (!DEV) {
    context.addEventListener(cast.framework.system.EventType.SENDER_CONNECTED, (() => {
        clearTimeout(closing);
    }));
    context.addEventListener(cast.framework.system.EventType.SENDER_DISCONNECTED, (e => senderGone(e.senderId)));
    const options = new cast.framework.CastReceiverOptions;
    options.disableIdleTimeout = true;
    options.customNamespaces = {
        [NAMESPACE]: cast.framework.system.MessageType.JSON
    };
    context.start(options);
}