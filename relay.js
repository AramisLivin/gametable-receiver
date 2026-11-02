const RELAY_URL = new URLSearchParams(location.search).get('relay') || (new URLSearchParams(location.search).has('local') ? location.origin.replace(/^http/, 'ws') + '/ws' : '');

const PLAYER_URL = new URLSearchParams(location.search).get('player') || (new URLSearchParams(location.search).has('local') ? location.origin + '/play/' : '');

const RELAY_PREFIX = 'relay:';

const relay = {
    conns: new Set,
    socket: null,
    room: null,
    key: null,
    retry: 1e3,
    count() {
        return this.conns.size;
    },
    owns(address) {
        return address.startsWith(RELAY_PREFIX);
    },
    send(address, data) {
        if (this.socket && this.socket.readyState === 1) {
            this.socket.send(JSON.stringify({
                type: 'to',
                conn: address.slice(RELAY_PREFIX.length),
                data: data
            }));
        }
    },
    start(handlers) {
        if (!RELAY_URL) return;
        const socket = new WebSocket(RELAY_URL);
        this.socket = socket;
        socket.onopen = () => {
            this.retry = 1e3;
            socket.send(JSON.stringify({
                type: 'host',
                room: this.room,
                key: this.key
            }));
        };
        socket.onmessage = event => {
            const m = JSON.parse(event.data);
            const address = RELAY_PREFIX + m.conn;
            if (m.type === 'room') {
                this.room = m.room;
                this.key = m.key;
                for (const conn of [ ...this.conns ]) {
                    if (!m.conns.includes(conn)) {
                        this.conns.delete(conn);
                        handlers.onGone(RELAY_PREFIX + conn);
                    }
                }
                m.conns.forEach((conn => this.conns.add(conn)));
                handlers.onRoom(m.room);
            } else if (m.type === 'connected') {
                this.conns.add(m.conn);
                handlers.onConnected(address);
            } else if (m.type === 'gone') {
                this.conns.delete(m.conn);
                handlers.onGone(address);
            } else if (m.type === 'from') {
                handlers.onMessage(address, m.data);
            }
        };
        socket.onclose = () => {
            setTimeout((() => this.start(handlers)), this.retry);
            this.retry = Math.min(this.retry * 2, 15e3);
        };
    }
};