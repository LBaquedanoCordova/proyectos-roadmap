import { changeMode } from "./menubar.js";

const controls = document.querySelector(".pomodoro-app__controls");
const btnPlay = controls.querySelector("#btn-play");
const btnPause = controls.querySelector("#btn-pause");
const btnReset = controls.querySelector("#btn-reset");

/**
 * Alterna la visibilidad de los botones del temporizador según el estado actual.
 *
 * @param {boolean} play - Indica si el botón de "play" debe mostrarse.
 * @param {boolean} pause - Indica si el botón de "pause" debe mostrarse.
 * @param {boolean} reset - Indica si el botón de "reset" debe mostrarse.
 */
function toggleButtons(play, pause, reset) {
  btnPlay.classList.toggle("pomodoro-app__btn--play--hidden", !play);
  btnPause.classList.toggle("pomodoro-app__btn--pause", !pause);
  btnReset.classList.toggle("pomodoro-app__btn--reset", !reset);
}

/**
 * Actualiza el botón de pausa para mostrar su nuevo estado ("pause" o "resume").
 *
 * @param {string} state - El nuevo estado del botón ("pause" o "resume").
 */
function updatePauseButton(state) {
  btnPause.innerHTML = `<span class="material-symbols-outlined">${state}</span>`;
  btnPause.dataset.action = state;
}

/**
 * Configura los controles del temporizador y sus respectivos eventos.
 *
 * @param {Object} timer - Objeto que contiene los métodos del temporizador (start, pause, resume, reset).
 * @param {Object} timerState - Estado del temporizador (si ha comenzado, si está en pausa y el modo actual).
 * @param {Object} timerModes - Modos disponibles del temporizador (pomodoro, shortBreak y longBreak).
 */
function setupControls(timer, timerState, timerModes) {
  controls.addEventListener("click", (e) => {
    const button = e.target.closest(".pomodoro-app__btn");
    const action = button?.dataset.action;

    if (!button || !action) return;

    switch (action) {
      case "play":
        toggleButtons(false, true, true); // Oculta "Play" y muestra "Pause" y "Reset"
        timerState.hasPlayed = true; // Marca que el temporizador ya ha iniciado al menos una vez
        timer.start(); // Inicia el temporizador
        break;

      case "pause":
        updatePauseButton("resume"); // Cambia el botón a "Resume"
        timerState.isPauseState = true;
        timer.pause(); // Pausa el temporizador
        break;

      case "resume":
        updatePauseButton("pause"); // Cambia el botón a "Pause"
        timerState.isPauseState = false;
        timer.resume(); // Reanuda el temporizador
        break;

      case "reset":
        if (timerState.isPauseState) updatePauseButton("pause"); // Si estaba en pausa, lo pone en modo "Pause"
        toggleButtons(true, false, false); // Muestra "Play" y oculta "Pause" y "Reset"
        timerState.hasPlayed = false; // Restablece el estado del temporizador
        timer.reset(); // Reinicia el temporizador
        break;
    }
  });

  document.addEventListener("changeMode", (e) => {
    if (timerState.isPauseState) updatePauseButton("pause"); // Asegura que el botón de pausa tenga el estado correcto
    if (timerState.hasPlayed) toggleButtons(true, false, false); // Restablece los botones a su estado inicial

    timerState.currentMode = timerModes[e.detail]?.desc; // Actualiza el modo actual del temporizador
    changeMode(e.detail, timer); // Llama a changeMode para actualizar la pantalla y los valores del temporizador
  });
}

export { toggleButtons, setupControls };
