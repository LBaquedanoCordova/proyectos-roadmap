import { timerModes } from "./timerState.js";

const navContainer = document.querySelector(".timer-nav__list");
const timerElem = document.querySelector(".timer");

// Actualiza la pantalla del temporizador con los valores del modo seleccionado
const updateTimerDisplay = (mode) => {
  const { minutes, seconds } = timerModes[mode];
  timerElem.firstElementChild.textContent = minutes;
  timerElem.lastElementChild.textContent = seconds;

};

// Cambia el modo del temporizador y reinicia sus valores
export const changeMode = (mode, timer) => {
  // Si ya está en el modo seleccionado, no hace nada
  if (
    timerElem.firstElementChild.textContent === timerModes[mode].minutes &&
    timerElem.lastElementChild.textContent === timerModes[mode].seconds
  )
    return;
  updateTimerDisplay(mode); // Actualiza la pantalla del temporizador

  // Resetea y ajusta el temporizador al nuevo modo
  timer.reset(false);
  timer.setTime(timerModes[mode].minutes, timerModes[mode].seconds);
};

// Maneja el clic en la barra de navegación para cambiar de modo
const handleNavClick = (e) => {
  e.preventDefault();

  //? mejorar la busqueda del li, que no sea por elemento, si no por selector

  const li = e.target.closest(".timer-nav__item");
  const activeItem = navContainer.querySelector(".timer-nav__item--active");

  // if (!li || (activeItem && activeItem === li)) return;

  if (!li || !activeItem) return;

    activeItem.classList.remove("timer-nav__item--active");
    li.classList.add("timer-nav__item--active");
  
  const mode = li.querySelector(".timer-nav__link")?.dataset.time;

  // Si hay un modo válido, dispara un evento para actualizarlo
  if (mode)
    document.dispatchEvent(new CustomEvent("changeMode", { detail: mode }));
};


navContainer.addEventListener('click', handleNavClick);
