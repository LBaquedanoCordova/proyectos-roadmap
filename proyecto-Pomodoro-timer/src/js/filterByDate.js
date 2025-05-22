import { getTaskTracker } from "./taskTracker.js";
import {
  taskManager,
  spanDate,
  editTextContent,
  taskManagerTitle,
} from "./taskManagerActions.js";
import { createElem } from "./editTask.js";
import { isTaskVisible } from "./toggleTaskStatus.js";

/**
 * Mantiene el estado actual del filtro por fecha,
 * incluyendo la fecha seleccionada, su formato legible,
 * y si las tareas ya fueron ocultadas en la vista.
 */
const filterByDateState = {
  lastSelectedDate: null,
  lastPrettyDate: null,
  tasksAlreadyHidden: false,
};

/**
 * Formatea una fecha al formato ISO corto (YYYY-MM-DD).
 * @param {Date|string} date - Fecha a formatear.
 * @returns {string} Fecha formateada.
 */
const formatDateToYMD = (date) =>
  Intl.DateTimeFormat("en-CA").format(new Date(date));

/**
 * Actualiza el título del panel de tareas con base en la existencia de tareas.
 * @param {boolean} hasTasks - Indica si hay tareas para mostrar.
 * @param {string} prettyDate - Fecha legible para el usuario.
 * @param {string} type - Tipo de tarea: 'pending' o 'completed'.
 */
function updateTitle(hasTasks, prettyDate, type) {
  const status = type === "pending" ? "Pending" : "Complete";
  const noStatus = type === "pending" ? "No pending" : "No complete";
  editTextContent(
    taskManagerTitle,
    `${hasTasks ? status : noStatus} tasks on ${prettyDate}`
  );
}

/**
 * Asegura que el botón de regreso esté presente en el panel de tareas filtradas por fecha.
 * Si el botón ya existe, no hace nada. De lo contrario, lo crea y le asigna el manejador de evento.
 * @param {Object} context - Contexto compartido que contiene referencias necesarias.
 * @param {HTMLElement} context.taskManagerContent - Contenedor principal del área de tareas.
 */
function ensureBackButton(context) {
  const { taskManagerContent } = context;
  if (taskManager.querySelector(".task-manager__button")) return;

  const button = createElem("button", "task-manager__button", "back");
  button.addEventListener("click", (event) =>
    handlerButtonBack(event, context)
  );
  taskManagerContent.append(button);
}

/**
 * Alterna la visibilidad de las tareas en la lista según las tareas de la fecha seleccionada y el filtro activo.
 * Se asegura de mostrar solo las tareas que coincidan con ambos criterios (fecha y filtro: 'completed' o 'pending').
 * Al finalizar, se asegura que el botón de regreso esté presente.
 * @param {Object} context - Contexto compartido que contiene referencias necesarias.
 * @param {NodeList} context.taskItems - Lista de elementos de tareas en el DOM.
 * @param {Array} context.tasksForSelectedDate - Lista de tareas correspondientes a la fecha seleccionada.
 * @param {Object} context.taskFilterState - Estado actual del filtro aplicado ('completed' o 'pending').
 */
function toggleTaskItems(context) {
  const { taskItems, tasksForSelectedDate, taskFilterState } = context;

  taskItems.forEach((taskItem) => {
    const taskId = parseInt(taskItem.dataset.taskId);
    const matchedTask = tasksForSelectedDate.find((task) => task.id === taskId);

    // Determinamos si debe mostrarse según el filtro activo y el estado de la tarea.
    let shouldShow = false;
    if (matchedTask)
      shouldShow = isTaskVisible(matchedTask, taskFilterState.currentFilter);

    taskItem.style.display = shouldShow ? "" : "none";
  });

  // Indicamos que las tareas no están ocultas globalmente.
  filterByDateState.tasksAlreadyHidden = false;

  // Nos aseguramos que el botón de regreso esté presente.
  ensureBackButton(context);
}

/**
 * Maneja el comportamiento al hacer clic en el botón de regreso desde la vista filtrada por fecha.
 * Restaura el estado previo, mostrando las tareas según el filtro activo.
 * También restablece el calendario a la fecha actual.
 * @param {Event} event - Evento click generado por el usuario.
 * @param {Object} context - Contexto compartido que contiene referencias necesarias.
 * @param {HTMLElement} context.addTaskButton - Botón para agregar nuevas tareas.
 * @param {Object} context.taskFilterState - Estado actual de filtrado de tareas.
 * @param {Function} context.updateTaskManagerTitle - Función para actualizar el mensaje del título del administrador de tareas.
 * @param {Function} context.getCalendarInstance - Devuelve la instancia actual del calendario.
 * @param {NodeList} context.taskItems - Lista de elementos de tareas en el DOM.
 * @param {Array} context.tasksStorage - Almacenamiento actual de tareas.
 */
function handlerButtonBack(event, context) {
  const {
    addTaskButton,
    taskFilterState,
    updateTaskManagerTitle,
    getCalendarInstance,
  } = context;
  let { taskItems, tasksStorage } = context;

  // Si hubo modificaciones mientras la vista filtrada estaba activa, actualizamos las tareas desde el storage.
  if (taskFilterState.tasksModifiedWhileDateActive) {
    tasksStorage = getTaskTracker();
    taskItems = document.querySelectorAll(".task-manager__list-item");
    taskFilterState.tasksModifiedWhileDateActive = false;
  }

  let hasVisibleTasks = false;

  // Recorremos las tareas y mostramos solo las que coinciden con el filtro activo.
  taskItems.forEach((taskItem, index) => {
    const task = tasksStorage[index];

    const shouldShow = isTaskVisible(task, taskFilterState.currentFilter);

    if (shouldShow) hasVisibleTasks = true;
    taskItem.style.display = shouldShow ? "" : "none";
  });

  // Restauramos la visibilidad del botón de agregar tarea.
  if (addTaskButton) addTaskButton.style.display = "";
  if (spanDate) spanDate.textContent = "All Task";

  // Reseteamos estados de fecha y visibilidad.
  filterByDateState.lastSelectedDate = null;
  filterByDateState.lastPrettyDate = null;
  filterByDateState.tasksAlreadyHidden = false;

  // Manejamos el mensaje de tareas según haya o no tareas visibles.
  updateTaskManagerTitle(hasVisibleTasks);

  // Restablecemos la fecha del calendario a hoy.
  const calendar = getCalendarInstance();
  if (calendar) calendar.setDate(new Date(), false);

  // Eliminamos el botón de regreso.
  event.target.remove();
}

/**
 * Maneja el cambio de fecha en el calendario.
 * Filtra las tareas por la fecha seleccionada y aplica el filtro activo ('completed' o 'pending').
 * También actualiza el título del panel y controla la visibilidad de las tareas.
 * @param {string} dateStr - Fecha seleccionada en formato 'YYYY-MM-DD'.
 * @param {Object} instance - Instancia del calendario que genera el cambio.
 * @param {Object} options - Opciones y contexto compartido.
 * @param {Object} options.taskFilterState - Estado actual del filtro de tareas.
 * @param {Function} context.updateTaskManagerTitle - Función para actualizar el mensaje del título del administrador de tareas.
 * @param {Function} options.getCalendarInstance - Devuelve la instancia actual del calendario.
 */
function handleDateChange(
  dateStr,
  instance,
  { taskFilterState, updateTaskManagerTitle, getCalendarInstance }
) {
  const prettyDate = instance.altInput.value;
  spanDate.textContent = prettyDate;
  filterByDateState.lastPrettyDate = prettyDate;
  const tasksStorage = getTaskTracker();

  // Si no hay tareas, mostramos el mensaje general y salimos.
  if (!tasksStorage || tasksStorage.length === 0)
    return editTextContent(taskManagerTitle, "No task yet");

  // Si el usuario selecciona la misma fecha nuevamente, no hacemos nada.
  const isSameDateSelected = dateStr === filterByDateState.lastSelectedDate;
  if (isSameDateSelected) return;
  filterByDateState.lastSelectedDate = dateStr;

  const taskItems = taskManager.querySelectorAll(".task-manager__list-item");
  const addTaskButton = taskManager.querySelector(".task-manager__add-btn");
  const taskManagerContent = taskManager.querySelector(
    ".task-manager__content"
  );

  // Ocultamos el botón de agregar tarea mientras estamos en la vista filtrada por fecha.
  if (addTaskButton) addTaskButton.style.display = "none";

  // Filtramos las tareas que coinciden con la fecha seleccionada.
  const tasksForSelectedDate = tasksStorage.filter(
    (task) => formatDateToYMD(task.createdDate) === dateStr
  );

  // Creamos el contexto completo para reutilizar en funciones auxiliares.
  const context = {
    taskItems,
    addTaskButton,
    taskManagerContent,
    tasksForSelectedDate,
    tasksStorage,
    taskFilterState,
    updateTaskManagerTitle,
    getCalendarInstance,
  };

  // Si no hay tareas en la fecha seleccionada:
  if (tasksForSelectedDate.length === 0) {
    if (!filterByDateState.tasksAlreadyHidden)
      taskItems.forEach((taskItem) => (taskItem.style.display = "none"));
    filterByDateState.tasksAlreadyHidden = true;

    updateTitle(false, prettyDate, taskFilterState.currentFilter);

    ensureBackButton(context);
    return;
  }

  // Mostramos las tareas filtradas por fecha y filtro activo.
  toggleTaskItems(context);

  // Verificamos si hay tareas del tipo filtrado ('completed' o 'pending') en esa fecha.
  const hasTasksOfType = tasksForSelectedDate.some(
    (task) => task.status === taskFilterState.currentFilter
  );

  // Actualizamos el título según si hay o no tareas del tipo filtrado en esa fecha.
  updateTitle(hasTasksOfType, prettyDate, taskFilterState.currentFilter);
}

export {
  handleDateChange,
  formatDateToYMD,
  updateTitle,
  filterByDateState,
  handlerButtonBack,
};
