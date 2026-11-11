// Luxury Minimal Audio Engine: Soft Ambient Intro + Tactile Haptic UI Touch Feedback
let audioCtx = null;
let isAudioMuted = false;
let realF1Audio = null;

// Starting Intro: Minimal, soft, distant engine sound (0.12 volume - never loud or harsh)
export const playRealF1EngineSound = (targetVolume = 0.12) => {
  if (isAudioMuted) return;
  try {
    if (!realF1Audio) {
      realF1Audio = new Audio('/f1-sound.ogg');
    }
    // Very gentle minimal volume
    realF1Audio.volume = targetVolume;
    realF1Audio.currentTime = 0;
    const playPromise = realF1Audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Silently ignore if autoplay is restricted
      });
    }
  } catch (err) {}
};

// Fade out intro sound smoothly
export const stopRealF1EngineSound = () => {
  if (realF1Audio && !realF1Audio.paused) {
    try {
      let v = realF1Audio.volume;
      const fadeInterval = setInterval(() => {
        v = Math.max(0, v - 0.03);
        if (realF1Audio) realF1Audio.volume = v;
        if (v <= 0) {
          clearInterval(fadeInterval);
          if (realF1Audio) {
            realF1Audio.pause();
            realF1Audio.currentTime = 0;
          }
        }
      }, 50);
    } catch (e) {
      realF1Audio.pause();
    }
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
    playTacticalClick();
  }
  return !isAudioMuted;
};

// =========================================================================
// PORTFOLIO TACTILE TOUCH SOUNDS (Apple Haptic / Tesla Touch Inspired)
// =========================================================================

// Ultra-subtle, minimal tactile switch click for buttons, links & taps
export const playTacticalClick = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  // Gentle, soft wooden/haptic micro-tap
  osc.type = 'sine';
  osc.frequency.setValueAtTime(640, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.03);

  gain.gain.setValueAtTime(0.025, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.03);
};

// Minimal, pleasant touch select sound for tabs, modals & project cards
export const playTouchSelect = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  [523.25, 783.99].forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + i * 0.03);

    gain.gain.setValueAtTime(0.02, now + i * 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.03 + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.03);
    osc.stop(now + i * 0.03 + 0.08);
  });
};

// Soft telemetry hotspot target lock chirp (minimal volume)
export const playTelemetryBlip = (freqOffset = 0) => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(700 + (freqOffset % 200), now);
  osc.frequency.exponentialRampToValueAtTime(950 + (freqOffset % 200), now + 0.04);

  gain.gain.setValueAtTime(0.015, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
};

// Minimal pit-to-car radio comms chirp
export const playRadioBeep = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(1200, now);
  osc.frequency.exponentialRampToValueAtTime(1600, now + 0.05);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
};

// Soft, pleasant engine throttle hum (quiet & minimal, never loud)
export const playEngineRev = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(95, now);
  osc.frequency.exponentialRampToValueAtTime(220, now + 0.25);
  osc.frequency.exponentialRampToValueAtTime(110, now + 0.55);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(350, now);
  filter.frequency.exponentialRampToValueAtTime(900, now + 0.25);
  filter.frequency.exponentialRampToValueAtTime(300, now + 0.55);

  gain.gain.setValueAtTime(0.01, now);
  gain.gain.linearRampToValueAtTime(0.035, now + 0.25);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.55);
};
