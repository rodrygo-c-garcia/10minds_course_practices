const num1 = document.getElementById("number1");
const num2 = document.getElementById("number2");
const selectElement = document.getElementById("operation");
const resultElement = document.getElementById("result");
const formElement = document.getElementById("form");

let selectedOption = selectElement.value;

selectElement.addEventListener("change", (event) => {
  selectedOption = event.target.value;
});

function calculate() {
  let result = 0;
  if (num1.value !== "" && num2.value !== "") {
    if (selectedOption === "resta") {
      result = resta(Number(num1.value), Number(num2.value));
    } else if (selectedOption === "multiplicacion") {
      result = multiplicacion(Number(num1.value), Number(num2.value));
    } else if (selectedOption === "potencia") {
      result = potencia(Number(num1.value), Number(num2.value));
    } else {
      alert("Selecciona una operacion valida!");
    }
    resultElement.textContent = result;
  } else {
    alert("Ingrese los valores!");
  }
}

const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const potencia = (a, b) => a ** b;
