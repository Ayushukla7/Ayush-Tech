// Web Audio API & HTML5 Audio Engine for Real Authentic F1 Racing Car Sounds
let audioCtx = null;
let isAudioMuted = false;
let realF1Audio = null;

export const playRealF1EngineSound = () => {
  try {
    if (!realF1Audio) {
      realF1Audio = new Audio('/f1-sound.ogg');
      realF1Audio.volume = 0.85;
    }
    realF1Audio.currentTime = 0;
    const playPromise = realF1Audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to synthesized engine rev if browser autoplay blocked
        playEngineRev();
      });
    }
  } catch (err) {
    playEngineRev();
  }
};

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
  if (realF1Audio) realF1Audio.muted = muted;
  return isAudioMuted;
};

export const toggleAudio = () => {
  isAudioMuted = !isAudioMuted;
  if (realF1Audio) realF1Audio.muted = isAudioMuted;
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

// High-Adrenaline F1 Throttle Acceleration Roar
export const playEngineRev = () => {
  // If real audio file is loaded, play it
  if (realF1Audio) {
    try {
      realF1Audio.currentTime = 0;
      realF1Audio.play().catch(() => {});
      return;
    } catch (e) {}
  }

  // Synthesizer fallback
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'triangle';

  osc1.frequency.setValueAtTime(110, now);
  osc1.frequency.exponentialRampToValueAtTime(380, now + 0.35);
  osc1.frequency.exponentialRampToValueAtTime(260, now + 0.42);
  osc1.frequency.exponentialRampToValueAtTime(460, now + 0.7);

  osc2.frequency.setValueAtTime(55, now);
  osc2.frequency.exponentialRampToValueAtTime(190, now + 0.35);
  osc2.frequency.exponentialRampToValueAtTime(130, now + 0.42);
  osc2.frequency.exponentialRampToValueAtTime(230, now + 0.7);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(400, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + 0.35);
  filter.frequency.exponentialRampToValueAtTime(1900, now + 0.42);
  filter.frequency.exponentialRampToValueAtTime(3800, now + 0.7);

  gain.gain.setValueAtTime(0.03, now);
  gain.gain.linearRampToValueAtTime(0.15, now + 0.35);
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
