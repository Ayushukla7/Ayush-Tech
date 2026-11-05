// Web Audio API Synthesizer for Futuristic HUD & Cinematic Satellite Telemetry
let audioCtx = null;
let isAudioMuted = true; // default muted for accessible user experience

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
    playSonarPing();
  }
  return !isAudioMuted;
};

// Tactical UI click sound
export const playTacticalClick = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(880, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start();
  osc.stop(ctx.currentTime + 0.04);
};

// Target lock-on radar chime
export const playSonarPing = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [659.25, 987.77].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.05);

    gain.gain.setValueAtTime(0.09, now + i * 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.05);
    osc.stop(now + i * 0.05 + 0.28);
  });
};

// Hypersonic satellite dive atmospheric whoosh
export const playDiveWhoosh = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(120, now);
  osc.frequency.exponentialRampToValueAtTime(950, now + 0.45);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.9);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(300, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + 0.45);
  filter.frequency.exponentialRampToValueAtTime(250, now + 0.9);

  gain.gain.setValueAtTime(0.005, now);
  gain.gain.linearRampToValueAtTime(0.12, now + 0.4);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.95);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.95);
};

// Typewriter / terminal feedback
export const playKeyTone = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'square';
  osc.frequency.setValueAtTime(1400 + Math.random() * 300, now);

  gain.gain.setValueAtTime(0.015, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.02);
};
