import { tasks } from "./tasks.js";
import { createMessage } from "./deleteTask.js";

let currentFilter = "pending";

function toggleTaskStatus(target, taskList) {
    const taskItem = target.closest(".task-manager__list-item");
    const taskListItems = [...taskList.querySelectorAll(".task-manager__list-item")];
    const index = taskListItems.indexOf(taskItem);

    const newStatus = tasks[index].status = tasks[index].status === "pending" ? "completed" : "pending";

    updateTaskDOM(taskItem, target, newStatus);
    filterTasks(currentFilter, taskList);
}

function updateTaskDOM(taskItem, statusIcon, newStatus) {
    taskItem.dataset.taskStatus = newStatus;
    statusIcon.textContent = newStatus === "completed" ? "check_box" : "check_box_outline_blank";
}

function filterTasks(filter, taskList) {
    currentFilter = filter;
    const taskItems = [...taskList.querySelectorAll(".task-manager__list-item")];

    taskItems.forEach((taskItem, index) => {
        const shouldShow = 
            (filter === "completed" && tasks[index].status === "completed") ||
            (filter === "pending" && tasks[index].status === "pending");

        taskItem.style.display = shouldShow ? "" : "none";
    });
    manageEmptyMessage(taskList, tasks, filter);

}


function manageEmptyMessage(taskList, tasks, filter) {
    // const existingMessage = taskList.querySelector('.message');
    const existingMessage = taskList.querySelector('.task-manager__message');
    const isListEmpty = taskList.children.length === 0;

    // Siempre mostrar mensaje si no hay elementos en la lista (por ejemplo, tras eliminar todos)
    if (isListEmpty) {
        if (!existingMessage) return taskList.append(createMessage());
    }

    // Verifica si no hay tareas visibles según el filtro
    const hasNoVisibleTasks = tasks.every(task =>
        filter === 'pending' ? task.status !== 'pending' : task.status !== 'completed'
    );

    if (hasNoVisibleTasks && !existingMessage) {
        const messageText = filter === 'completed' ? 'No tasks completed' : 'No tasks pending';
        taskList.append(createMessage(messageText));
    } else if (existingMessage) {
        existingMessage.remove();
    }
}

export { toggleTaskStatus, filterTasks, manageEmptyMessage };