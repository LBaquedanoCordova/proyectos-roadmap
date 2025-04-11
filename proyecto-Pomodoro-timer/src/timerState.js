const timerModes = {
  pomodoro: { minutes: "25", seconds: "00", desc: "Pomodoro" },
  shortBreak: { minutes: "05", seconds: "00", desc: "Short Break" },
  longBreak: { minutes: "15", seconds: "00", desc: "Long Break" },
};

const timerState = {
  hasPlayed: false,     // Indica si el temporizador ha comenzado al menos una vez
  isPauseState: false,  // Controla si el temporizador está en estado de pausa
  currentMode: timerModes.pomodoro.desc, // Modo actual del temporizador
};

export {timerModes, timerState};