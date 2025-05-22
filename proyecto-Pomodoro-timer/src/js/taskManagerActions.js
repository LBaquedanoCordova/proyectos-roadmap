import { openPopupTask } from "./popupTask.js";
import { toggleFilter } from "./filterByStatus.js";
import { setupCalendar, openCalendar } from "./taskCalendar.js";
import { editTask } from "./editTask.js";
import { deleteTask } from "./deleteTask.js";
import { toggleTaskStatus } from "./toggleTaskStatus.js";

const taskManager = document.querySelector(".task-manager");
const taskManagerTitle = taskManager.querySelector(
  ".task-manager__content--title"
);
const buttonCompleted = taskManager.querySelector("#filter-completed");
const buttonPending = taskManager.querySelector("#filter-pending");
const spanDate = taskManager.querySelector("#task-manager__date");
const taskDateInput = taskManager.querySelector('[data-role="task-date"]');
const taskList = taskManager.querySelector(".task-manager__list");

/**
 * Cambia el contenido de texto de un elemento si es diferente al contenido actual.
 * Esto evita actualizaciones innecesarias en el DOM.
 *
 * @param {HTMLElement} element - Elemento cuyo contenido se quiere actualizar.
 * @param {string} content - Nuevo contenido de texto.
 */
function editTextContent(element, content) {
  if (element.textContent !== content) element.textContent = content;
}

// Inicializa el calendario asociado al input de fecha de tareas
setupCalendar(taskDateInput);

/**
 * Configura los event listeners para el gestor de tareas, centralizando la gestión
 * de eventos de clicks para diferentes elementos dentro del contenedor taskManager.
 */
function setupTaskManager() {
  taskManager.addEventListener("click", (e) => {
    const target = e.target;

    // Abrir el popup para agregar una nueva tarea
    if (target.closest(".task-manager__add-btn")) {
      openPopupTask();

      // Si el filtro de completadas está activo, cambia el filtro a pendientes al abrir el popup
      if (
        buttonCompleted.classList.contains("task-manager__filter-btn--active")
      ) {
        toggleFilter(buttonPending, "filter-completed", taskList);
      }
      return;
    }

    // Cambiar filtro a pendientes al hacer click en el botón correspondiente
    if (target.id === "filter-pending") {
      return toggleFilter(target, "filter-completed", taskList);
    }

    // Cambiar filtro a completadas al hacer click en el botón correspondiente
    if (target.id === "filter-completed") {
      return toggleFilter(target, "filter-pending", taskList);
    }

    // Editar tarea al hacer click en el ícono de edición
    if (target.id === "task-manager__icon--edit") {
      return editTask(target);
    }

    // Eliminar tarea al hacer click en el ícono de eliminación
    if (target.id === "task-manager__icon--delete") {
      return deleteTask(target, taskList, buttonPending);
    }

    // Cambiar estado de tarea (pending/completed) al hacer click en el ícono de estado
    if (target.id === "task-manager__icon--status") {
      return toggleTaskStatus(target, taskList);
    }

    // Abrir el calendario al hacer click en la fecha
    if (target.closest(".task-manager__date")) {
      openCalendar();
    }
  });
}

export {
  buttonPending,
  setupTaskManager,
  taskManager,
  taskList,
  taskManagerTitle,
  spanDate,
  editTextContent,
};
