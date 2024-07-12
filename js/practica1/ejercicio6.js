function operacionesAritmeticas(a, b, operacion) {
  const operaciones = {
    suma,
    resta,
    multiplicacion,
    division,
  };

  if (operaciones[operacion]) {
    return operaciones[operacion](a, b);
  } else {
    return "Operación no válida";
  }
}

const suma = (a, b) => a + b;
const resta = (a, b) => a - b;
const multiplicacion = (a, b) => a * b;
const division = (a, b) => a / b;

console.log(operacionesAritmeticas(5, 2, "multiplicacion")); // 3
