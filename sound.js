let audio = null;

function noise(seconds, volume, from, to) {
    const length = Math.floor(audio.sampleRate * seconds);
    const buffer = audio.createBuffer(1, length, audio.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
    const source = audio.createBufferSource();
    source.buffer = buffer;
    const filter = audio.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(from, audio.currentTime);
    filter.frequency.exponentialRampToValueAtTime(to, audio.currentTime + seconds);
    const gain = audio.createGain();
    gain.gain.setValueAtTime(volume, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + seconds);
    source.connect(filter).connect(gain).connect(audio.destination);
    source.start();
}

function tone(frequency, at, seconds, volume) {
    const oscillator = audio.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.value = frequency;
    const gain = audio.createGain();
    gain.gain.setValueAtTime(.001, audio.currentTime + at);
    gain.gain.exponentialRampToValueAtTime(volume, audio.currentTime + at + .02);
    gain.gain.exponentialRampToValueAtTime(.001, audio.currentTime + at + seconds);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start(audio.currentTime + at);
    oscillator.stop(audio.currentTime + at + seconds);
}

function playSound(kind) {
    try {
        audio = audio || new AudioContext;
        if (audio.state === 'suspended') audio.resume();
        if (kind === 'place') noise(.3, .3, 1600, 250);
        if (kind === 'ready') [ 523, 784 ].forEach(((frequency, i) => tone(frequency, i * .12, .35, .3)));
        if (kind === 'miss') noise(.45, .25, 2400, 300);
        if (kind === 'hit') {
            noise(.55, .6, 1500, 80);
            tone(70, 0, .35, .5);
        }
        if (kind === 'sunk') {
            noise(1.1, .7, 1800, 60);
            tone(55, 0, .8, .6);
        }
        if (kind === 'win') [ 392, 494, 587, 784 ].forEach(((frequency, i) => tone(frequency, i * .16, .5, .3)));
    } catch {
        audio = null;
    }
}