import { tasks } from "./tasks.js";
import { setTaskTracker } from "./taskTracker.js";
import { taskFilterState } from "./toggleTaskStatus.js";
import { filterByDateState, formatDateToYMD } from "./filterByDate.js";
import { updateTaskManagerTitle } from "./taskManagerTitleUpdater.js";

/**
 * Elimina una tarea tanto del DOM como del almacenamiento,
 * actualiza el estado de filtrado según el botón activo,
 * y verifica si debe actualizar el mensaje del título del administrador de tareas.
 * También tiene en cuenta si hay una fecha filtrada activa.
 *
 * @param {HTMLElement} target - Elemento del botón de eliminación clickeado.
 * @param {HTMLElement} taskList - Contenedor de la lista de tareas.
 * @param {HTMLElement} buttonPending - Botón de filtro de tareas pendientes.
 */
export function deleteTask(target, taskList, buttonPending) {
  const taskItem = target.closest(".task-manager__list-item");

  const taskListItems = [...taskList.children];
  const index = taskListItems.indexOf(taskItem);

  const { lastSelectedDate } = filterByDateState;

  if (index !== -1) tasks.splice(index, 1);
  taskItem.remove();

  setTaskTracker(tasks);

  const filter = buttonPending.classList.contains(
    "task-manager__filter-btn--active"
  )
    ? "pending"
    : "completed";

  taskFilterState.tasksModifiedWhileDateActive = lastSelectedDate !== null;

  let hasVisibleTasks = false;
  let matchesDate = true;

  hasVisibleTasks = tasks.some((task) => {
    if (lastSelectedDate !== null) {
      matchesDate = formatDateToYMD(task.createdDate) === lastSelectedDate;
    }
    const matchesStatus = filter === task.status;
    return matchesStatus && matchesDate;
  });
  updateTaskManagerTitle(hasVisibleTasks);
}
