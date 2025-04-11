import { timerState } from "./timerState.js";
import { Timer } from "./timer.js";

const timerDisplay = document.querySelector(".timer");

function updateTimerDisplay (minutes, seconds) {
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
  
    // Actualiza el tiempo en la UI
    timerDisplay.firstElementChild.textContent = formattedMinutes;
    timerDisplay.lastElementChild.textContent = formattedSeconds;

    // Actualiza el título del documento
    document.title = `${formattedMinutes}:${formattedSeconds}-${timerState.currentMode}`;

};

const timer = new Timer(
  timerDisplay.firstElementChild.textContent.padStart(2, "0"),
  timerDisplay.lastElementChild.textContent.padStart(2, "0"),
  updateTimerDisplay
);

export {timerDisplay, timer};