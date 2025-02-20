
const convertButton = document.querySelector(".convert-button");
const temperatureInput = document.querySelector(".temperature-input");
const resultDisplay = document.querySelector(".result-display");
const form = document.querySelector(".converter-form");

form.addEventListener("submit", e => e.preventDefault());

function updateResultDisplay(text) {
  resultDisplay.textContent = text;
  resultDisplay.classList.add("show");
}

function checkInputs() {
  const elements = form.querySelectorAll(".temperature-input, .unit-select");
  const allFilled = [...elements].every(el => el.value);
  convertButton.disabled = !allFilled;
  allFilled ? convertButton.classList.add('enabled') : convertButton.classList.remove('enabled');
}

form.addEventListener("input", e => {
  console.log(e.target);
  if (e.target.matches(".temperature-input, .unit-select")) {
    checkInputs();
  }
});

form.addEventListener("change", e => {
  if (e.target.matches(".temperature-input, .unit-select")) {
    checkInputs();
  }
});

convertButton.addEventListener("click", () => {
  const temperature = temperatureInput.value;
  const fromUnit = document.querySelector("#from-unit").value;
  const toUnit = document.querySelector("#to-unit").value;

  if (isNaN(temperature)) {
    updateResultDisplay("Ingrese un valor numerico!");
    return;
  }
  const numTemp = parseFloat(temperature);
  let convertedTemp;

  if (fromUnit === toUnit) {
    convertedTemp = numTemp;
  } else {
    const conversions = {
      "celsius-fahrenheit": (numTemp * 9) / 5 + 32,
      "celsius-kelvin": numTemp + 273.15,
      "fahrenheit-celsius": ((numTemp - 32) * 5) / 9,
      "fahrenheit-kelvin": ((numTemp - 32) * 5) / 9 + 273.15,
      "kelvin-celsius": numTemp - 273.15,
      "kelvin-fahrenheit": ((numTemp - 273.15) * 9) / 5 + 32,
    };
    convertedTemp = conversions[`${fromUnit}-${toUnit}`];
  }

  updateResultDisplay(`${Math.round(convertedTemp * 100) / 100}° ${toUnit}`);
});
