import { filterTasksByStatus, taskFilterState } from "./toggleTaskStatus.js";

/**
 * Cambia el filtro activo entre "pending" y "completed" en la interfaz,
 * actualiza el estado global del filtro y aplica el filtrado a la lista de tareas.
 *
 * @param {HTMLElement} activateBtn - Botón que fue presionado para activar el filtro.
 * @param {string} desactivateId - ID del botón que se debe desactivar.
 * @param {HTMLElement} taskList - Elemento contenedor de la lista de tareas.
 */
function toggleFilter(activateBtn, desactivateId, taskList) {
  // Si el botón ya está activo, no se hace nada (evita recargar innecesariamente la vista)
  if (activateBtn.classList.contains("task-manager__filter-btn--active"))
    return;

  // Se obtiene el botón a desactivar usando su ID
  const desactivateBtn = document.querySelector(`#${desactivateId}`);
  
  const taskItems = taskList.querySelectorAll(".task-manager__list-item");

  // Activar el botón presionado y desactivar el otro
  activateBtn.classList.add("task-manager__filter-btn--active");
  desactivateBtn.classList.remove("task-manager__filter-btn--active");

  // Actualizar el estado del filtro global según el botón activo
  const filterType =
    activateBtn.id === "filter-pending"
      ? (taskFilterState.currentFilter = "pending")
      : (taskFilterState.currentFilter = "completed");

  // Si no hay tareas en la lista, no se aplica el filtrado
  if (taskItems.length === 0) return;

  // Aplicar el filtrado correspondiente a las tareas
  filterTasksByStatus(filterType, taskList);
}

export { toggleFilter };
