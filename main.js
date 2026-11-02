const engine = new globalThis['GameTable:core'].com.dezesar.gametable.core.Engine;

const seatOfSecret = new Map;

const addressOf = new Map;

const seatOf = new Map;

let seatsGiven = 0;

let players = 0;

function sendTo(address, message) {
    if (relay.owns(address)) relay.send(address, message); else context.sendCustomMessage(NAMESPACE, address, message);
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

context.addCustomMessageListener(NAMESPACE, (event => received(event.senderId, event.data)));

const EMPTY_TABLE_MS = 10 * 60 * 1e3;

let closing = null;

function senderGone(address) {
    const seat = seatOf.get(address);
    seatOf.delete(address);
    if (seat && addressOf.get(seat) === address) {
        addressOf.delete(seat);
        deliver(engine.offline(seat));
    }
    if (context.getSenders().length || relay.count()) return;
    if (!players) context.stop(); else closing = setTimeout((() => context.stop()), EMPTY_TABLE_MS);
}

function showRoom(room) {
    const url = `${PLAYER_URL}?room=${room}`;
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
    onRoom: showRoom,
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