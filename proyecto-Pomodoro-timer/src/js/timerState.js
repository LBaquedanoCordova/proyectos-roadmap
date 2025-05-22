/**
 * Define los diferentes modos de temporizador disponibles en la app Pomodoro.
 * Cada modo tiene su duración en minutos y segundos, y una descripción.
 */
const timerModes = {
  pomodoro: { minutes: "25", seconds: "00", desc: "Pomodoro" },
  shortBreak: { minutes: "05", seconds: "00", desc: "Short Break" },
  longBreak: { minutes: "15", seconds: "00", desc: "Long Break" },
};

/**
 * Representa el estado actual del temporizador en ejecución.
 * Se utiliza para controlar y coordinar acciones como reproducir, pausar, reiniciar y cambiar de modo.
 */
const timerState = {
  hasPlayed: false,
  isPauseState: false,
  currentMode: timerModes.pomodoro.desc,
};

export { timerModes, timerState };
