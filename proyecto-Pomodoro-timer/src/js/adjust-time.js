import { openPopup, closePopup } from "./popupUtils.js";

const adjustTimeList = document.querySelector(".time-adjuster__list");
const popupContainer = document.querySelector(".popup--adjust-time");
const timeInput = popupContainer.querySelector("#timePopup-input");

/**
 * Incrementa el tiempo del temporizador si el valor es válido.
 * @param {Object} timer - Instancia del temporizador
 * @param {string} minutes - Minutos a añadir como string
 */
function handleTimeIncrement(timer, minutes) {
  if (!minutes || minutes === "0") return;
  const increment = parseFloat(minutes);
  timer.addTime(increment);
}

/**
 * Abre el popup de ajuste de tiempo y enfoca el input.
 */
function openTimePopup() {
  openPopup(popupContainer, timeInput);
}

/**
 * Cierra el popup de ajuste de tiempo.
 */
function closeTimePopup() {
  closePopup(popupContainer, timeInput);
}

/**
 * Valida y limpia el valor ingresado en el input de tiempo.
 * Solo permite números y un solo punto decimal.
 */
function filterValidNumber() {
  let value = timeInput.value;
  const errorMessage = popupContainer.querySelector(".popup__error-message");

  const hasInvalidChars = /[^0-9.]/.test(value);
  const hasMultipleDots = (value.match(/\./g) || []).length > 1;

  if (hasInvalidChars || hasMultipleDots) {
    errorMessage.classList.add("show");
    value = value.replace(/[^0-9.]/g, "");

    const firstDotIndex = value.indexOf(".");
    if (firstDotIndex !== -1) {
      value =
        value.slice(0, firstDotIndex + 1) +
        value.slice(firstDotIndex + 1).replace(/\./g, "");
    }
  } else {
    errorMessage.classList.remove("show");
  }

  timeInput.value = value;
}

// Oculta el mensaje de error cuando el input gana el foco
timeInput.addEventListener("focus", () => {
  const errorMessage = popupContainer.querySelector(".popup__error-message");
  errorMessage.classList.remove("show");
});

/**
 * Configura todos los eventos para el sistema de ajuste de tiempo:
 * - Clics en los botones de incremento rápido y botón "más"
 * - Validación de input
 * - Confirmación o cancelación en el popup mediante clic o teclado
 */
export function setupAdjustTime(timer) {
  adjustTimeList.addEventListener("click", (e) => {
    const clickedElement = e.target.closest(
      ".time-adjuster__item, .time-adjuster__more"
    );
    if (!clickedElement) return;

    if (clickedElement.classList.contains("time-adjuster__item")) {
      const increment = clickedElement.dataset.timeIncrement;
      handleTimeIncrement(timer, increment);
    } else if (clickedElement.classList.contains("time-adjuster__more")) {
      openTimePopup();
    }
  });

  // Valida el input a medida que el usuario escribe
  timeInput.addEventListener("input", filterValidNumber);

  // Maneja clics en los botones del popup (confirmar / cerrar)
  popupContainer.addEventListener("click", (e) => {
    const clickedButton = e.target.closest(
      "#timePopup-confirm-btn, #timePopup-close-btn"
    );
    if (!clickedButton) return;

    if (clickedButton.id === "timePopup-confirm-btn") {
      handleTimeIncrement(timer, timeInput.value);
    }
    closeTimePopup();
  });

  popupContainer.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== "Escape") return;

    if (e.key === "Enter") {
      handleTimeIncrement(timer, timeInput.value);
      closeTimePopup();
    } else if (e.key === "Escape") {
      closeTimePopup();
    }
  });
}
