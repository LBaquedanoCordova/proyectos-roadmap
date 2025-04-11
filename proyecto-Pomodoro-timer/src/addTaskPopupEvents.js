import { handleTaskAction } from "./popupTaskValidation.js";
import { popupTask, taskInput } from "./popupTask.js";

function setupTaskPopupEvents() {
  // Agrega un evento click al popup para manejar acciones de confirmar o cancelar
  popupTask.addEventListener("click", (e) => {
    // Busca si el clic fue en uno de los botones específicos
    const clickedButton = e.target.closest(
      "#addTaskPopup-confirm-btn, #addTaskPopup-close-btn"
    );

    // Si no es un botón relevante, termina la ejecución
    if (!clickedButton) return;

    // Determina la acción a realizar: confirmar si el input tiene texto, de lo contrario cerrar
    const actionType =
      clickedButton.id === "addTaskPopup-confirm-btn" && taskInput.value.trim()
        ? "confirm"
        : "close";
    handleTaskAction(actionType);
  });

  // Agrega un evento keydown para detectar teclas Enter o Escape
  popupTask.addEventListener("keydown", (e) => {
    // Comprueba si se presionó Enter o Escape
    if (e.key === "Enter" || e.key === "Escape") {
      // Determina la acción en base a la tecla presionada y si el input tiene texto
      const actionType =
        e.key === "Enter" && taskInput.value.trim() ? "confirm" : "close";
      handleTaskAction(actionType);
    }
  });
}

export { setupTaskPopupEvents };
