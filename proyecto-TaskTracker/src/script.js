const tasks = [];
const statusTask = ["pendiente", "completada", "eliminada"];

const inputTask = document.getElementById("task-input");
const taskList = document.querySelector(".task-list");

inputTask.addEventListener("change", (e) => {
  const taskDescription = e.target.value.trim();

  if (taskDescription) {
    tasks.push({ description: taskDescription, status: statusTask[0] });
    e.target.value = "";
    renderTasks();
  }
});

function renderTasks() {
  taskList.innerHTML = "";

  tasks.sort((a, b) => (a.status === statusTask[1]) - (b.status === statusTask[1]));

  const fragment = document.createDocumentFragment();

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.textContent = task.description;

    const button = document.createElement("button");
    button.classList.add("btnDelete");
    button.innerHTML = '<span class="material-symbols-outlined">delete</span>';

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.checked = task.status === statusTask[1];
    li.classList.toggle("complete", inputCheckbox.checked);

    inputCheckbox.addEventListener("change", () => {
      task.status = inputCheckbox.checked ? statusTask[1] : statusTask[0];
      renderTasks();
    });

    button.addEventListener("click", () => {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.prepend(inputCheckbox);
    li.append(button);
    fragment.append(li);
  });

  taskList.append(fragment);
}
