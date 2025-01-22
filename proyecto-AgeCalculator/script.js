import "js-datepicker/dist/datepicker.min.css";
import datepicker from "js-datepicker";
import { DateTime } from "luxon";

const inputElement = document.getElementById("fecha");
const formElement = document.querySelector("form");
const result = document.getElementById("result");
const btn = document.querySelector('input[type="submit"]');
btn.focus();

const calendar = datepicker(inputElement, {
  formatter: (input, date) => {
    input.value = date.toISOString().split("T")[0];
  },
  position: 'c',
  maxDate: new Date(),
  showAllDates: true,
  startDay: 1,
  overlayPlaceholder: "Ingresa un año",
  overlayButton: "Dale Click",
});

function isDateValid(fecha, inicio, fin) {
  const fechaObjeto = DateTime.fromISO(fecha);
  const inicioObjeto = DateTime.fromISO(inicio);
  const finObjeto = DateTime.fromISO(fin);

  return fechaObjeto >= inicioObjeto && fechaObjeto <= finObjeto;
}

function updateResult(message, isValid) {
  result.textContent = message;
  result.className = `${isValid ? "valid" : "notValid"}`;
}

function calculateAge() {
  const fechaNacimiento = DateTime.fromISO(inputElement.value || "");
  if (!fechaNacimiento.isValid) {
    updateResult("Ingresa un fecha de valida", false);
    return;
  }

  const hoy = DateTime.now();
  const timeDifference = hoy
    .diff(fechaNacimiento, ["years", "months", "days"])
    .toObject();
  const isValid = isDateValid(
    inputElement.value,
    hoy.minus({ years: 100 }).toISODate(),
    hoy.toISODate()
  );

  if (isValid) {
    updateResult(
      `Tienes ${timeDifference.years} años ${
        timeDifference.months
      } meses ${Math.floor(timeDifference.days)} dias`, true);
  } else {
    updateResult("Ingresa una fecha válida dentro del rango permitido", false)
  }
}

formElement.addEventListener("submit", (e) => {
  e.preventDefault();
  calculateAge();
});
