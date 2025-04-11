// import { closePopup, popupTask, taskInput } from "./popupTask.js";
import { closePopupTask, popupTask, taskInput } from "./popupTask.js";
import { taskManager } from "./taskManagerActions.js";
import { addTask } from "./tasks.js";

let hasAttemptedConfirm = false; // Rastrea si el usuario intentó confirmar una tarea

// Verifica si el valor es válido (mínimo 3 caracteres)
function isValid(value) {
    return value.length >= 3;
}

// Muestra u oculta el mensaje de error
function toggleErrorMessage(show) {
    const errorMessage = popupTask.querySelector('.popup__error-message');
    // errorMessage.classList.toggle('show', show);
    errorMessage.classList.toggle('popup__error-message--show', show);
    
}

// Maneja el evento input para validar en tiempo real después de un intento fallido
taskInput.addEventListener('input', (e) => {
  if (!hasAttemptedConfirm) return; // Solo muestra error si ya hubo un intento de confirmar
  toggleErrorMessage(!isValid(e.target.value));
});


// Maneja las acciones de confirmar o cerrar
function handleTaskAction(actionType) {
    const value = taskInput.value.trim();
    const isValueValid = isValid(value);
  
    if (actionType === "confirm") {
      hasAttemptedConfirm = true; // Marca que se intentó confirmar

      if (isValueValid) {
        // Agrega la tarea y cierra el popup si el valor es válido
        // const messageElement = taskManager.querySelector(".message");
        const messageElement = taskManager.querySelector(".task-manager__message");
        if (messageElement) messageElement.remove();

        addTask(value);
        closePopupTask();
        hasAttemptedConfirm = false; // Reinicia el estado después de éxito
      } else {
        toggleErrorMessage(true); // Muestra mensaje de error
      }
    }
  
    if (actionType === "close") {
      // Oculta el mensaje de error y cierra el popup
      toggleErrorMessage(false);
      hasAttemptedConfirm = false;
      closePopupTask();
    }
}

export { handleTaskAction }