import { tasks } from "./tasks.js";

function validateInput(input) {
  const trimmedValue = input.value.trim();
  return {
    trimmedValue,
    isValidLength: trimmedValue.length >= 3,
  };
}

// Reemplaza el contenedor de edición con un nuevo elemento en el DOM.
function replaceWithElement(editContainer, newElement) {
  editContainer.replaceWith(newElement);
}

// Cancela la edición y restaura el texto original de la tarea.
function notSaveEdit(editContainer, textElement) {
  replaceWithElement(editContainer, textElement);
}

// Guarda la edición de la tarea y actualiza su contenido en la lista.
function saveEdit(input, editContainer, taskItem) {
  const newText = input.value.trim();

  const span = document.createElement("span");
  span.className = "task-manager__text";
  span.textContent = newText;

  replaceWithElement(editContainer, span);

  const taskListItems = taskItem.closest('.task-manager__list').children;

  const index = [...taskListItems].indexOf(taskItem); // Encuentra el índice de la tarea.
  tasks[index].description = newText; // Actualiza la descripción en la lista de tareas.
}


function handleInput(input) { 
  // Verifica si la longitud del input es válida
  const { isValidLength } = validateInput(input);

  // Agrega o quita la clase "error" según la validez del input
  input.classList.toggle('error', !isValidLength)
}

// Maneja la lógica de guardar o cancelar la edición de la tarea
function processEdit(action, input, editContainer, textElement, taskItem) {
  // Validación del valor del input y comprobación de si el texto cambió
  const { trimmedValue, isValidLength } = validateInput(input);
  const isTextChanged = textElement.textContent !== trimmedValue;

  // Si la acción es guardar, procesa el cambio o cancela si no hubo cambios
  if (action === "save") {
    if (!isTextChanged) return notSaveEdit(editContainer, textElement);
    if (isValidLength) return saveEdit(input, editContainer, taskItem);
  } else {
    // Si la acción es cancelar, revertir los cambios
    notSaveEdit(editContainer, textElement);
  }
}

// Maneja la acción de presionar una tecla, específicamente "Enter" o "Escape"
function handleKeyDown(event, input, editContainer, textElement, taskItem) {
  const { key } = event;
  if (key === "Enter") return processEdit("save", input, editContainer, textElement, taskItem); // Guardar si es Enter
  if (key === "Escape") return processEdit("cancel", input, editContainer, textElement, taskItem); // Cancelar si es Escape
}

// Maneja el click en los botones de guardar o cancelar
function handleClick(event, input, editContainer, textElement, taskItem) {
  const button = event.target.closest(".task-manager__editor-button--save, .task-manager__editor-button--cancel");
  if (!button) return; // Si no se hace clic en un botón válido, salir

  // Determina la acción a realizar dependiendo del tipo de botón
  const action = button.classList.contains("task-manager__editor-button--save") ? "save" : "cancel";
  processEdit(action, input, editContainer, textElement, taskItem);
}

function createEditContainer(textElement, taskItem) {
  // Crea un elemento HTML con la etiqueta, clase y contenido opcionales
  function createElement(tag, className, textContent = "", child = null) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (textContent) element.textContent = textContent;
    if (child) element.append(child);
    return element;
  }

  const editContainer = createElement("div", "task-manager__editor"); // Contenedor del editor

  // Crea el campo de entrada de texto
  const input = createElement("input", "task-manager__editor-input");
  input.type = "text";
  input.value = textElement.textContent;

  input.addEventListener("keydown", (e) =>
    handleKeyDown(e, input, editContainer, textElement, taskItem)
  );
  input.addEventListener("input", () => handleInput(input));

  const buttonContainer = createElement("div", "task-manager__editor-buttons"); // Contenedor de botones

  buttonContainer.addEventListener('click', e => handleClick(e, input, editContainer, textElement, taskItem));

  // Crea los íconos de cancelación y guardar
  const escIcon = createElement(
    "span",
    "task-manager__editor-icon task-manager__editor-icon--cancel",
    "Esc"
  );
  const returnIcon = createElement(
    "span",
    "material-symbols-outlined task-manager__editor-icon task-manager__editor-icon--save",
    "keyboard_return"
  );

  // Crea los botones de guardar y cancelar
  const saveButton = createElement(
    "button",
    "task-manager__editor-button task-manager__editor-button--save",
    "",
    returnIcon
  );
  const cancelButton = createElement(
    "button",
    "task-manager__editor-button task-manager__editor-button--cancel",
    "",
    escIcon
  );

  buttonContainer.append(saveButton, cancelButton);
  editContainer.append(input, buttonContainer);

  return editContainer;
}

function editTask(target) {
  // Encuentra el elemento de la tarea más cercano
  const taskItem = target.closest(".task-manager__list-item");

  // Si ya hay un editor activo en la tarea, no hace nada
  if (taskItem.querySelector(".task-manager__editor")) return;

  // Obtiene el texto actual de la tarea y crea el editor de edición
  const textElement = taskItem.querySelector(".task-manager__text");
  const container = createEditContainer(textElement, taskItem);

  // Reemplaza el texto de la tarea con el editor y enfoca el input
  textElement.replaceWith(container);
  container.querySelector(".task-manager__editor-input").focus();
}


export { editTask };
