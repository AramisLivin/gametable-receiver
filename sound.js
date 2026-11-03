let audio = null;

let bus = null;

let musicBus = null;

function softCeiling() {
    const shaper = audio.createWaveShaper();
    const curve = new Float32Array(2049);
    for (let i = 0; i < curve.length; i++) curve[i] = Math.tanh((i / 1024 - 1) * 1.6) / Math.tanh(1.6) * .95;
    shaper.curve = curve;
    return shaper;
}

function makeBus() {
    const limiter = audio.createDynamicsCompressor();
    limiter.threshold.value = -16;
    limiter.ratio.value = 12;
    limiter.attack.value = .001;
    limiter.release.value = .25;
    const master = audio.createGain();
    master.gain.value = .42;
    limiter.connect(master).connect(softCeiling()).connect(audio.destination);
    musicBus = audio.createGain();
    musicBus.gain.value = MUSIC_VOLUME;
    musicBus.connect(limiter);
    musicEcho = null;
    const dry = audio.createGain();
    dry.connect(limiter);
    const hall = audio.createConvolver();
    const seconds = 1;
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

const NOISE_SECONDS = 4;

let noiseBuffer = null;

function makeNoise() {
    const buffer = audio.createBuffer(1, Math.floor(audio.sampleRate * NOISE_SECONDS), audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    return buffer;
}

function noise(at, seconds, volume, filterType, from, to) {
    noiseBuffer = noiseBuffer || makeNoise();
    const source = audio.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = audio.createBiquadFilter();
    const start = audio.currentTime + at;
    filter.type = filterType;
    filter.frequency.setValueAtTime(from, start);
    filter.frequency.exponentialRampToValueAtTime(to, start + seconds);
    source.connect(filter).connect(envelope(at, .005, 0, seconds, volume)).connect(bus);
    source.start(start, Math.random() * (NOISE_SECONDS - seconds), seconds);
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

const MUSIC_VOLUME = .42;

const BEAT = .8;

const BAR = BEAT * 4;

const CHORDS = [ [ 50, 53, 57 ], [ 46, 50, 53 ], [ 43, 50, 55 ], [ 45, 49, 52 ] ];

const DUCK_SECONDS = {
    launch: .5,
    thud: .9,
    place: .5,
    ready: .8,
    miss: .9,
    hit: 1.6,
    sunk: 3,
    battle: 3.4,
    win: 5
};

let musicMood = null;

let musicTimer = null;

let musicEcho = null;

let nextBar = 0;

let barNumber = 0;

const pitch = note => 440 * Math.pow(2, (note - 69) / 12);

function musicNote(to, wave, note, at, attack, hold, release, volume, cutoff, detune = 0) {
    const start = audio.currentTime + at;
    const oscillator = audio.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.value = pitch(note);
    oscillator.detune.value = detune;
    let last = oscillator;
    if (cutoff) {
        const filter = audio.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = cutoff;
        last = oscillator.connect(filter);
    }
    last.connect(envelope(at, attack, hold, release, volume)).connect(to);
    oscillator.start(start);
    oscillator.stop(start + attack + hold + release + .05);
}

function echoFor() {
    if (musicEcho) return musicEcho;
    const delay = audio.createDelay(2);
    delay.delayTime.value = BEAT * .75;
    const feedback = audio.createGain();
    feedback.gain.value = .32;
    delay.connect(feedback).connect(delay);
    const wet = audio.createGain();
    wet.gain.value = .5;
    delay.connect(wet).connect(musicBus);
    musicEcho = delay;
    return delay;
}

function musicDrum(at, volume) {
    const start = audio.currentTime + at;
    const oscillator = audio.createOscillator();
    oscillator.frequency.setValueAtTime(95, start);
    oscillator.frequency.exponentialRampToValueAtTime(48, start + .3);
    oscillator.connect(envelope(at, .006, 0, .42, volume)).connect(musicBus);
    oscillator.start(start);
    oscillator.stop(start + .5);
}

function playBar(at, number, mood) {
    const chord = CHORDS[Math.floor(number / 2) % CHORDS.length];
    if (number % 2 === 0) {
        for (const note of chord) {
            for (const detune of [ -6, 6 ]) musicNote(musicBus, 'sawtooth', note, at, 1.4, BAR * 2 - 2.6, 1.6, .03, 620, detune);
        }
        musicNote(musicBus, 'sine', chord[0] - 12, at, .5, BAR * 2 - 1.6, 1.2, .1);
    }
    const echo = echoFor();
    const notes = [ chord[0] + 12, chord[1] + 12, chord[2] + 12, chord[0] + 24, chord[2] + 24 ];
    const plucks = Math.random() < .7 ? 1 + Math.floor(Math.random() * 3) : 0;
    for (let i = 0; i < plucks; i++) {
        const when = at + Math.floor(Math.random() * 8) * BEAT / 2;
        const note = notes[Math.floor(Math.random() * notes.length)];
        musicNote(musicBus, 'triangle', note, when, .006, 0, 1.1, .055);
        musicNote(echo, 'triangle', note, when, .006, 0, 1.1, .055);
    }
    if (mood === 'battle') {
        for (let eighth = 0; eighth < 8; eighth++) {
            const note = (eighth % 4 === 3 ? chord[2] : chord[0]) - 12;
            musicNote(musicBus, 'sawtooth', note, at + eighth * BEAT / 2, .01, .06, .2, eighth % 2 ? .035 : .055, 420);
        }
        [ 0, 1.5, 2, 3.5 ].forEach(((beat, i) => musicDrum(at + beat * BEAT, i % 2 ? .09 : .15)));
    }
}

function playNextBars() {
    while (nextBar < audio.currentTime + 1) {
        playBar(nextBar - audio.currentTime, barNumber++, musicMood);
        nextBar += BAR;
    }
}

function setMusic(mood) {
    try {
        if (mood === musicMood) return;
        const wasOn = !!musicMood;
        musicMood = mood;
        prepareSound();
        const now = audio.currentTime;
        if (!mood) {
            clearInterval(musicTimer);
            musicBus.gain.cancelScheduledValues(now);
            musicBus.gain.setTargetAtTime(1e-4, now, .5);
            return;
        }
        if (wasOn) return;
        if (audio.state === 'suspended') audio.resume();
        musicBus.gain.cancelScheduledValues(now);
        musicBus.gain.setValueAtTime(1e-4, now);
        musicBus.gain.setTargetAtTime(MUSIC_VOLUME, now, 1.2);
        nextBar = now + .1;
        barNumber = 0;
        playNextBars();
        musicTimer = setInterval(playNextBars, 400);
    } catch {
        musicMood = null;
    }
}

function duckMusic(kind) {
    const seconds = DUCK_SECONDS[kind];
    if (!musicMood || !seconds) return;
    const now = audio.currentTime;
    musicBus.gain.cancelScheduledValues(now);
    musicBus.gain.setTargetAtTime(MUSIC_VOLUME * .25, now, .03);
    musicBus.gain.setTargetAtTime(MUSIC_VOLUME, now + seconds, .9);
}

const SOUNDS = {
    fire() {
        noise(0, .05, .14, 'bandpass', 3600, 1500);
        thump(0, 210, 130, .05, .12);
    },
    launch() {
        noise(0, .16, 1.1, 'lowpass', 2600, 500);
        thump(0, 130, 48, .28, 1.1);
    },
    thud() {
        noise(0, .28, 1.5, 'lowpass', 1400, 240);
        thump(0, 120, 42, .3, 1.2);
    },
    place() {
        noise(0, .4, 1.2, 'bandpass', 1500, 350);
        thump(0, 120, 55, .25, .9);
    },
    ready() {
        chord([ 196, 293.7 ], 0, .7, .11);
    },
    miss() {
        noise(0, .34, 2.4, 'lowpass', 3e3, 400);
        thump(0, 230, 85, .2, 1.3);
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

function prepareSound() {
    if (audio) return;
    audio = new AudioContext({
        latencyHint: 'playback'
    });
    bus = makeBus();
    noiseBuffer = makeNoise();
}

try {
    prepareSound();
} catch {
    audio = null;
    bus = null;
}

function playSound(kind) {
    try {
        prepareSound();
        if (audio.state === 'suspended') audio.resume();
        duckMusic(kind);
        SOUNDS[kind]();
    } catch {
        audio = null;
        bus = null;
        clearInterval(musicTimer);
        musicMood = null;
    }
}