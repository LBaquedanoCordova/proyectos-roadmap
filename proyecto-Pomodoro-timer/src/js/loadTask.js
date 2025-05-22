import { getTaskTracker } from "./taskTracker.js";
import { taskList } from "./taskManagerActions.js";
import { tasks, addTask } from "./tasks.js";
import {
  taskFilterState,
  isTaskVisible,
  updateTaskStatusIcon,
} from "./toggleTaskStatus.js";
import { updateTaskManagerTitle } from "./taskManagerTitleUpdater.js";

/**
 * Carga las tareas almacenadas (desde localStorage) y las renderiza en la lista de tareas.
 * También actualiza los íconos de estado, visibilidad y el título del gestor de tareas.
 */
export function loadAndRenderTasks() {
  const savedTasks = getTaskTracker();

  // Si no hay tareas guardadas, no se hace nada
  if (!savedTasks || savedTasks.length === 0) return;
  
  tasks.push(...savedTasks);

  let hasVisibleTasks = false;

  savedTasks.forEach((task) => {
    addTask(task.description, task.status, task.id);
    const lastTaskItem = taskList.lastElementChild;
    if (task.status === "completed") {
      const icon = lastTaskItem.querySelector("#task-manager__icon--status");
      updateTaskStatusIcon(icon, task.status);
    }
    
    const shouldShow = isTaskVisible(task, taskFilterState.currentFilter);

    // Si al menos una tarea debe mostrarse, se marca como verdadero
    if (shouldShow) hasVisibleTasks = true;

    // Controla la visibilidad de la tarea en la interfaz
    lastTaskItem.style.display = shouldShow ? "" : "none";
  });

  // Actualiza el título del gestor de tareas en base a si hay tareas visibles o no
  updateTaskManagerTitle(hasVisibleTasks);
}
