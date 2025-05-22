import { handleTaskAction } from "./popupTaskValidation.js";
import { popupTask, taskInput } from "./popupTask.js";

/**
 * Configura los eventos del popup para agregar tareas.
 * Maneja confirmaciones y cierres tanto por clic como por teclado.
 */
function setupTaskPopupEvents() {
  popupTask.addEventListener("click", (e) => {
    const clickedButton = e.target.closest(
      "#addTaskPopup-confirm-btn, #addTaskPopup-close-btn"
    );
    if (!clickedButton) return;

    // Define la acción: 'confirm' si hay texto, de lo contrario 'close'
    const actionType =
      clickedButton.id === "addTaskPopup-confirm-btn" && taskInput.value.trim()
        ? "confirm"
        : "close";

    handleTaskAction(actionType);
  });

  popupTask.addEventListener("keydown", (e) => {
    // Si se presiona Enter o Escape, decide la acción correspondiente
    if (e.key === "Enter" || e.key === "Escape") {
      const actionType =
        e.key === "Enter" && taskInput.value.trim() ? "confirm" : "close";

      handleTaskAction(actionType);
    }
  });
}

export { setupTaskPopupEvents };
