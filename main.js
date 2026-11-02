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
    if (state.playing === 'battleship') {
        drawBattleship(state);
        return;
    }
    if (!players) {
        show('home');
        return;
    }
    $('lobby-title').textContent = word('table', 'At the table');
    $('lobby-hint').textContent = word('host_picks', 'The first player picks a game on the phone');
    const seats = $('seats');
    seats.textContent = '';
    for (const p of state.players) {
        seats.appendChild(div('seat' + (p.online ? '' : ' off') + (p.id === state.host ? ' host' : ''), p.name));
    }
    show('lobby');
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
        }
    }
    const seat = seatOf.get(address);
    if (seat) deliver(engine.receive(seat, JSON.stringify(msg)));
}

function report(event) {
    if (DEV) return;
    const screen = document.querySelector('.screen.on');
    const box = screen ? screen.getBoundingClientRect() : {};
    context.sendCustomMessage(NAMESPACE, undefined, {
        type: 'debug',
        event: event,
        version: VERSION,
        screen: screen ? screen.id : null,
        size: `${box.width}x${box.height}`,
        window: `${innerWidth}x${innerHeight}`,
        hub: hub.sender,
        guests: hub.conns.size,
        players: players,
        agent: navigator.userAgent
    });
}

addEventListener('error', (e => report(`error: ${e.message} at ${e.filename}:${e.lineno}`)));

context.addCustomMessageListener(NAMESPACE, (event => {
    let msg = event.data;
    try {
        if (typeof msg === 'string') msg = JSON.parse(msg);
    } catch {
        return;
    }
    try {
        if (msg && typeof msg.type === 'string' && msg.type.startsWith('hub')) fromHub(event.senderId, msg); else received(event.senderId, msg);
        report(`after ${msg && msg.type} from ${event.senderId}`);
    } catch (e) {
        report(`failed on ${msg && msg.type}: ${e.message}`);
    }
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
    if (context.getSenders().length || relay.count() || hub.conns.size) return;
    if (!players) context.stop(); else closing = setTimeout((() => context.stop()), EMPTY_TABLE_MS);
}

function showJoin(url, room) {
    const qr = qrcode(0, 'M');
    qr.addData(url);
    qr.make();
    $('join-qr').innerHTML = qr.createSvgTag({
        scalable: true,
        margin: 0
    });
    $('join-code').textContent = room;
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