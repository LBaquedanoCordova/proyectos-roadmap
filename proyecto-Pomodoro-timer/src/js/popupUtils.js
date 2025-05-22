/**
 * Muestra un popup en pantalla y enfoca el campo de entrada.
 *
 * @param {HTMLElement} popupElement - El contenedor del popup a mostrar.
 * @param {HTMLElement} inputElement - El campo de entrada que debe recibir el foco.
 */
function openPopup(popupElement, inputElement) {
  popupElement.classList.add("popup-show"); // Hacer visible el popup
  inputElement.focus();
}

/**
 * Oculta un popup de la pantalla y limpia el campo de entrada.
 *
 * @param {HTMLElement} popupElement - El contenedor del popup a ocultar.
 * @param {HTMLElement} inputElement - El campo de entrada que debe limpiarse.
 */
function closePopup(popupElement, inputElement) {
  popupElement.classList.remove("popup-show"); // Ocultar el popup
  inputElement.value = "";
}

export { openPopup, closePopup };
