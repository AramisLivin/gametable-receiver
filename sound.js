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
    gain.gain.value = 1e-4;
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

const DUCK_SECONDS = {
    launch: .5,
    thud: .9,
    blast: 1.5,
    pop: .5,
    mega: 3.5,
    crate: .6,
    repair: .7,
    boing: .3,
    place: .5,
    ready: .8,
    miss: .9,
    hit: 1.6,
    sunk: 3,
    battle: 3.4,
    win: 5,
    splat: .5,
    bonk: .4,
    bonk_big: .7,
    lava: 2.6,
    bomb_hit: .5,
    rocket_launch: .6,
    rocket_wall: .8,
    rocket_meet: 1,
    rocket_fizzle: .6,
    rocket_base: 2.4,
    ding: 1.2,
    even: .8,
    curtain: .8,
    win_artillery: 3.5,
    win_ram: 3,
    win_carpet: 4,
    win_rockets: 3,
    win_recall: 3
};

let musicTheme = null;

let musicMood = null;

let musicTimer = null;

let musicTrack = null;

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

function echoFor(seconds) {
    if (musicEcho) return musicEcho;
    const delay = audio.createDelay(2);
    delay.delayTime.value = seconds;
    const feedback = audio.createGain();
    feedback.gain.value = .32;
    delay.connect(feedback).connect(delay);
    const wet = audio.createGain();
    wet.gain.value = .5;
    delay.connect(wet).connect(musicTrack);
    musicEcho = delay;
    return delay;
}

function musicKick(at, volume, from = 95, to = 48) {
    const start = audio.currentTime + at;
    const oscillator = audio.createOscillator();
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(to, start + .3);
    oscillator.connect(envelope(at, .006, 0, .32, volume)).connect(musicTrack);
    oscillator.start(start);
    oscillator.stop(start + .4);
}

function musicNoise(at, seconds, volume, type, frequency) {
    noiseBuffer = noiseBuffer || makeNoise();
    const source = audio.createBufferSource();
    source.buffer = noiseBuffer;
    const filter = audio.createBiquadFilter();
    filter.type = type;
    filter.frequency.value = frequency;
    source.connect(filter).connect(envelope(at, .002, 0, seconds, volume)).connect(musicTrack);
    const start = audio.currentTime + at;
    source.start(start, Math.random() * (NOISE_SECONDS - seconds - .1), seconds + .05);
}

const musicHat = (at, volume) => musicNoise(at, .04, volume, 'highpass', 7e3);

const musicSnare = (at, volume) => musicNoise(at, .12, volume, 'bandpass', 2200);

const musicBlock = (at, volume, note = 88) => musicNote(musicTrack, 'sine', note, at, .002, 0, .05, volume);

function musicRun(notes, at, step, play) {
    notes.forEach(((note, i) => {
        if (note !== null) play(note, at + i * step);
    }));
}

const THEMES = {
    menu: {
        beat: () => .68,
        volume: 1,
        bar(at, n, mood, beat) {
            const chords = [ [ 53, 57, 60, 64 ], [ 50, 53, 57, 60 ], [ 46, 50, 53, 57 ], [ 48, 52, 55, 58 ] ];
            const chord = chords[Math.floor(n / 2) % 4];
            for (const when of n % 2 ? [ 0, 1.5 ] : [ 0, 2.5 ]) {
                for (const note of chord) musicNote(musicTrack, 'triangle', note + 12, at + when * beat, .01, .05, .9, .032);
            }
            musicNote(musicTrack, 'sine', chord[0] - 12, at, .02, beat, .3, .13);
            musicNote(musicTrack, 'sine', chord[2] - 12, at + 2 * beat, .02, beat, .3, .1);
            for (let i = 1; i < 4; i += 2) musicHat(at + i * beat, .03);
            const scale = [ 72, 74, 77, 79, 81, 84 ];
            if (Math.random() < .6) {
                const echo = echoFor(beat * .75);
                let step = Math.floor(Math.random() * scale.length);
                const count = 2 + Math.floor(Math.random() * 3);
                for (let i = 0; i < count; i++) {
                    step = Math.max(0, Math.min(scale.length - 1, step + (Math.random() < .5 ? -1 : 1)));
                    const when = at + (1 + i) * beat / 2 + n % 2 * beat;
                    musicNote(musicTrack, 'triangle', scale[step], when, .005, 0, .7, .06);
                    musicNote(echo, 'triangle', scale[step], when, .005, 0, .7, .05);
                }
            }
        }
    },
    battleship: {
        beat: () => .8,
        volume: 1,
        bar(at, n, mood, beat) {
            const bar = beat * 4;
            const chords = [ [ 50, 53, 57 ], [ 46, 50, 53 ], [ 43, 50, 55 ], [ 45, 49, 52 ] ];
            const chord = chords[Math.floor(n / 2) % 4];
            if (n % 2 === 0) {
                for (const note of chord) {
                    for (const detune of [ -6, 6 ]) musicNote(musicTrack, 'sawtooth', note, at, 1.4, bar * 2 - 2.6, 1.6, .03, 620, detune);
                }
                musicNote(musicTrack, 'sine', chord[0] - 12, at, .5, bar * 2 - 1.6, 1.2, .1);
            }
            const echo = echoFor(beat * .75);
            const notes = [ chord[0] + 12, chord[1] + 12, chord[2] + 12, chord[0] + 24, chord[2] + 24 ];
            const plucks = Math.random() < .7 ? 1 + Math.floor(Math.random() * 3) : 0;
            for (let i = 0; i < plucks; i++) {
                const when = at + Math.floor(Math.random() * 8) * beat / 2;
                const note = notes[Math.floor(Math.random() * notes.length)];
                musicNote(musicTrack, 'triangle', note, when, .006, 0, 1.1, .055);
                musicNote(echo, 'triangle', note, when, .006, 0, 1.1, .055);
            }
            if (mood === 'fight') {
                for (let eighth = 0; eighth < 8; eighth++) {
                    const note = (eighth % 4 === 3 ? chord[2] : chord[0]) - 12;
                    musicNote(musicTrack, 'sawtooth', note, at + eighth * beat / 2, .01, .06, .2, eighth % 2 ? .035 : .055, 420);
                }
                [ 0, 1.5, 2, 3.5 ].forEach(((when, i) => musicKick(at + when * beat, i % 2 ? .09 : .15)));
            }
        }
    },
    artillery: {
        beat: () => .5,
        volume: 1.1,
        bar(at, n, mood, beat) {
            const tune = [ [ 67, null, 71, 74, 79, null, 74, null ], [ 72, null, 76, 79, 84, null, 79, null ], [ 74, null, 78, 81, 86, 85, 86, null ], [ 79, 78, 76, 74, 72, 71, 69, null ], [ 67, null, 71, 74, 79, null, 74, null ], [ 72, null, 76, 79, 84, null, 79, null ], [ 76, 76, 76, null, 74, 74, 74, null ], [ 71, 74, 72, 69, 67, null, 67, null ] ];
            const harmony = [ [ 43, 59, 62 ], [ 48, 60, 64 ], [ 50, 60, 66 ], [ 50, 60, 66 ], [ 43, 59, 62 ], [ 48, 60, 64 ], [ 45, 60, 64 ], [ 43, 59, 62 ] ];
            const place = n % 8;
            const [root, ...chord] = harmony[place];
            musicNote(musicTrack, 'triangle', root - 12, at, .01, beat * .45, .12, .2);
            musicNote(musicTrack, 'triangle', root - 5, at + 2 * beat, .01, beat * .45, .12, .16);
            for (const when of [ 1, 3 ]) for (const note of chord) musicNote(musicTrack, 'square', note, at + when * beat, .006, .05, .08, .018, 1600);
            for (const when of [ 1, 3 ]) musicSnare(at + when * beat, .05);
            if (place === 7) for (let i = 0; i < 6; i++) musicSnare(at + (2.5 + i * .25) * beat, .03 + i * .012);
            if (Math.floor(n / 8) % 2 === (mood === 'fight' ? 0 : 1)) {
                musicRun(tune[place], at, beat / 2, ((note, when) => musicNote(musicTrack, 'square', note, when, .006, beat * .26, .06, .024, 2600)));
            } else if (place % 2 === 0) {
                musicRun(tune[place].map((note => note === null ? null : note - 12)), at, beat / 2, ((note, when) => musicNote(musicTrack, 'triangle', note, when, .01, beat * .2, .1, .05)));
            }
        }
    },
    ram: {
        beat: mood => mood === 'fight' ? .405 : .56,
        volume: 1.25,
        bar(at, n, mood, beat) {
            if (mood === 'fight') {
                const riffs = [ [ 28, 28, 31, 28, 34, 33, 31, 28 ], [ 28, 28, 31, 28, 35, 34, 33, 31 ] ];
                musicRun(riffs[n % 2], at, beat / 2, ((note, when) => {
                    musicNote(musicTrack, 'sawtooth', note + 12, when, .005, beat * .2, .08, .075, 900);
                    musicNote(musicTrack, 'sine', note, when, .005, beat * .25, .08, .1);
                }));
                for (const when of [ 0, 1.5, 2 ]) musicKick(at + when * beat, .2, 120, 45);
                for (const when of [ 1, 3 ]) musicSnare(at + when * beat, .11);
                if (n % 4 === 3) musicRun([ 76, 75, 74, 73 ], at + 2 * beat, beat / 2, ((note, when) => musicNote(musicTrack, 'square', note, when, .005, beat * .3, .05, .03, 2e3)));
                return;
            }
            const walks = [ [ 40, null, 43, null, 45, 46, 47, null ], [ 40, null, 43, null, 46, 45, 43, null ], [ 45, null, 48, null, 50, 51, 52, null ], [ 47, null, 46, null, 45, 43, 42, null ] ];
            musicRun(walks[n % 4], at, beat / 2, ((note, when) => musicNote(musicTrack, 'triangle', note, when, .004, .03, .17, .2)));
            for (const when of [ 1, 3 ]) musicNoise(at + when * beat, .03, .09, 'bandpass', 3400);
            if (n % 4 === 1) musicRun([ 76, null, 75, 74, null, 71 ], at + 2 * beat, beat / 3, ((note, when) => musicNote(musicTrack, 'triangle', note, when, .004, .02, .2, .05)));
        }
    },
    carpet: {
        beat: mood => mood === 'fight' ? .6 : .72,
        volume: 1.25,
        bar(at, n, mood, beat) {
            const bar = beat * 4;
            const chords = [ [ 36, 48, 51, 55 ], [ 32, 48, 51, 56 ], [ 29, 48, 53, 56 ], [ 31, 47, 50, 55 ] ];
            const [root, ...chord] = chords[Math.floor(n / 2) % 4];
            if (n % 2 === 0) {
                for (const detune of [ -9, 9 ]) musicNote(musicTrack, 'sawtooth', root, at, .8, bar * 2 - 1.6, .8, .075, 280, detune);
            }
            if (mood === 'fight') {
                [ 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0 ].forEach(((on, i) => {
                    if (on) musicSnare(at + i * beat / 4, i % 8 === 0 ? .12 : .065);
                }));
                musicKick(at, .2, 70, 34);
                musicKick(at + 2 * beat, .15, 70, 34);
                for (const note of chord) musicNote(musicTrack, 'sawtooth', note, at, .03, beat * 1.3, .25, .03, 900);
                for (const note of chord) musicNote(musicTrack, 'sawtooth', note, at + 2.5 * beat, .02, beat * .2, .15, .03, 900);
                return;
            }
            for (let i = 0; i < 4; i++) musicBlock(at + i * beat, i === 0 ? .07 : .04, 76);
            if (n % 4 === 2) musicRun([ 60, null, 63, 67, null, 68, 67, null ], at, beat / 2, ((note, when) => musicNote(musicTrack, 'sawtooth', note - 12, when, .05, beat * .35, .3, .05, 700)));
        }
    },
    rockets: {
        beat: mood => mood === 'fight' ? .484 : .6,
        volume: 1,
        bar(at, n, mood, beat) {
            const chords = [ [ 57, 60, 64, 69 ], [ 53, 57, 60, 65 ], [ 55, 59, 62, 67 ], [ 52, 55, 59, 64 ] ];
            const chord = chords[Math.floor(n / 2) % 4];
            if (mood === 'fight') {
                const up = [ 0, 1, 2, 3, 2, 1, 0, 1, 3, 2, 1, 2, 3, 2, 1, 2 ];
                up.forEach(((index, i) => musicNote(musicTrack, 'square', chord[index] + 12, at + i * beat / 4, .003, .03, .05, .034, 2200)));
                for (let i = 0; i < 8; i++) musicNote(musicTrack, 'sawtooth', chord[0] - (i % 2 ? 12 : 24), at + i * beat / 2, .004, beat * .25, .05, .105, 620);
                for (let i = 0; i < 4; i++) musicKick(at + i * beat, .17, 140, 48);
                for (const when of [ 1, 3 ]) musicNoise(at + when * beat, .1, .07, 'bandpass', 1400);
                return;
            }
            const echo = echoFor(beat * .75);
            [ 0, 1, 2, 3, 2, 3, 1, 2 ].forEach(((index, i) => {
                const when = at + i * beat / 2;
                musicNote(musicTrack, 'sine', chord[index] + 12, when, .01, .04, .45, .07);
                if (i % 2 === 0) musicNote(echo, 'sine', chord[index] + 12, when, .01, .04, .45, .05);
            }));
            if (n % 2 === 0) musicNote(musicTrack, 'triangle', chord[0] - 12, at, .5, beat * 6, 1, .1);
        }
    },
    recall: {
        beat: mood => mood === 'fight' ? .54 : .72,
        volume: .85,
        bar(at, n, mood, beat) {
            const chords = [ [ 48, 64, 67, 72 ], [ 43, 62, 67, 71 ], [ 45, 60, 64, 69 ], [ 41, 60, 65, 69 ] ];
            const [root, ...chord] = chords[Math.floor(n / 2) % 4];
            if (mood === 'fight') {
                [ 0, 1, 2, 1, 0, 1, 2, 1 ].forEach(((index, i) => musicNote(musicTrack, 'triangle', chord[index], at + i * beat / 2, .005, .02, .5, .07)));
                musicNote(musicTrack, 'sine', root, at, .02, beat * 1.5, .4, .16);
                musicNote(musicTrack, 'sine', root + 7, at + 2 * beat, .02, beat * 1.5, .4, .12);
                return;
            }
            for (let i = 0; i < 4; i++) musicBlock(at + i * beat, i % 2 ? .05 : .08, i % 2 ? 83 : 88);
            musicNote(musicTrack, 'sine', root, at, .3, beat * 2.5, .6, .1);
            const box = [ 72, 74, 76, 79, 81, 84, 86, 88 ];
            let step = Math.floor(Math.random() * 4);
            for (let i = 0; i < 4; i++) {
                if (Math.random() < .3) continue;
                const when = at + i * beat + (Math.random() < .3 ? beat / 2 : 0);
                musicNote(musicTrack, 'sine', box[step], when, .002, 0, .8, .055);
                musicNote(musicTrack, 'sine', box[step] + 12, when, .002, 0, .35, .02);
                step = Math.min(box.length - 1, step + 1 + Math.floor(Math.random() * 2));
            }
        }
    }
};

function playNextBars() {
    const theme = THEMES[musicTheme];
    while (nextBar < audio.currentTime + 1) {
        const beat = theme.beat(musicMood);
        theme.bar(nextBar - audio.currentTime, barNumber++, musicMood, beat);
        nextBar += beat * 4;
    }
}

function setMusic(theme, mood = 'calm') {
    try {
        if (!theme) {
            if (!musicTheme) return;
            musicTheme = null;
            musicMood = null;
            prepareSound();
            clearInterval(musicTimer);
            fadeMusicTrack();
            return;
        }
        if (theme === musicTheme) {
            musicMood = mood;
            return;
        }
        prepareSound();
        if (audio.state === 'suspended') audio.resume();
        clearInterval(musicTimer);
        fadeMusicTrack();
        musicTheme = theme;
        musicMood = mood;
        const now = audio.currentTime;
        musicTrack = audio.createGain();
        musicTrack.gain.setValueAtTime(1e-4, now);
        musicTrack.gain.setTargetAtTime(THEMES[theme].volume, now, .4);
        musicTrack.connect(musicBus);
        musicEcho = null;
        musicBus.gain.cancelScheduledValues(now);
        musicBus.gain.setTargetAtTime(MUSIC_VOLUME, now, .2);
        nextBar = now + .1;
        barNumber = 0;
        playNextBars();
        musicTimer = setInterval(playNextBars, 400);
    } catch {
        musicTheme = null;
        musicMood = null;
    }
}

function fadeMusicTrack() {
    if (!musicTrack) return;
    const leaving = musicTrack;
    musicTrack = null;
    leaving.gain.cancelScheduledValues(audio.currentTime);
    leaving.gain.setTargetAtTime(1e-4, audio.currentTime, .25);
    setTimeout((() => leaving.disconnect()), 2500);
}

function duckMusic(kind) {
    const seconds = DUCK_SECONDS[kind];
    if (!musicTheme || !seconds) return;
    const now = audio.currentTime;
    musicBus.gain.cancelScheduledValues(now);
    musicBus.gain.setTargetAtTime(MUSIC_VOLUME * .25, now, .03);
    musicBus.gain.setTargetAtTime(MUSIC_VOLUME, now + seconds, .9);
}

function glide(at, from, to, attack, seconds, volume) {
    const oscillator = audio.createOscillator();
    const start = audio.currentTime + at;
    oscillator.frequency.setValueAtTime(from, start);
    oscillator.frequency.exponentialRampToValueAtTime(to, start + seconds);
    oscillator.connect(envelope(at, attack, Math.max(0, seconds - attack - .08), .08, volume)).connect(bus);
    oscillator.start(start);
    oscillator.stop(start + seconds + .05);
}

let tickBooked = 0;

const SOUNDS = {
    browse() {
        glide(0, 880, 880, .002, .05, .05);
    },
    curtain() {
        noise(0, .5, .5, 'bandpass', 500, 2600);
        [ 392, 523.3, 659.3, 784 ].forEach(((frequency, i) => glide(.05 + i * .06, frequency, frequency, .005, .36, .07)));
    },
    splat() {
        thump(0, 170, 45, .2, 1.1);
        noise(0, .14, .7, 'lowpass', 1400, 300);
        glide(.02, 420, 140, .005, .14, .12);
    },
    hop() {
        glide(0, 160, 300, .005, .07, .1);
        noise(0, .05, .14, 'lowpass', 900, 400);
    },
    bonk() {
        glide(0, 520, 170, .002, .11, .3);
        noise(0, .03, .5, 'bandpass', 1500, 900);
    },
    bonk_big() {
        glide(0, 340, 70, .002, .22, .45);
        thump(0, 150, 50, .22, 1.1);
        noise(0, .05, .8, 'bandpass', 1300, 600);
        glide(.08, 700, 900, .005, .16, .05);
    },
    lava() {
        glide(0, 900, 150, .02, .55, .14);
        thump(.5, 110, 30, .8, 1.2);
        noise(.5, .25, 1, 'lowpass', 1600, 300);
        noise(.55, 1.7, .2, 'highpass', 3600, 6500);
        for (const [at, from] of [ [ .85, 170 ], [ 1.05, 240 ], [ 1.3, 190 ], [ 1.5, 280 ] ]) glide(at, from, from * 2.2, .01, .1, .13);
    },
    bomber(seconds) {
        const start = audio.currentTime;
        for (const detune of [ -12, 10 ]) {
            const oscillator = audio.createOscillator();
            oscillator.type = 'sawtooth';
            oscillator.frequency.value = 62;
            oscillator.detune.value = detune;
            const filter = audio.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 340;
            oscillator.connect(filter).connect(envelope(0, Math.min(.8, seconds / 3), Math.max(0, seconds - 1.6), .8, .09)).connect(bus);
            oscillator.start(start);
            oscillator.stop(start + seconds + .2);
        }
    },
    bomb_miss() {
        noise(0, .16, .65, 'lowpass', 700, 180);
        thump(0, 90, 45, .13, .5);
    },
    bomb_hit() {
        noise(0, .26, 1.1, 'lowpass', 2100, 260);
        thump(0, 130, 38, .3, 1.2);
    },
    rocket_launch() {
        noise(0, .75, .6, 'bandpass', 260, 2600);
        thump(0, 90, 50, .5, .6);
        glide(.04, 220, 880, .04, .5, .05);
    },
    rocket_wall() {
        glide(0, 1500, 110, .002, .26, .2);
        noise(0, .28, .75, 'bandpass', 2800, 500);
        thump(0, 170, 60, .22, .8);
    },
    rocket_meet() {
        glide(0, 1900, 70, .002, .4, .2);
        explosion(.02, .8);
    },
    rocket_fizzle() {
        glide(0, 520, 90, .01, .65, .13);
        for (const at of [ 0, .16, .3, .42, .52 ]) noise(at, .06, .32, 'bandpass', 1500, 700);
    },
    rocket_base() {
        explosion(0, 1.2);
        glide(0, 1200, 45, .005, 1.4, .15);
        noise(.5, 1.2, .14, 'highpass', 3e3, 900);
    },
    flash_on() {
        for (const frequency of [ 1046.5, 1568 ]) glide(0, frequency, frequency, .003, .9, .09);
    },
    scribble() {
        for (let i = 0; i < 8; i++) noise(i * .09, .07, .34, 'bandpass', 3e3 + i % 3 * 700, 2200);
    },
    tick(share) {
        const frequency = 500 + 700 * share;
        const at = Math.max(.04, tickBooked - audio.currentTime);
        tickBooked = audio.currentTime + at + .05;
        glide(at, frequency, frequency, .002, .05, .07);
    },
    score_stop() {
        thump(0, 180, 80, .12, .5);
        noise(0, .05, .3, 'bandpass', 900, 500);
    },
    ding() {
        [ 1046.5, 1318.5, 1568, 2093 ].forEach(((frequency, i) => glide(i * .1, frequency, frequency, .003, .65, .1)));
    },
    even() {
        for (const [at, frequency] of [ [ 0, 659.3 ], [ .2, 659.3 ] ]) glide(at, frequency, frequency, .004, .24, .1);
    },
    win_artillery() {
        for (let i = 0; i < 8; i++) noise(i * .09, .07, .2 + i * .03, 'bandpass', 2200, 1800);
        drum(.72, .8);
        [ [ .72, 392, .16 ], [ .9, 392, .16 ], [ 1.08, 523.3, .34 ], [ 1.44, 659.3, .16 ], [ 1.62, 523.3, .16 ], [ 1.8, 784, 1.1 ] ].forEach((([at, frequency, seconds]) => horn(frequency, at, seconds, .1)));
        drum(1.8, .9);
    },
    win_ram() {
        glide(0, 300, 1300, .02, .5, .13);
        chord([ 261.6, 329.6, 392 ], .55, .14, .09);
        chord([ 329.6, 415.3, 493.9 ], .72, .14, .09);
        chord([ 392, 523.3, 659.3 ], .9, 1.1, .09);
        drum(.9, .9);
    },
    win_carpet() {
        drum(0, .8);
        chord([ 130.8, 196, 261.6 ], 0, .7, .1);
        drum(.75, .6);
        chord([ 103.8, 207.7, 261.6 ], .75, .7, .1);
        drum(1.5, .9);
        chord([ 130.8, 196, 261.6, 329.6 ], 1.5, 2, .09);
    },
    win_rockets() {
        [ 440, 523.3, 659.3, 880, 1046.5, 1318.5, 1760 ].forEach(((frequency, i) => glide(i * .08, frequency, frequency, .003, .2, .09)));
        glide(.6, 1760, 1760, .005, 1.2, .08);
        thump(.6, 130, 45, .5, 1);
        noise(.6, 1.1, .13, 'highpass', 5e3, 2200);
    },
    win_recall() {
        [ [ 0, 1046.5 ], [ .16, 1318.5 ], [ .32, 1568 ], [ .48, 2093 ], [ .72, 1568 ], [ .88, 2093 ], [ 1.08, 2637 ] ].forEach((([at, frequency]) => glide(at, frequency, frequency, .003, .6, .09)));
    },
    fire() {
        noise(0, .05, .14, 'bandpass', 3600, 1500);
        thump(0, 210, 130, .05, .12);
    },
    launch() {
        noise(0, .05, .5, 'highpass', 2600, 900);
        noise(0, .22, 1.2, 'lowpass', 2600, 380);
        thump(0, 140, 44, .3, 1.2);
        noise(.06, .55, .28, 'lowpass', 800, 120);
    },
    whistle(seconds) {
        glide(0, 1250, 340, .18, Math.max(.4, seconds), .045);
    },
    thud() {
        noise(0, .32, 1.6, 'lowpass', 1500, 220);
        thump(0, 120, 40, .32, 1.3);
        noise(.2, .5, .16, 'bandpass', 2400, 800);
    },
    blast() {
        explosion(0, 1.05);
        noise(.34, .7, .17, 'bandpass', 2600, 700);
    },
    pop() {
        noise(0, .12, 1.9, 'lowpass', 3e3, 400);
        thump(0, 170, 55, .18, 1.6);
    },
    mega() {
        explosion(0, 1.25);
        explosion(.2, .85);
        thump(0, 74, 20, 2.4, 1.2);
        noise(.55, 1.5, .22, 'bandpass', 2e3, 500);
    },
    boing() {
        glide(0, 210, 620, .01, .2, .3);
        thump(0, 150, 70, .12, .6);
    },
    crate() {
        noise(0, .1, 1.2, 'bandpass', 1900, 700);
        glide(.08, 784, 784, .01, .2, .14);
        glide(.2, 1175, 1175, .01, .34, .14);
    },
    repair() {
        glide(0, 523, 523, .01, .18, .13);
        glide(.13, 659, 659, .01, .18, .13);
        glide(.26, 784, 784, .01, .34, .13);
    },
    drive(seconds) {
        noise(0, seconds, 2.4, 'lowpass', 260, 160);
        noise(0, seconds, .2, 'bandpass', 1100, 900);
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

function playSound(kind, detail) {
    try {
        prepareSound();
        if (audio.state === 'suspended') audio.resume();
        if (!SOUNDS[kind]) return;
        duckMusic(kind);
        SOUNDS[kind](detail);
    } catch {
        audio = null;
        bus = null;
        clearInterval(musicTimer);
        musicTheme = null;
        musicMood = null;
    }
}