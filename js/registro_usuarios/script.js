function calcular(operacion, num1, num2) {
  let resultado;

  switch (operacion) {
    case "sumar":
      resultado = num1 + num2;
      break;
    case "restar":
      resultado = num1 - num2;
      break;
    case "multiplicar":
      resultado = num1 * num2;
      break;
    case "dividir":
      resultado = num1 / num2;
      break;
    default:
      console.log("Opción inválida");
      return;
  }

  console.log(`El resultado de ${operacion} ${num1} y ${num2} es ${resultado}`);
}

// Ejemplos de uso
calcular("sumar", 5, 3); // El resultado de sumar 5 y 3 es 8
calcular("restar", 10, 4); // El resultado de restar 10 y 4 es 6
calcular("multiplicar", 2, 6); // El resultado de multiplicar 2 y 6 es 12
calcular("dividir", 8, 2); // El resultado de dividir 8 y 2 es 4
