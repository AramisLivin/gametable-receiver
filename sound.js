let audio = null;

let bus = null;

function makeBus() {
    const limiter = audio.createDynamicsCompressor();
    limiter.threshold.value = -10;
    limiter.ratio.value = 12;
    limiter.attack.value = .003;
    limiter.release.value = .25;
    const master = audio.createGain();
    master.gain.value = .72;
    limiter.connect(master).connect(audio.destination);
    const dry = audio.createGain();
    dry.connect(limiter);
    const hall = audio.createConvolver();
    const seconds = 2.4;
    const impulse = audio.createBuffer(2, Math.floor(audio.sampleRate * seconds), audio.sampleRate);
    for (let channel = 0; channel < 2; channel++) {
        const data = impulse.getChannelData(channel);
        for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 3);
    }
    hall.buffer = impulse;
    const wet = audio.createGain();
    wet.gain.value = .45;
    dry.connect(hall);
    hall.connect(wet).connect(limiter);
    return dry;
}

function envelope(at, attack, hold, release, volume) {
    const gain = audio.createGain();
    const start = audio.currentTime + at;
    gain.gain.setValueAtTime(1e-4, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + attack);
    gain.gain.setValueAtTime(volume, start + attack + hold);
    gain.gain.exponentialRampToValueAtTime(1e-4, start + attack + hold + release);
    return gain;
}

function noise(at, seconds, volume, filterType, from, to) {
    const length = Math.floor(audio.sampleRate * seconds);
    const buffer = audio.createBuffer(1, length, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    const source = audio.createBufferSource();
    source.buffer = buffer;
    const filter = audio.createBiquadFilter();
    const start = audio.currentTime + at;
    filter.type = filterType;
    filter.frequency.setValueAtTime(from, start);
    filter.frequency.exponentialRampToValueAtTime(to, start + seconds);
    source.connect(filter).connect(envelope(at, .005, 0, seconds, volume)).connect(bus);
    source.start(start);
}

function thump(at, from, to, seconds, volume) {
    const oscillator = audio.createOscillator();
    const start = audio.currentTime + at;
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(to, start + seconds);
    oscillator.connect(envelope(at, .004, 0, seconds, volume)).connect(bus);
    oscillator.start(start);
    oscillator.stop(start + seconds + .05);
}

function horn(frequency, at, seconds, volume) {
    const start = audio.currentTime + at;
    const filter = audio.createBiquadFilter();
    filter.type = 'lowpass';
    filter.Q.value = 1.2;
    filter.frequency.setValueAtTime(frequency * 1.5, start);
    filter.frequency.exponentialRampToValueAtTime(frequency * 6, start + .14);
    filter.frequency.exponentialRampToValueAtTime(frequency * 2.5, start + seconds);
    filter.connect(envelope(at, .07, seconds * .55, seconds * .45, volume)).connect(bus);
    for (const detune of [ -9, 0, 8 ]) {
        const oscillator = audio.createOscillator();
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = frequency;
        oscillator.detune.value = detune;
        oscillator.connect(filter);
        oscillator.start(start);
        oscillator.stop(start + seconds + .05);
    }
}

function chord(notes, at, seconds, volume) {
    notes.forEach((frequency => horn(frequency, at, seconds, volume)));
}

function drum(at, volume) {
    thump(at, 130, 48, .55, volume);
    noise(at, .1, volume * .35, 'lowpass', 2500, 500);
}

function explosion(at, volume) {
    noise(at, .09, volume * .8, 'highpass', 1800, 500);
    noise(at, 1.5, volume * .8, 'lowpass', 2600, 70);
    thump(at, 95, 26, 1.3, volume);
}

const SOUNDS = {
    place() {
        noise(0, .4, 1.2, 'bandpass', 1500, 350);
        thump(0, 120, 55, .25, .9);
    },
    ready() {
        chord([ 196, 293.7 ], 0, .7, .11);
    },
    miss() {
        noise(0, .14, 1.5, 'lowpass', 4200, 800);
        thump(0, 190, 65, .3, .9);
        noise(.07, 1.2, 1.1, 'bandpass', 1500, 420);
        for (let i = 0; i < 10; i++) {
            const pitch = 450 + Math.random() * 900;
            thump(.15 + Math.random() * .85, pitch, pitch * 1.7, .05 + Math.random() * .06, .1 + Math.random() * .12);
        }
    },
    hit() {
        explosion(0, 1.3);
        chord([ 110, 164.8 ], .08, .55, .1);
    },
    sunk() {
        explosion(0, .9);
        explosion(.38, .7);
        explosion(.8, .55);
        chord([ 146.8, 174.6, 220 ], .45, .65, .09);
        chord([ 110, 130.8, 164.8 ], 1.1, 1.5, .1);
    },
    battle() {
        [ 0, .34, .68, .85, 1.02 ].forEach(((at, i) => drum(at, .55 + i * .08)));
        chord([ 146.8, 220 ], 1.02, .34, .09);
        chord([ 146.8, 220, 293.7 ], 1.38, .2, .09);
        chord([ 174.6, 261.6, 349.2 ], 1.6, .2, .09);
        chord([ 146.8, 220, 293.7, 440 ], 1.82, 1.6, .09);
        drum(1.82, .9);
    },
    win() {
        drum(0, .7);
        chord([ 196, 293.7, 392 ], 0, .34, .09);
        chord([ 196, 293.7, 392 ], .36, .17, .09);
        chord([ 220, 329.6, 440 ], .55, .17, .09);
        drum(.74, .8);
        chord([ 246.9, 392, 493.9 ], .74, .6, .09);
        drum(1.38, .8);
        chord([ 261.6, 392, 523.3 ], 1.38, .28, .09);
        chord([ 293.7, 440, 587.3 ], 1.68, .28, .09);
        drum(2, 1);
        chord([ 196, 392, 493.9, 587.3, 784 ], 2, 2.4, .08);
        noise(2, 2.4, .09, 'highpass', 5e3, 2500);
    }
};

function playSound(kind) {
    try {
        if (!audio) {
            audio = new AudioContext;
            bus = makeBus();
        }
        if (audio.state === 'suspended') audio.resume();
        SOUNDS[kind]();
    } catch {
        audio = null;
        bus = null;
    }
}