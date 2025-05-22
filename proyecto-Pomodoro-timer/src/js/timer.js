export class Timer { 
  constructor(minutes, seconds, onUpdate, onFinishSound, resetControlButtons) {
    this.update = this.update.bind(this);
    this.totalSeconds = Number(minutes) * 60 + Number(seconds) || 0;
    this.remainingSeconds = this.totalSeconds;
    this.startTime = null;
    this.timerId = null;
    this.intervalId = null;
    this.isPaused = false;
    this.pausedAt = null;
    this.isRunning = false;
    this.onUpdate = onUpdate;
    this.onFinishSound = onFinishSound;
    this.resetControlButtons = resetControlButtons;
  }

  start() {
    if (this.timerId || this.intervalId) return;
    this.startTime = performance.now();
    this.isPaused = false;
    this.isRunning = true;
    this.remainingSeconds = this.totalSeconds;
    this.update();
  }

  update(currentTime = performance.now()) {
    if (this.isPaused || this.remainingSeconds <= 0) return;
  
    const elapsedTime = Math.floor((currentTime - this.startTime) / 1000);
    const newRemainingSeconds = Math.max(this.totalSeconds - elapsedTime, 0);
  
    if (newRemainingSeconds === this.remainingSeconds) {
      this.timerId = requestAnimationFrame(this.update);
      return;
    }
  
    this.remainingSeconds = newRemainingSeconds;
  
    if (this.onUpdate) {
      this.onUpdate(Math.floor(this.remainingSeconds / 60), this.remainingSeconds % 60);
    }
  
    if (this.remainingSeconds > 0) {
      this.timerId = requestAnimationFrame(this.update);
    } else {
      this.timerId = null;
      this.isRunning = false;
      if (this.resetControlButtons) this.resetControlButtons(true, false, false);
      if (this.onFinishSound) this.onFinishSound();
    }
  }

  handleVisibilityChange() {
    if (!this.totalSeconds) return;

    if (document.hidden) {
      if (this.isRunning && !this.isPaused) {
        cancelAnimationFrame(this.timerId);
        this.timerId = null;
        this.intervalId = setInterval(() => {
          this.remainingSeconds--;
          if (this.remainingSeconds <= 0) {
            if (this.resetControlButtons) this.resetControlButtons(true, false, false);
            if (this.onFinishSound) this.onFinishSound();
            clearInterval(this.intervalId);
            this.intervalId = null;
            this.isRunning = false;
          }
          if (this.onUpdate) {
            this.onUpdate(Math.floor(this.remainingSeconds / 60), this.remainingSeconds % 60);
          }
        }, 1000);
      }
    } else {
      if (this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
        this.startTime = performance.now() - (this.totalSeconds - this.remainingSeconds) * 1000;
        this.update();
      }
    }
  }

  pause() {
    if (this.timerId) {
      cancelAnimationFrame(this.timerId);
      this.timerId = null;
      this.isPaused = true;
      this.isRunning = false;
      this.pausedAt = performance.now();
    }
  }

  resume() {
    if (!this.isPaused) return;
    const pauseDuration = performance.now() - this.pausedAt;
    this.startTime += pauseDuration;
    this.isPaused = false;
    this.isRunning = true;
    this.update(performance.now());
  }

  reset(updateUI = true) {
    if (this.startTime === null) return;

    cancelAnimationFrame(this.timerId);
    this.timerId = null;
    this.intervalId = null;
    this.startTime = null;
    this.remainingSeconds = this.totalSeconds;
    this.isPaused = false;
    this.isRunning = false;

    if (updateUI && this.onUpdate) {
      this.onUpdate(Math.floor(this.remainingSeconds / 60), this.remainingSeconds % 60);
    }
  }

  setTime(minutes, seconds) {
    const newTotalSeconds = Number(minutes) * 60 + Number(seconds);
    if (newTotalSeconds === this.totalSeconds) return; // Evitar cambios innecesarios

    this.totalSeconds = newTotalSeconds;
    this.remainingSeconds = this.totalSeconds;
    this.startTime = null;
    this.timerId = null;
    this.isPaused = false;
    this.isRunning = false;

    if (this.onUpdate) this.onUpdate(minutes, seconds);

  }

  addTime(minutes) {
    if (!this.totalSeconds) return;
    const extraSeconds = Math.round(minutes * 60);
    this.totalSeconds += extraSeconds;
    this.remainingSeconds += extraSeconds;

    if (!this.isRunning) {
      if (this.onUpdate) {
        this.onUpdate(Math.floor(this.remainingSeconds / 60), this.remainingSeconds % 60);
      }
    }
  }
}
