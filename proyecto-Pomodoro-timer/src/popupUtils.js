// function openPopup(popupElement, inputElement) {
//     popupElement.classList.add("show");
//     inputElement.focus();
//   }
  
//   function closePopup(popupElement, inputElement) {
//     popupElement.classList.remove("show");
//     inputElement.value = "";
//   }
  

function openPopup(popupElement, inputElement) {
  popupElement.classList.add("popup-show");
  inputElement.focus();
}

function closePopup(popupElement, inputElement) {
  popupElement.classList.remove("popup-show");
  inputElement.value = "";
}

  export { openPopup, closePopup };
  