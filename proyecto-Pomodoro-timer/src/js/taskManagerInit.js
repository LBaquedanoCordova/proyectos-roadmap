import { setupTaskPopupEvents } from "./addTaskPopupEvents.js";
import { setupTaskManager } from "./taskManagerActions.js";
import { loadAndRenderTasks } from "./loadTask.js";

/**
 * Inicializa la gestión de tareas configurando:
 * - los eventos para el popup de agregar tareas,
 * - los manejadores principales de tareas,
 * - y carga/renderiza las tareas existentes.
 */
function setupTask() {
    setupTaskPopupEvents();
    setupTaskManager();
    document.addEventListener('DOMContentLoaded', loadAndRenderTasks);
}

export { setupTask };