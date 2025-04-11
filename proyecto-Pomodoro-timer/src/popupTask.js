import { openPopup, closePopup } from "./popupUtils.js";

const popupTask = document.querySelector(".popup--add-task");
const taskInput = popupTask.querySelector("#task-input");

function openPopupTask() {
  openPopup(popupTask, taskInput);
}

function closePopupTask() {
  closePopup(popupTask, taskInput);
}

export { popupTask, taskInput, openPopupTask, closePopupTask };