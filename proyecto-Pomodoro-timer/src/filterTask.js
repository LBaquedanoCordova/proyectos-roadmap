import { filterTasks } from "./toggleTaskStatus.js";

function toggleFilter(activateBtn, desactivateId, taskList) {
  if (activateBtn.classList.contains("task-manager__filter-btn--active")) return;

  const desactivateBtn = document.querySelector(`#${desactivateId}`);
  const taskItems = taskList.querySelectorAll(".task-manager__list-item");

  activateBtn.classList.add("task-manager__filter-btn--active");
  desactivateBtn.classList.remove("task-manager__filter-btn--active");
  
  
  if (taskItems.length === 0) return;

  // Determinar qué filtro aplicar basado en el botón activo
  const filterType = activateBtn.id === "filter-pending" ? "pending" : "completed";
  filterTasks(filterType, taskList);
}

export { toggleFilter };