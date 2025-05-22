import { timerState } from "./timerState.js";
import { Timer } from "./timer.js";
import { audioManager } from "./audioManager.js";
import { toggleButtons } from "./timerControls.js";

const timerDisplay = document.querySelector(".pomodoro-app__timer");
const minutesElem = timerDisplay.querySelector('.pomodoro-app__time--minutes');
const secondsElem = timerDisplay.querySelector('.pomodoro-app__time--seconds');

/**
 * Actualiza visualmente el temporizador en pantalla y el título del documento.
 *
 * @param {number} minutes - Minutos actuales del temporizador.
 * @param {number} seconds - Segundos actuales del temporizador.
 */
function updateTimerDisplay(minutes, seconds) {
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  // Refresca los valores en el DOM
  minutesElem.textContent = formattedMinutes;
  secondsElem.textContent = formattedSeconds;

  // Actualiza el título del documento para reflejar el tiempo y el modo actual
  document.title = `${formattedMinutes}:${formattedSeconds} - ${timerState.currentMode}`;
}

/**
 * Instancia del temporizador principal de la aplicación Pomodoro.
 * Se inicializa con los valores actuales del DOM y dependencias necesarias.
 */
const timer = new Timer(
  minutesElem.textContent.padStart(2, "0"),
  secondsElem.textContent.padStart(2, "0"),
  updateTimerDisplay,
  audioManager.boundPlay,
  toggleButtons
);

/**
 * Controla el comportamiento del temporizador cuando el usuario cambia de pestaña.
 * Pausa o reanuda el temporizador si es necesario.
 */
document.addEventListener("visibilitychange", () => timer.handleVisibilityChange());

export { minutesElem, secondsElem, timer };
