const DK_SUIT = {
    s: '♠',
    c: '♣',
    d: '♦',
    h: '♥'
};

const DK_ROWS = 'cdhs';

const dkRed = suit => suit === 'h' || suit === 'd';

function dkNode(cls, text) {
    const node = document.createElement('div');
    node.className = cls;
    if (text !== undefined) node.textContent = text;
    return node;
}

let dkDeckFile = null;

function dkUseDeck(file) {
    if (!file || file === dkDeckFile) return;
    dkDeckFile = file;
    document.documentElement.style.setProperty('--dk-deck', `url("${file}")`);
    (new Image).src = file;
}

function dkCardFace(code, cls = '') {
    const rank = parseInt(code, 10), suit = code.slice(-1);
    const card = dkNode(`dk-card face ${dkRed(suit) ? 'red' : 'black'} ${cls}`);
    card.dataset.code = code;
    card.style.backgroundPosition = `${(rank - 6) * 12.5}% ${DK_ROWS.indexOf(suit) * 100 / 3}%`;
    return card;
}

const dkCardBack = (cls = '') => dkNode('dk-card back ' + cls);

const dkIsBot = id => id.startsWith('bot');

function dkBotName(id, seats, word) {
    return seats.filter(dkIsBot).length > 1 ? `${word} ${id.slice(3)}` : word;
}

const DK_ROBOT = '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M11 1h2v3h5a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h5z"/><circle cx="8.5" cy="10.5" r="2" fill="#1c140d"/><circle cx="15.5" cy="10.5" r="2" fill="#1c140d"/><path fill="#1c140d" d="M8 15h8v1.6H8z"/><path fill="currentColor" d="M7 20h3v3H7zm7 0h3v3h-3z"/></svg>';