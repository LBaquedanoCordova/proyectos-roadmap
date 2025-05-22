import { setupControls } from "./timerControls.js";
import { timerModes, timerState } from "./timerState.js";
import { timer } from "./timerDisplay.js";
import { setupAdjustTime } from "./adjust-time.js";
import { setupTask } from "./taskManagerInit.js";

/**
 * Inicializa la aplicación configurando:
 * - los controles del temporizador,
 * - la opción de ajustar tiempo manualmente,
 * - y el sistema de tareas.
 */
function initApp() {
  setupControls(timer, timerState, timerModes);
  setupAdjustTime(timer);
  setupTask();
}

initApp();
