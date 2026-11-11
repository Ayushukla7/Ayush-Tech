// Web Audio API Synthesizer for F1 Telemetry, Race Comms & High-Performance UI
let audioCtx = null;
let isAudioMuted = false; // Enabled for maximum cinematic impact

const getAudioContext = () => {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const isMuted = () => isAudioMuted;

export const setMuted = (muted) => {
  isAudioMuted = muted;
  return isAudioMuted;
};

export const toggleAudio = () => {
  isAudioMuted = !isAudioMuted;
  if (!isAudioMuted) {
    playRadioBeep();
  }
  return !isAudioMuted;
};

// Tactical UI precision switch click
export const playTacticalClick = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(1200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
};

// Pit-to-car radio comms chirp / handshake
export const playRadioBeep = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [1760, 2637].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.06);

    gain.gain.setValueAtTime(0.09, now + i * 0.06);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.12);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.06);
    osc.stop(now + i * 0.06 + 0.12);
  });
};

// Telemetry hotspot target lock chirp
export const playTelemetryBlip = (freqOffset = 0) => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(800 + freqOffset, now);
  osc.frequency.exponentialRampToValueAtTime(1400 + freqOffset, now + 0.06);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.06);
};

// Exhilarating F1 Turbo-Hybrid V6 Throttle Rev Sound synthesized via Web Audio!
export const playEngineRev = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  
  // Dual-oscillator engine roar
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';

  osc1.frequency.setValueAtTime(110, now);
  osc1.frequency.exponentialRampToValueAtTime(360, now + 0.35);
  osc1.frequency.exponentialRampToValueAtTime(260, now + 0.42);
  osc1.frequency.exponentialRampToValueAtTime(440, now + 0.7);

  osc2.frequency.setValueAtTime(55, now);
  osc2.frequency.exponentialRampToValueAtTime(180, now + 0.35);
  osc2.frequency.exponentialRampToValueAtTime(130, now + 0.42);
  osc2.frequency.exponentialRampToValueAtTime(220, now + 0.7);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(2800, now + 0.35);
  filter.frequency.exponentialRampToValueAtTime(1800, now + 0.42);
  filter.frequency.exponentialRampToValueAtTime(3400, now + 0.7);

  gain.gain.setValueAtTime(0.03, now);
  gain.gain.linearRampToValueAtTime(0.14, now + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.85);
  osc2.stop(now + 0.85);
};

// High-Adrenaline Crazy Launch Sound FX: Starter Crank, Twin-Turbo Spool, Tire Screech & Sonic Flyby!
export const playCrazyLaunchFX = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Starter Motor Crank
  const crankOsc = ctx.createOscillator();
  const crankGain = ctx.createGain();
  crankOsc.type = 'square';
  crankOsc.frequency.setValueAtTime(70, now);
  crankOsc.frequency.exponentialRampToValueAtTime(140, now + 0.3);
  crankGain.gain.setValueAtTime(0.06, now);
  crankGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
  crankOsc.connect(crankGain);
  crankGain.connect(ctx.destination);
  crankOsc.start(now);
  crankOsc.stop(now + 0.35);

  // 2. Twin-Turbo High Pitch Spool Whistle
  const turboOsc = ctx.createOscillator();
  const turboGain = ctx.createGain();
  turboOsc.type = 'sine';
  turboOsc.frequency.setValueAtTime(1200, now + 0.2);
  turboOsc.frequency.exponentialRampToValueAtTime(4800, now + 0.9);
  turboGain.gain.setValueAtTime(0.001, now + 0.2);
  turboGain.gain.linearRampToValueAtTime(0.08, now + 0.7);
  turboGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
  turboOsc.connect(turboGain);
  turboGain.connect(ctx.destination);
  turboOsc.start(now + 0.2);
  turboOsc.stop(now + 1.2);

  // 3. Brutal V6 Exhaust Ignition Roar + Flyby
  const roarOsc1 = ctx.createOscillator();
  const roarOsc2 = ctx.createOscillator();
  const roarFilter = ctx.createBiquadFilter();
  const roarGain = ctx.createGain();

  roarOsc1.type = 'sawtooth';
  roarOsc2.type = 'sawtooth';

  roarOsc1.frequency.setValueAtTime(90, now + 0.3);
  roarOsc1.frequency.exponentialRampToValueAtTime(540, now + 1.0);
  roarOsc1.frequency.exponentialRampToValueAtTime(180, now + 1.4);

  roarOsc2.frequency.setValueAtTime(45, now + 0.3);
  roarOsc2.frequency.exponentialRampToValueAtTime(270, now + 1.0);
  roarOsc2.frequency.exponentialRampToValueAtTime(90, now + 1.4);

  roarFilter.type = 'lowpass';
  roarFilter.frequency.setValueAtTime(250, now + 0.3);
  roarFilter.frequency.exponentialRampToValueAtTime(4500, now + 1.0);
  roarFilter.frequency.exponentialRampToValueAtTime(300, now + 1.5);

  roarGain.gain.setValueAtTime(0.01, now + 0.3);
  roarGain.gain.linearRampToValueAtTime(0.18, now + 0.95);
  roarGain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

  roarOsc1.connect(roarFilter);
  roarOsc2.connect(roarFilter);
  roarFilter.connect(roarGain);
  roarGain.connect(ctx.destination);

  roarOsc1.start(now + 0.3);
  roarOsc2.start(now + 0.3);
  roarOsc1.stop(now + 1.5);
  roarOsc2.stop(now + 1.5);
};
