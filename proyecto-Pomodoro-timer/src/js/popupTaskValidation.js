import { closePopupTask, popupTask, taskInput } from "./popupTask.js";
import {
  spanDate,
  editTextContent,
  taskManagerTitle,
} from "./taskManagerActions.js";
import { addTask, tasks } from "./tasks.js";
import { setTaskTracker, getIdTask } from "./taskTracker.js";

// Estado interno del flujo de creación de tareas
let hasAttemptedConfirm = false; // Rastrea si el usuario intentó confirmar una tarea
let idTask = 0; // Contador base para generar el ID de la nueva tarea

/**
 * Verifica si el valor ingresado es válido (mínimo 3 caracteres).
 * @param {string} value - Valor a validar.
 * @returns {boolean} - Retorna true si es válido.
 */
function isValid(value) {
  return value.length >= 3;
}

/**
 * Muestra u oculta el mensaje de error debajo del input.
 * @param {boolean} show - Si es true, se muestra el mensaje. Si es false, se oculta.
 */
function toggleErrorMessage(show) {
  const errorMessage = popupTask.querySelector(".popup__error-message");
  errorMessage.classList.toggle("popup__error-message--show", show);
}

// Escucha cambios en el input solo después de haber intentado confirmar
taskInput.addEventListener("input", (e) => {
  if (!hasAttemptedConfirm) return; // Solo muestra error si ya hubo un intento de confirmar
  toggleErrorMessage(!isValid(e.target.value));
});

/**
 * Maneja la lógica al confirmar o cerrar el popup de tareas.
 * @param {"confirm"|"close"} actionType - Tipo de acción disparada desde el popup.
 */
function handleTaskAction(actionType) {
  const value = taskInput.value.trim();
  const isValueValid = isValid(value);

  if (actionType === "confirm") {
    hasAttemptedConfirm = true;

    if (isValueValid) {
      // Si es la primera tarea agregada, cambia el título a "All Tasks"
      if (tasks.length === 0) editTextContent(spanDate, "All Tasks");

      // Genera un nuevo ID para la tarea
      const newTaskId = getIdTask(idTask);

      tasks.push({
        id: newTaskId,
        description: value,
        status: "pending",
        createdDate: new Date(),
      });

      // Refleja la tarea visualmente en la UI
      addTask(value, "pending", newTaskId);

      // Actualiza el título principal del Task Manager
      editTextContent(taskManagerTitle, "Pending tasks for this day");

      // Actualiza el almacenamiento de tareas
      setTaskTracker(tasks);

      // Cierra el popup y reinicia estado
      closePopupTask();
      hasAttemptedConfirm = false;
    } else {
      // Muestra el mensaje de error si la entrada es inválida
      toggleErrorMessage(true);
    }
  }

  if (actionType === "close") {
    // Cierra el popup y limpia el estado
    toggleErrorMessage(false);
    hasAttemptedConfirm = false;
    closePopupTask();
  }
}

export { handleTaskAction };
