// High-Performance Audio Engine: Authentic F1 V8/V6 Sounds + Tactile Haptic UI Feedback
let audioCtx = null;
let isAudioMuted = false;
let realF1Audio = null;
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

// Starting Intro: Authentic F1 engine sound (gentle minimal volume 0.12)
export const playRealF1EngineSound = (targetVolume = 0.12) => {
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
        .catch((err) => {
          // Browser Autoplay blocked: will automatically resume on first user tap/click
          console.log('Autoplay waiting for user gesture (standard browser policy)');
          // Web Audio fallback if needed
        });
    }
  } catch (err) {
    console.warn('Real F1 sound init error:', err);
  }
};

// Launch Roar: Played when user clicks "CLICK TO OPEN PORTFOLIO" as car accelerates off screen!
export const playF1LaunchRoar = () => {
  if (isAudioMuted) return;
  
  // If HTML5 audio is available, ramp it up as the car speeds off!
  if (realF1Audio) {
    try {
      realF1Audio.volume = Math.min(0.35, realF1Audio.volume + 0.2);
      realF1Audio.play().catch(() => {});
      
      // Smoothly fade out as the car leaves the screen and hero appears
      setTimeout(() => {
        stopRealF1EngineSound();
      }, 700);
    } catch (e) {}
  }

  // Also fire Web Audio API acceleration rev for visceral punch
  playEngineRev();
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
  return isAudioMuted;
};

export const toggleAudio = () => {
  isAudioMuted = !isAudioMuted;
  if (realF1Audio) {
    realF1Audio.muted = isAudioMuted;
    if (!isAudioMuted && realF1Audio.paused) {
      realF1Audio.play().catch(() => {});
    }
  }
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
  osc.frequency.setValueAtTime(1400, now);
  osc.frequency.setValueAtTime(900, now + 0.04);

  gain.gain.setValueAtTime(0.02, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.08);
};

// F1 Engine Throttle Rev for the "REV ENGINE" button in Hero
export const playEngineRev = () => {
  if (isAudioMuted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc1 = ctx.createOscillator();
  const osc2 = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();

  osc1.type = 'sawtooth';
  osc2.type = 'sawtooth';

  // F1 V6 hybrid engine RPM pitch climb: 120Hz idle -> 480Hz rev peak -> 160Hz
  osc1.frequency.setValueAtTime(130, now);
  osc1.frequency.exponentialRampToValueAtTime(460, now + 0.35);
  osc1.frequency.exponentialRampToValueAtTime(140, now + 1.1);

  osc2.frequency.setValueAtTime(133, now);
  osc2.frequency.exponentialRampToValueAtTime(468, now + 0.35);
  osc2.frequency.exponentialRampToValueAtTime(143, now + 1.1);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(800, now);
  filter.frequency.exponentialRampToValueAtTime(2600, now + 0.35);
  filter.frequency.exponentialRampToValueAtTime(700, now + 1.1);

  gain.gain.setValueAtTime(0.03, now);
  gain.gain.exponentialRampToValueAtTime(0.12, now + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 1.1);
  osc2.stop(now + 1.1);
};
