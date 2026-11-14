// Authentic High-Performance Audio Engine: Real Racing Accelerator Audio & Tactile Haptic UI Feedback
let audioCtx = null;
let isAudioMuted = false;
let realF1Audio = null;
let acceleratorAudio = null;
let audioUnlocked = false;

// Initialize or resume Web Audio Context on user gesture
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

// Global gesture unlocker to bypass browser autoplay restrictions
export const unlockAudio = () => {
  if (audioUnlocked) return;
  audioUnlocked = true;
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    ctx.resume();
  }
  if (realF1Audio && realF1Audio.paused && !isAudioMuted) {
    realF1Audio.play().catch(() => {});
  }
};

// Listen for first user interaction anywhere on the window
if (typeof window !== 'undefined') {
  const onFirstInteraction = () => {
    unlockAudio();
    ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
      window.removeEventListener(evt, onFirstInteraction);
    });
  };
  ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
    window.addEventListener(evt, onFirstInteraction, { once: true, passive: true });
  });
}

// Starting Intro: Authentic F1 engine sound (gentle minimal volume 0.22)
export const playRealF1EngineSound = (targetVolume = 0.22) => {
  if (isAudioMuted) return;
  try {
    if (!realF1Audio) {
      realF1Audio = new Audio('/f1-sound.ogg');
      realF1Audio.loop = true;
    }
    realF1Audio.volume = targetVolume;
    
    const playPromise = realF1Audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          audioUnlocked = true;
        })
        .catch(() => {});
    }
  } catch (err) {}
};

// Real F1 Accelerator / Throttle Rev Audio (Williams-Renault V10 authentic accelerator sound)
export const playEngineRev = () => {
  if (isAudioMuted) return;
  try {
    if (!acceleratorAudio) {
      acceleratorAudio = new Audio('/f1-v10-rev.ogg');
    }
    acceleratorAudio.currentTime = 0;
    acceleratorAudio.volume = 0.40;
    const playPromise = acceleratorAudio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Fallback to synthesized accelerator rumble if file play is interrupted
        playSynthesizedAccelerator();
      });
    }
  } catch (err) {
    playSynthesizedAccelerator();
  }
};

// Launch Roar: Played when F1 car accelerates and moves out
export const playF1LaunchRoar = () => {
  playEngineRev();
};

// Procedural fallback for accelerator rev in case audio file is delayed
const playSynthesizedAccelerator = () => {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';

  // F1 accelerator throttle profile
  osc1.frequency.setValueAtTime(140, now);
  osc1.frequency.exponentialRampToValueAtTime(540, now + 0.35);
  osc1.frequency.exponentialRampToValueAtTime(160, now + 1.2);

  osc2.frequency.setValueAtTime(143, now);
  osc2.frequency.exponentialRampToValueAtTime(548, now + 0.35);
  osc2.frequency.exponentialRampToValueAtTime(163, now + 1.2);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(900, now);
  filter.frequency.exponentialRampToValueAtTime(3200, now + 0.35);
  filter.frequency.exponentialRampToValueAtTime(800, now + 1.2);

  gain.gain.setValueAtTime(0.04, now);
  gain.gain.exponentialRampToValueAtTime(0.18, now + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 1.2);
  osc2.stop(now + 1.2);
};

// Fade out intro sound smoothly
export const stopRealF1EngineSound = () => {
  if (realF1Audio && !realF1Audio.paused) {
    try {
      let v = realF1Audio.volume;
      const fadeInterval = setInterval(() => {
        v = Math.max(0, v - 0.04);
        if (realF1Audio) realF1Audio.volume = v;
        if (v <= 0) {
          clearInterval(fadeInterval);
          if (realF1Audio) {
            realF1Audio.pause();
            realF1Audio.currentTime = 0;
          }
        }
      }, 40);
    } catch (e) {
      if (realF1Audio) realF1Audio.pause();
    }
  }
};

export const isMuted = () => isAudioMuted;

export const setMuted = (muted) => {
  isAudioMuted = muted;
  if (realF1Audio) realF1Audio.muted = muted;
  if (acceleratorAudio) acceleratorAudio.muted = muted;
  return isAudioMuted;
};

export const toggleAudio = () => {
  isAudioMuted = !isAudioMuted;
  if (realF1Audio) realF1Audio.muted = isAudioMuted;
  if (acceleratorAudio) acceleratorAudio.muted = isAudioMuted;
  if (!isAudioMuted) {
    playTacticalClick();
  }
  return !isAudioMuted;
};

// =========================================================================
// PORTFOLIO TACTILE TOUCH SOUNDS (Subtle Haptic Feedback)
// =========================================================================

// Ultra-subtle, minimal tactile switch click for buttons, links & taps
export const playTacticalClick = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(640, now);
  osc.frequency.exponentialRampToValueAtTime(180, now + 0.03);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.03);
};

// Minimal touch select sound for tabs and cards
export const playTouchSelect = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(580, now);
  osc.frequency.exponentialRampToValueAtTime(780, now + 0.04);

  gain.gain.setValueAtTime(0.015, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.04);
};

export const playTelemetryBlip = () => {
  playTouchSelect();
};

export const playRadioBeep = () => {
  playTacticalClick();
};
