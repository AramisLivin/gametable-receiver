const engine = new globalThis['GameTable:core'].com.dezesar.gametable.core.Engine;

const senderOf = {};

const playerOf = {};

let players = 0;

function deliver(json) {
    for (const {to: to, message: message} of JSON.parse(json)) {
        if (to === 'tv') draw(message); else if (senderOf[to]) context.sendCustomMessage(NAMESPACE, senderOf[to], message);
    }
}

function draw(state) {
    players = state.players.length;
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

context.addCustomMessageListener(NAMESPACE, (event => {
    const msg = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    if (msg.type === 'join' && msg.id) {
        senderOf[msg.id] = event.senderId;
        playerOf[event.senderId] = msg.id;
        if (msg.texts && !Object.keys(texts).length) {
            texts = msg.texts;
            $('waiting').textContent = word('waiting', $('waiting').textContent);
        }
    }
    const id = playerOf[event.senderId];
    if (id) deliver(engine.receive(id, JSON.stringify(msg)));
}));

const EMPTY_TABLE_MS = 10 * 60 * 1e3;

let closing = null;

function senderGone(senderId) {
    const id = playerOf[senderId];
    delete playerOf[senderId];
    if (id && senderOf[id] === senderId) {
        delete senderOf[id];
        deliver(engine.offline(id));
    }
    if (context.getSenders().length) return;
    if (!players) context.stop(); else closing = setTimeout((() => context.stop()), EMPTY_TABLE_MS);
}

show('home');

if (DEV) {
    const s = document.createElement('script');
    s.src = 'dev.js?v=' + Date.now();
    document.body.appendChild(s);
} else {
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