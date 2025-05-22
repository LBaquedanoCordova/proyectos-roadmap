import { openPopup, closePopup } from "./popupUtils.js";

const popupTask = document.querySelector(".popup--add-task");
const taskInput = popupTask.querySelector("#task-input");

/**
 * Abre el popup para agregar una nueva tarea.
 * Se enfoca automáticamente el input al abrir.
 */
function openPopupTask() {
  openPopup(popupTask, taskInput);
}

/**
 * Cierra el popup para agregar una nueva tarea.
 * También se asegura de limpiar el valor del input.
 */
function closePopupTask() {
  closePopup(popupTask, taskInput);
}

export { popupTask, taskInput, openPopupTask, closePopupTask };
