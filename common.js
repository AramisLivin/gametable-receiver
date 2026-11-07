const NAMESPACE = 'urn:x-cast:com.dezesar.gametable';

const VERSION = '20261107090523';

const SEARCH = new URLSearchParams(location.search);

const DEV = SEARCH.has('dev') || SEARCH.has('local') || typeof cast === 'undefined';

const context = DEV ? devContext() : cast.framework.CastReceiverContext.getInstance();

const $ = id => document.getElementById(id);

let stageScale = 1;

function fitStage() {
    stageScale = Math.min(1, innerWidth / (innerHeight * 16 / 9));
    document.body.style.transform = stageScale < 1 ? `scale(${stageScale})` : '';
}

addEventListener('resize', fitStage);

document.addEventListener('DOMContentLoaded', fitStage);

function onStage(box) {
    const stage = document.body.getBoundingClientRect();
    return {
        x: (box.left + box.width / 2 - stage.left) / stageScale,
        y: (box.top + box.height / 2 - stage.top) / stageScale
    };
}

function show(id) {
    document.querySelectorAll('.screen').forEach((s => s.classList.toggle('on', s.id === id)));
}

function letterbox(on) {
    document.body.classList.toggle('finale', on);
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