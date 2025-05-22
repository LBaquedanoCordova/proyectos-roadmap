import { taskList } from "./taskManagerActions.js";

// Lista que almacena las tareas creadas en la app.
const tasks = [];

/**
 * Crea y agrega un nuevo elemento de tarea a la lista visual del panel de tareas.
 * @param {string} value - Texto o descripción de la tarea.
 * @param {string} [status="pending"] - Estado inicial de la tarea: "pending" o "completed".
 * @param {number} taskId - Identificador único de la tarea.
 */
function addTask(value, status = "pending", taskId) {
  const li = document.createElement("li");
  li.className = "task-manager__list-item";
  li.dataset.taskStatus = status;
  li.dataset.taskId = taskId;

  // Estructura interna del elemento de tarea: icono de estado, texto y acciones (editar, eliminar)
  li.innerHTML = `
    <span class="task-manager__icon material-symbols-outlined" id="task-manager__icon--status" title="Mark as done">
      check_box_outline_blank
    </span>
    <span class="task-manager__text">${value}</span>
    <div class="task-manager__actions">
      <span class="task-manager__icon material-symbols-outlined" id="task-manager__icon--edit" title="Edit task">
        edit
      </span>
      <span class="task-manager__icon material-symbols-outlined" id="task-manager__icon--delete" title="Delete task">
        delete
      </span>
    </div>
  `;
  taskList.append(li);
}

export { tasks, addTask };
