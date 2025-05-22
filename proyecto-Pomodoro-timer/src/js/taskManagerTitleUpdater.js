import { editTextContent, taskManagerTitle } from "./taskManagerActions.js";
import { filterByDateState, updateTitle } from "./filterByDate.js";
import { taskFilterState } from "./toggleTaskStatus.js";
import { tasks } from "./tasks.js";

/**
 * Actualiza el título principal del Task Manager según el estado actual de filtros,
 * tareas visibles y fechas seleccionadas.
 *
 * @param {boolean} hasVisibleTasks - Indica si hay tareas visibles en la interfaz actual.
 */
export function updateTaskManagerTitle(hasVisibleTasks) {
  const filter = taskFilterState.currentFilter;
  const { lastSelectedDate, lastPrettyDate } = filterByDateState;

  // Caso especial: no hay tareas en el arreglo general
  if (Array.isArray(tasks) && tasks.length === 0) {
    editTextContent(taskManagerTitle, "No tasks for this day");
    return;
  }

  // Si hay una fecha seleccionada, delegamos el manejo del título a la función especializada
  if (lastSelectedDate !== null) {
    updateTitle(hasVisibleTasks, lastPrettyDate, filter);
    return;
  }

  // Casos estándar: no hay fecha activa, se muestra mensaje según filtro actual y visibilidad
  const message = hasVisibleTasks
    ? filter === "pending"
      ? "Pending tasks for this day"
      : "Complete tasks for this day"
    : filter === "pending"
    ? "No pending tasks for this day"
    : "No complete tasks for this day";

  editTextContent(taskManagerTitle, message);
}
