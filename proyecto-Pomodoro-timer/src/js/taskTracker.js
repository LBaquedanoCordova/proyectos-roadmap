/**
 * Guarda el array de tareas en localStorage como cadena JSON.
 *
 * @param {Array} tasks - Lista de tareas a guardar.
 */
function setTaskTracker(tasks) {
  localStorage.setItem("taskApp:tasks", JSON.stringify(tasks));
}

/**
 * Obtiene y parsea la lista de tareas almacenadas en localStorage.
 * Devuelve null si no hay datos guardados.
 *
 * @returns {Array|null} Lista de tareas o null si no existen.
 */
function getTaskTracker() {
  const tasksTraker = localStorage.getItem("taskApp:tasks");
  return JSON.parse(tasksTraker);
}

/**
 * Genera un nuevo ID incremental para una tarea, almacenándolo en localStorage.
 * Si no existe un ID previo, comienza en 0.
 *
 * @returns {number} Nuevo ID para tarea.
 */
function getIdTask() {
  const lastId = parseInt(localStorage.getItem("lastTaskId"), 10);
  const idTask = isNaN(lastId) ? 0 : lastId + 1;
  localStorage.setItem("lastTaskId", idTask);
  return idTask;
}

export { setTaskTracker, getTaskTracker, getIdTask };
