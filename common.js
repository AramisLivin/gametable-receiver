const NAMESPACE = 'urn:x-cast:com.dezesar.gametable';

const VERSION = '20261103160657';

const SEARCH = new URLSearchParams(location.search);

const DEV = SEARCH.has('dev') || SEARCH.has('local') || typeof cast === 'undefined';

const context = DEV ? devContext() : cast.framework.CastReceiverContext.getInstance();

const $ = id => document.getElementById(id);

function show(id) {
    document.querySelectorAll('.screen').forEach((s => s.classList.toggle('on', s.id === id)));
}

function div(cls, text) {
    const d = document.createElement('div');
    d.className = cls;
    if (text !== undefined) d.textContent = text;
    return d;
}

let texts = {};

const word = (key, fallback) => texts[key] || fallback;

function devContext() {
    const listeners = [];
    return {
        addCustomMessageListener: (ns, fn) => listeners.push(fn),
        sendCustomMessage: (ns, sender, message) => window.onPhoneMessage && window.onPhoneMessage(sender, message),
        addEventListener() {},
        getSenders: () => [],
        start() {},
        stop() {
            console.log('Receiver closed');
        },
        deliver: (senderId, data) => listeners.forEach((fn => fn({
            senderId: senderId,
            data: data
        })))
    };
}