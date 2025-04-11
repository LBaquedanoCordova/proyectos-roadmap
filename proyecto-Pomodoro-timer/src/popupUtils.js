function openPopup(popupElement, inputElement) {
    popupElement.classList.add("show");
    inputElement.focus();
  }
  
  function closePopup(popupElement, inputElement) {
    popupElement.classList.remove("show");
    inputElement.value = "";
  }
  
  export { openPopup, closePopup };
  