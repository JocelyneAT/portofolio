/**
 * Desk Audio Engine
 * High-quality zero-dependency Web Audio API synthesizer for cute interactive sounds
 */
class DeskAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('desk_muted') === 'true';
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      this.ctx = new AudioContextClass();
    }
  }

  ensureContext() {
    if (!this.ctx) this.initAudioContext();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('desk_muted', this.isMuted);
    return this.isMuted;
  }

  setMute(mute) {
    this.isMuted = !!mute;
    localStorage.setItem('desk_muted', this.isMuted);
  }

  /** Cute bouncy bubble pop sound (used on object hover / bubble pop) */
  playPop(frequency = 580) {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      // Playful cartoon pitch envelope
      osc.frequency.setValueAtTime(frequency * 0.75, now);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.6, now + 0.04);
      osc.frequency.exponentialRampToValueAtTime(frequency * 0.95, now + 0.09);

      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /** Play soft hover bubble pop */
  playHover() {
    this.playPop(640);
  }

  /** Satisfying cute tactile button click */
  playClick() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      osc.frequency.exponentialRampToValueAtTime(320, now + 0.05);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.07);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /** Cheerful ascending 3-tone chime when clicking an object to navigate */
  playNavChime() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 (Bright cute chord)
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.055;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.2, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.32);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.33);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  /** Sparkly high twinkle sound */
  playSparkle() {
    if (this.isMuted) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const notes = [1200, 1500, 1800, 2200];
      const now = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const start = now + idx * 0.04;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.12, start);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.18);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(start);
        osc.stop(start + 0.19);
      });
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }
}

window.deskAudio = new DeskAudio();

