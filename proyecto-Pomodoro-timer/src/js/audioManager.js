/**
 * Clase que administra la reproducción de sonidos dentro de la aplicación.
 * Permite configurar el volumen y la fuente predeterminada del audio.
 */

class AudioManager {
  constructor({ volume = 1, defaultSrc = "sounds/sound.mp3" } = {}) {
    this.volume = volume;
    this.defaultSrc = defaultSrc;
  }

  get boundPlay() {
    if (!this._boundPlay) {
      this._boundPlay = this.play.bind(this);
    }
    return this._boundPlay;
  }

  play(src = this.defaultSrc) {
    const audio = new Audio(src);
    audio.volume = this.volume;

    audio.play().catch((err) => {
      console.warn(`No se pudo reproducir el audio ${src}:`, err);
    });
  }
}

const audioManager = new AudioManager();

export { audioManager };
