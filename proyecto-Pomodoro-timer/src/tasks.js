import { taskList } from "./taskManagerActions.js";

const statusTask = ["pending", "completed"];
const tasks = [];

function addTask(value) {
  const li = document.createElement('li');
  li.className = 'task-manager__list-item';
  li.dataset.taskStatus = "pending";//new
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
  tasks.push({ description: value, status: statusTask[0] });
}

export { tasks, addTask };