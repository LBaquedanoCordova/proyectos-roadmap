import { changeMode } from "./menubar.js";

const controls = document.querySelector(".controls");
const btnPlay = controls.querySelector("#btn-play");
const btnPause = controls.querySelector("#btn-pause");
const btnReset = controls.querySelector("#btn-reset");

// Alterna la visibilidad de los botones según el estado del temporizador
function toggleButtons (play, pause, reset) {
    btnPlay.classList.toggle("btn-play-hidden", !play);
    btnPause.classList.toggle("btn-pause", !pause);
    btnReset.classList.toggle("btn-reset", !reset);
};

// Actualiza el botón de pausa entre "pausa" y "reanudar"
function updatePauseButton(state) {
    btnPause.innerHTML = `<span class="material-symbols-outlined">${state}</span>`;
    btnPause.dataset.action = state;
};


function setupControls(timer, timerState, timerModes) {
  // let {hasPlayed, isPauseState, currentMode} = timerState;
  let {hasPlayed, isPauseState} = timerState;
  // Agrega un evento de escucha a los controles del temporizador
  controls.addEventListener("click", (e) => {
    //? mejorar la busqueda del button, que no sea por elemento, si no por selector
    const button = e.target.closest("button");
    const action = button?.dataset.action;

    if (!button || !action) return; // Si no es un botón válido, sale de la función

    switch (action) {
      case "play":
        toggleButtons(false, true, true); // Oculta "Play" y muestra "Pause" y "Reset"
        hasPlayed = true; // Marca que el temporizador ya ha iniciado al menos una vez
        timer.start(); // Inicia el temporizador
        break;

      case "pause":
        updatePauseButton("resume"); // Cambia el botón a "Resume"
        isPauseState = true;
        timer.pause(); // Pausa el temporizador
        break;

      case "resume":
        updatePauseButton("pause"); // Cambia el botón a "Pause"
        isPauseState = false;
        timer.resume(); // Reanuda el temporizador
        break;

      case "reset":
        if (isPauseState) updatePauseButton("pause"); // Si estaba en pausa, lo pone en modo "Pause"
        toggleButtons(true, false, false); // Muestra "Play" y oculta "Pause" y "Reset"
        hasPlayed = false; // Restablece el estado del temporizador
        timer.reset(); // Reinicia el temporizador
        break;
    }
  });

  // Escucha el evento personalizado "changeMode" para cambiar el modo del temporizador
  document.addEventListener("changeMode", (e) => {
    if (isPauseState) updatePauseButton("pause"); // Asegura que el botón de pausa tenga el estado correcto
    if (hasPlayed) toggleButtons(true, false, false);// Restablece los botones a su estado inicial

    timerState.currentMode = timerModes[e.detail]?.desc; // Actualiza el modo actual del temporizador
    changeMode(e.detail, timer); // Llama a changeMode para actualizar la pantalla y los valores del temporizador
  });
}


export {setupControls};