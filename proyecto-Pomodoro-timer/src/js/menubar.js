import { timerModes } from "./timerState.js";
import { minutesElem, secondsElem } from "./timerDisplay.js";

const navContainer = document.querySelector(".timer-nav__list");

/**
 * Muestra los valores de tiempo correspondientes al modo actual en el temporizador.
 * @param {string} mode - Modo del temporizador ("pomodoro", "shortBreak", longBreak).
 */
function updateTimerDisplay(mode) {
  const { minutes, seconds } = timerModes[mode];
  minutesElem.textContent = minutes;
  secondsElem.textContent = seconds;
}

/**
 * Cambia el modo actual del temporizador y reinicia sus valores.
 * Evita hacer cambios si el temporizador ya está en el modo seleccionado.
 * @param {string} mode - Nuevo modo a aplicar.
 * @param {Object} timer - Instancia del temporizador con métodos reset() y setTime().
 */
export function changeMode(mode, timer) {
  // Si ya está en el modo seleccionado, no realiza ninguna acción
  if (
    minutesElem.textContent === timerModes[mode].minutes &&
    secondsElem.textContent === timerModes[mode].seconds
  )
    return;

  updateTimerDisplay(mode); // Actualiza visualmente los valores del temporizador

  // Reinicia el temporizador y configura los nuevos valores
  timer.reset(false);
  timer.setTime(timerModes[mode].minutes, timerModes[mode].seconds);
}

/**
 * Cambia visualmente el modo activo y emite un evento personalizado.
 * @param {MouseEvent} e - Evento de clic.
 */
function handleNavClick(e) {
  e.preventDefault();

  const li = e.target.closest(".timer-nav__item");
  const activeItem = navContainer.querySelector(".timer-nav__item--active");

  if (!li || !activeItem) return;

  // Actualiza las clases para reflejar el botón activo
  activeItem.classList.remove("timer-nav__item--active");
  li.classList.add("timer-nav__item--active");

  const mode = li.querySelector(".timer-nav__link")?.dataset.time;

  // Si se selecciona un modo válido, emite un evento global para cambiarlo
  if (mode)
    document.dispatchEvent(new CustomEvent("changeMode", { detail: mode }));
}

// Escucha los clics en la barra de navegación para cambiar de modo
navContainer.addEventListener("click", handleNavClick);
