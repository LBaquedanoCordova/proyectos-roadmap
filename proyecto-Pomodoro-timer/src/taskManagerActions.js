// import { openPopup } from "./popupTask.js";
import { openPopupTask } from "./popupTask.js";
import { toggleFilter } from "./filterTask.js";
import { editTask } from "./editTask.js";
import { deleteTask } from "./deleteTask.js";
import { toggleTaskStatus, manageEmptyMessage } from "./toggleTaskStatus.js";

const taskManager = document.querySelector(".task-manager");
const buttonCompleted = taskManager.querySelector("#filter-completed");
const buttonPending = taskManager.querySelector("#filter-pending");
const taskList = taskManager.querySelector(".task-manager__list");

function setupTaskManager() {
  taskManager.addEventListener("click", (e) => {
    const target = e.target;

    if (target.closest(".task-manager__add-btn")) {
      openPopupTask();

      buttonCompleted.classList.contains("task-manager__filter-btn--active") &&
        toggleFilter(buttonPending, "filter-completed", taskList);
      return;
    }

    if (target.id === "filter-pending") {
      return toggleFilter(target, "filter-completed", taskList);
    }
    if (target.id === "filter-completed") {
      return toggleFilter(target, "filter-pending", taskList);
    }
    if (target.id === "task-manager__icon--edit") {
      return editTask(target);
    }

    if (target.id === "task-manager__icon--delete") {
      return deleteTask(target, taskList, buttonPending, manageEmptyMessage);
    }

    if (target.id === "task-manager__icon--status") {
      toggleTaskStatus(target, taskList);
    }
  });
}

export { setupTaskManager, taskManager, taskList };
