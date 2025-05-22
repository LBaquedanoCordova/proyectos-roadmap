import { handleDateChange } from "./filterByDate.js";
import { taskFilterState } from "./toggleTaskStatus.js";
import { updateTaskManagerTitle } from "./taskManagerTitleUpdater.js";
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";

let calendarInstance = null;

/**
 * Devuelve la instancia actual del calendario.
 * Esto permite acceder a la instancia creada desde otros módulos.
 *
 * @returns {flatpickr|null} La instancia de flatpickr o null si no está creada.
 */
function getCalendarInstance() {
  return calendarInstance;
}

/**
 * Inicializa y configura el calendario flatpickr en un input dado.
 * Configura opciones como formato de fecha, rango mínimo, y comportamiento de la UI.
 *
 * @param {HTMLInputElement} input - Elemento input donde se attachará el calendario.
 * @param {Date} [defaultDate=new Date()] - Fecha inicial que se mostrará en el calendario.
 */
function setupCalendar(input, defaultDate = new Date()) {
  // Detecta si el ancho de la ventana es suficientemente grande para usar posición estándar
  const isMobileView = window.innerWidth >= 400;
  const calendarPosition = isMobileView ? "auto" : "auto center";

  // Crea la instancia de flatpickr con configuración personalizada
  calendarInstance = flatpickr(input, {
    altInput: true,
    altFormat: "d M Y",
    dateFormat: "Y-m-d",
    disableMobile: true,
    position: calendarPosition,
    clickOpens: false,
    minDate: new Date(new Date().getFullYear() - 5, 0, 1),
    defaultDate,
    onChange: (selectedDates, dateStr, instance) =>
      // Al cambiar la fecha, llama a handleDateChange con el estado y utilidades necesarias
      handleDateChange(dateStr, instance, {
        taskFilterState,
        updateTaskManagerTitle,
        getCalendarInstance,
      }),
  });
}

/**
 * Abre el calendario si está inicializado.
 */
function openCalendar() {
  if (calendarInstance) calendarInstance.open();
}

export { setupCalendar, openCalendar, getCalendarInstance };
