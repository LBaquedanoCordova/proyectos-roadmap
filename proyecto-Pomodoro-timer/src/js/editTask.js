import { tasks } from "./tasks.js";
import { setTaskTracker } from "./taskTracker.js";

/**
 * Valida el contenido del input para asegurarse de que tenga al menos 3 caracteres.
 * @param {HTMLInputElement} input - Campo de texto a validar.
 * @returns {{ trimmedValue: string, isValidLength: boolean }}
 */
function validateInput(input) {
  const trimmedValue = input.value.trim();
  return {
    trimmedValue,
    isValidLength: trimmedValue.length >= 3,
  };
}

/**
 * Reemplaza un contenedor de edición con un nuevo elemento del DOM.
 * @param {HTMLElement} editContainer - Elemento actual que contiene el input.
 * @param {HTMLElement} newElement - Elemento que lo reemplazará (generalmente un <span>).
 */
function replaceWithElement(editContainer, newElement) {
  editContainer.replaceWith(newElement);
}

/**
 * Cancela la edición y restaura el texto original de la tarea.
 * @param {HTMLElement} editContainer - Contenedor del input.
 * @param {HTMLElement} textElement - Elemento original con el texto de la tarea.
 */
function notSaveEdit(editContainer, textElement) {
  replaceWithElement(editContainer, textElement);
}

/**
 * Guarda los cambios realizados en una tarea, actualiza el DOM y el array de tareas.
 * @param {HTMLInputElement} input - Campo con el nuevo texto.
 * @param {HTMLElement} editContainer - Contenedor del input.
 * @param {HTMLElement} taskItem - Elemento <li> que representa la tarea.
 */
function saveEdit(input, editContainer, taskItem) {
  const newText = input.value.trim();

  const span = document.createElement("span");
  span.className = "task-manager__text";
  span.textContent = newText;

  // Determina el índice de la tarea en la lista visual
  const taskListItems = taskItem.closest(".task-manager__list").children;
  const index = [...taskListItems].indexOf(taskItem);

  tasks[index].description = newText;

  replaceWithElement(editContainer, span);
  setTaskTracker(tasks);
}

/**
 * Marca visualmente si el input es válido o no, aplicando una clase de error.
 * @param {HTMLInputElement} input - Campo a validar.
 */
function handleInput(input) {
  const { isValidLength } = validateInput(input);

  input.classList.toggle("task-manager__editor-input--error", !isValidLength);
}

/**
 * Procesa la acción de edición: guardar cambios si son válidos o cancelar.
 * @param {"save" | "cancel"} action - Acción solicitada.
 * @param {HTMLInputElement} input - Campo de entrada.
 * @param {HTMLElement} editContainer - Contenedor del input.
 * @param {HTMLElement} textElement - Elemento con el texto original.
 * @param {HTMLElement} taskItem - Elemento de la tarea en la lista.
 */
function processEdit(action, input, editContainer, textElement, taskItem) {
  const { trimmedValue, isValidLength } = validateInput(input);
  const isTextChanged = textElement.textContent !== trimmedValue;

  if (action === "save") {
    // Si el texto no cambió, simplemente cancela la edición
    if (!isTextChanged) return notSaveEdit(editContainer, textElement);

    // Si es válido, guarda los cambios
    if (isValidLength) return saveEdit(input, editContainer, taskItem);
  } else {
    // Cualquier otra acción cancela la edición
    notSaveEdit(editContainer, textElement);
  }
}

/**
 * Guarda la edición si se presiona "Enter" o la cancela si se presiona "Escape".
 * 
 * @param {KeyboardEvent} event - Evento de teclado.
 * @param {HTMLInputElement} input - Campo de entrada del texto de la tarea.
 * @param {HTMLElement} editContainer - Contenedor de edición actual.
 * @param {HTMLElement} textElement - Elemento de texto original de la tarea.
 * @param {HTMLElement} taskItem - Elemento <li> de la tarea que se está editando.
 */
function handleKeyDown(event, input, editContainer, textElement, taskItem) {
  const { key } = event;
  if (key === "Enter")
    return processEdit("save", input, editContainer, textElement, taskItem);
  if (key === "Escape")
    return processEdit("cancel", input, editContainer, textElement, taskItem);
}

/**
 * Maneja clics en los botones de acción del editor de tareas.
 * Ejecuta "guardar" o "cancelar" según el botón clickeado.
 * 
 * @param {MouseEvent} event - Evento de clic.
 * @param {HTMLInputElement} input - Campo de entrada del texto de la tarea.
 * @param {HTMLElement} editContainer - Contenedor de edición actual.
 * @param {HTMLElement} textElement - Elemento de texto original de la tarea.
 * @param {HTMLElement} taskItem - Elemento <li> de la tarea que se está editando.
 */
function handleClick(event, input, editContainer, textElement, taskItem) {
  const button = event.target.closest(
    ".task-manager__editor-button--save, .task-manager__editor-button--cancel"
  );
  if (!button) return;

  const action = button.classList.contains("task-manager__editor-button--save")
    ? "save"
    : "cancel";

  processEdit(action, input, editContainer, textElement, taskItem);
}

/**
 * Crea un nuevo elemento HTML con clase, texto y un hijo opcional.
 * @param {string} tag - Etiqueta del elemento (ej. "div", "span", "button").
 * @param {string} className - Nombre de clase a aplicar.
 * @param {string} [textContent=""] - Texto a incluir dentro del elemento.
 * @param {HTMLElement|null} [child=null] - Elemento hijo a incluir dentro del nuevo elemento.
 * @returns {HTMLElement}
 */
function createElem(tag, className, textContent = "", child = null) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  if (child) element.append(child);
  return element;
}

/**
 * Crea y configura el contenedor de edición de una tarea, incluyendo input y botones.
 * @param {HTMLElement} textElement - Elemento con el texto actual de la tarea.
 * @param {HTMLElement} taskItem - Elemento <li> que representa la tarea.
 * @returns {HTMLElement} - Contenedor con input y botones de acción.
 */
function createEditContainer(textElement, taskItem) {
  const editContainer = createElem("div", "task-manager__editor");

  const input = createElem("input", "task-manager__editor-input");
  input.type = "text";
  input.value = textElement.textContent;

  input.addEventListener("keydown", (e) =>
    handleKeyDown(e, input, editContainer, textElement, taskItem)
  );
  input.addEventListener("input", () => handleInput(input));

  const buttonContainer = createElem("div", "task-manager__editor-buttons");
  buttonContainer.addEventListener("click", (e) =>
    handleClick(e, input, editContainer, textElement, taskItem)
  );

  const escIcon = createElem(
    "span",
    "task-manager__editor-icon task-manager__editor-icon--cancel",
    "Esc"
  );
  const returnIcon = createElem(
    "span",
    "material-symbols-outlined task-manager__editor-icon task-manager__editor-icon--save",
    "keyboard_return"
  );

  const saveButton = createElem(
    "button",
    "task-manager__editor-button task-manager__editor-button--save",
    "",
    returnIcon
  );
  const cancelButton = createElem(
    "button",
    "task-manager__editor-button task-manager__editor-button--cancel",
    "",
    escIcon
  );

  buttonContainer.append(saveButton, cancelButton);
  editContainer.append(input, buttonContainer);

  return editContainer;
}

/**
 * Inicia la edición de una tarea si no hay una edición activa.
 * @param {HTMLElement} target - Elemento que disparó la acción de editar.
 */
function editTask(target) {
  const taskItem = target.closest(".task-manager__list-item");
  if (!taskItem || taskItem.querySelector(".task-manager__editor")) return;

  const textElement = taskItem.querySelector(".task-manager__text");
  const container = createEditContainer(textElement, taskItem);

  textElement.replaceWith(container);
  container.querySelector(".task-manager__editor-input").focus();
}

export { createElem, editTask };
