import { tasks } from "./tasks.js";

/**
 * Crea un mensaje indicando que no hay tareas.
 * @returns {HTMLElement} Elemento <li> con el mensaje.
 */

function createMessage(textMessage = "No tasks for this day") {
  const message = document.createElement("li");
  // message.className = "message";
  message.className = "task-manager__message"
  message.textContent = textMessage;
  return message;
}

/**
 * Elimina una tarea de la lista y del array de tareas.
 * @param {HTMLElement} target - Elemento que activó la eliminación.
 * @param {HTMLElement} taskList - Contenedor de la lista de tareas.
 */

function deleteTask(target, taskList, buttonPending, manageEmptyMessage) {
  const taskItem = target.closest(".task-manager__list-item");

  const taskListItems = [...taskList.children];
  const index = taskListItems.indexOf(taskItem);

  if (index !== -1) tasks.splice(index, 1);
  taskItem.remove();

  const filter = buttonPending.classList.contains(
    "task-manager__filter-btn--active"
  )
    ? "pending"
    : "completed";
  manageEmptyMessage(taskList, tasks, filter);
}

export { createMessage, deleteTask };
