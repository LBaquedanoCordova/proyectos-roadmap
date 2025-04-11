import { setupControls } from "./timerControls.js";
import { timerModes, timerState } from "./timerState.js";
import { timer } from "./timerDisplay.js";
import { setupAdjustTime } from "./adjust-time.js";
import { setupTask } from "./taskManagerInit.js";

function initApp() {
  setupControls(timer, timerState, timerModes);
  setupAdjustTime(timer);
  setupTask(); 
}

initApp();
