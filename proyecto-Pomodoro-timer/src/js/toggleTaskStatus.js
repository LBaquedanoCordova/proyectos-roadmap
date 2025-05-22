import { tasks } from "./tasks.js";
import { setTaskTracker } from "./taskTracker.js";
import { updateTaskManagerTitle } from "./taskManagerTitleUpdater.js";
import { filterByDateState, formatDateToYMD } from "./filterByDate.js";

/**
 * Estado del filtro de tareas.
 * - currentFilter: filtro activo ("pending" o "completed").
 * - tasksModifiedWhileDateActive: indica si hubo modificaciones mientras un filtro de fecha estaba activo.
 */
const taskFilterState = {
  currentFilter: "pending",
  tasksModifiedWhileDateActive: false,
};

/**
 * Actualiza el ícono de estado y su título basado en el estado de la tarea.
 * @param {HTMLElement} iconElement - Elemento del ícono de estado.
 * @param {string} status - Estado de la tarea ('completed' o 'pending').
 */
function updateTaskStatusIcon(iconElement, status) {
  iconElement.textContent =
    status === "completed" ? "check_box" : "check_box_outline_blank";
  iconElement.title =
    status === "completed" ? "Mark as pending" : "Mark as done";
}

/**
 * Cambia el estado de una tarea entre "pending" y "completed".
 * También actualiza el DOM, vuelve a filtrar las tareas, y actualiza el contador.
 *
 * @param {HTMLElement} target - El elemento clicado (ícono de estado).
 * @param {HTMLElement} taskList - El contenedor de la lista de tareas.
 */
function toggleTaskStatus(target, taskList) {
  const taskItem = target.closest(".task-manager__list-item");
  const taskListItems = [
    ...taskList.querySelectorAll(".task-manager__list-item"),
  ];
  const index = taskListItems.indexOf(taskItem);

  const newStatus = (tasks[index].status =
    tasks[index].status === "pending" ? "completed" : "pending");

  updateTaskDOM(taskItem, target, newStatus);
  filterTasksByStatus(taskFilterState.currentFilter, taskList);
  setTaskTracker(tasks);

  taskFilterState.tasksModifiedWhileDateActive =
    filterByDateState.lastSelectedDate !== null;
}

/**
 * Actualiza los atributos del DOM relacionados con el estado de una tarea.
 *
 * @param {HTMLElement} taskItem - El elemento de la tarea.
 * @param {HTMLElement} statusIcon - Ícono que representa el estado.
 * @param {string} newStatus - Nuevo estado de la tarea ("pending" o "completed").
 */
function updateTaskDOM(taskItem, statusIcon, newStatus) {
  taskItem.dataset.taskStatus = newStatus;
  updateTaskStatusIcon(statusIcon, newStatus);
}

/**
 * Determina si una tarea debe mostrarse según su estado y el filtro activo.
 *
 * @param {Object} task - Objeto de tarea con propiedad `status`.
 * @param {string} filter - Filtro activo ("pending" o "completed").
 * @returns {boolean} - `true` si la tarea debe mostrarse, `false` en caso contrario.
 */
function isTaskVisible(task, filter) {
  return (
    (filter === "completed" && task?.status === "completed") ||
    (filter === "pending" && task?.status === "pending")
  );
}

/**
 * Filtra las tareas en pantalla según el estado (pending/completed) y, si está activo, por fecha.
 * También actualiza el mensaje del gestor si hay o no, tareas visibles.
 *
 * @param {string} filter - Estado por el que se desea filtrar ("pending" o "completed").
 * @param {HTMLElement} taskList - Contenedor DOM que contiene los ítems de tarea.
 */
function filterTasksByStatus(filter, taskList) {
  const taskItems = taskList.querySelectorAll(".task-manager__list-item");

  const { lastSelectedDate } = filterByDateState;

  let hasVisibleTasks = false;

  taskItems.forEach((taskItem, index) => {
    const task = tasks[index];

    let matchesDate = true;

    if (lastSelectedDate !== null) {
      matchesDate = formatDateToYMD(task.createdDate) === lastSelectedDate;
    }

    const matchesStatus = filter === task.status;
    const shouldShow = matchesStatus && matchesDate;

    if (shouldShow) hasVisibleTasks = true;
    taskItem.style.display = shouldShow ? "" : "none";
  });
  updateTaskManagerTitle(hasVisibleTasks);
}

export {
  toggleTaskStatus,
  isTaskVisible,
  filterTasksByStatus,
  taskFilterState,
  updateTaskStatusIcon,
};
