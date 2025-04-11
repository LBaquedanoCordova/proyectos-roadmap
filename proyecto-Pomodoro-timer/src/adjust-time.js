import { openPopup, closePopup } from "./popupUtils.js";

const adjustTimeList = document.querySelector(".time-adjuster__list");
const popupContainer = document.querySelector(".popup--adjust-time");
const timeInput = popupContainer.querySelector("#timePopup-input");

function handleTimeIncrement(timer, minutes) {
  if (!minutes || (minutes === '0')) return;
  const increment = parseFloat(minutes);
  timer.addTime(increment);
}

function openTimePopup() {
  openPopup(popupContainer, timeInput);
}

function closeTimePopup() {
  closePopup(popupContainer, timeInput);
}

function filterValidNumber() {
    let value = timeInput.value;
    const errorMessage = popupContainer.querySelector('.popup__error-message');
  
    const hasInvalidChars = /[^0-9.]/.test(value);

    const hasMultipleDots = (value.match(/\./g) || []).length > 1;

    if (hasInvalidChars || hasMultipleDots) {
      errorMessage.classList.add('show');
      value = value.replace(/[^0-9.]/g, ''); 
      const firstDotIndex = value.indexOf('.');
      if (firstDotIndex !== -1) {
        value = value.slice(0, firstDotIndex + 1) +
                value.slice(firstDotIndex + 1).replace(/\./g, '');
      }
    } else {
      errorMessage.classList.remove('show');
    }
  
    timeInput.value = value;
  }


  // Ocultar el mensaje cuando el usuario hace foco en el input
  timeInput.addEventListener("focus", () => {
    const errorMessage = popupContainer.querySelector('.popup__error-message');
    errorMessage.classList.remove('show');
  });
  

export function setupAdjustTime(timer) {
  adjustTimeList.addEventListener("click", (e) => {
    const clickedElement = e.target.closest(
      //nota el elemento boton con la clase adjust-time-button fue reemplazdo por un elemento li
      //entonces analizar como manejar el nuevo nombre de la clase del li, o ver si se puede mantener.
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

  timeInput.addEventListener("input", filterValidNumber);

  popupContainer.addEventListener("click", (e) => {
    const clickedButton = e.target.closest("#timePopup-confirm-btn, #timePopup-close-btn");
    if (!clickedButton) return;

    if (clickedButton.id === "timePopup-confirm-btn") {
        handleTimeIncrement(timer, timeInput.value);
      }
    closeTimePopup();
  });

  popupContainer.addEventListener("keydown", e => {
    if (e.key !== 'Enter' && e.key !== 'Escape') return;

    if (e.key === "Enter") {
      handleTimeIncrement(timer, timeInput.value);
      closeTimePopup()
    } else if (e.key === "Escape") {
      closeTimePopup()
    }
  });
}
