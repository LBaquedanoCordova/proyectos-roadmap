import { setupTaskManager } from "./taskManagerActions.js";
import { setupTaskPopupEvents } from "./addTaskPopupEvents.js";

function setupTask() {
    setupTaskManager();
    setupTaskPopupEvents();
}

export { setupTask };