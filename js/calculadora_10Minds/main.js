function toggleHistorial() {
  const historial = document.getElementById("historialCard");
  const isVisible = historial.style.left === "0%";
  historial.style.left = isVisible ? "100%" : "0%";
}

function selectButton(data) {
  const $dataInput = document.getElementById("inputData");
  // Obtener la posición actual del cursor o de la selección
  const startPos = $dataInput.selectionStart;
  const endPos = $dataInput.selectionEnd;
  const inputValue = $dataInput.value;

  if (data === "=") {
    limpiarData(inputValue);
  } else if (data === "c") {
    deleteAtCursor($dataInput, startPos, endPos, inputValue);
  } else if (data !== "0" || (inputValue.length > 0 && startPos > 0)) {
    insertarNumero($dataInput, startPos, endPos, inputValue, data);
  }
  $dataInput.focus();
}

function insertarNumero($dataInput, startPos, endPos, inputValue, data) {
  // Insertar el número en la posición correcta
  const before = inputValue.substring(0, startPos);
  const after = inputValue.substring(endPos, inputValue.length);
  $dataInput.value = before + data + after;

  // Mover el cursor después del número insertado
  const newPos = startPos + data.length;
  $dataInput.setSelectionRange(newPos, newPos);
}

function limpiarData(inputValue) {
  if (
    inputValue[inputValue.length - 1] !== "+" &&
    inputValue[inputValue.length - 1] !== "-" &&
    inputValue[inputValue.length - 1] !== "x" &&
    inputValue[inputValue.length - 1] !== "/" &&
    inputValue[inputValue.length - 1] !== "." &&
    inputValue[inputValue.length - 1] !== "%" &&
    inputValue[0] !== "x" &&
    inputValue[0] !== "/"
  ) {
    for (let i = 0; i < inputValue.length; i++) {
      if (inputValue[i] === "x") {
        inputValue = inputValue.replace("x", "*");
      }
    }
    try {
      // Crear una nueva función que evalúa la expresión y retorna el resultado
      const result = new Function(`return ${inputValue}`)();

      // Verificar si el resultado es un número
      if (isNaN(result)) {
        throw new Error("La operación no se puede realizar.");
      }

      console.log(result);
    } catch (error) {
      console.log("Expresion NO valida");
    }
  } else {
    console.log("No se puede calcular con un operador al final");
  }
}

// evitamos que se pueda escribir en el input desde el teclado
document.addEventListener("DOMContentLoaded", (event) => {
  const $dataInput = document.getElementById("inputData");
  $dataInput.focus();
  $dataInput.value = "";

  $dataInput.addEventListener("keydown", function (event) {
    event.preventDefault(); // Esto evita que cualquier tecla presionada tenga efecto en el input
  });
});

// Función para borrar el contenido del input en la posición del cursor
function deleteAtCursor($dataInput, startPos, endPos, inputValue) {
  let before;
  let after;

  if (startPos === endPos) {
    // Si no hay selección
    before = inputValue.substring(0, startPos - 1);
    after = inputValue.substring(endPos, inputValue.length);
  } else {
    // Si hay selección
    before = inputValue.substring(0, startPos);
    after = inputValue.substring(endPos, inputValue.length);
  }

  $dataInput.value = before + after;
  const newPos = startPos > 0 ? startPos - 1 : 0;
  $dataInput.setSelectionRange(newPos, newPos);
}

// Borrar el contenido del input si el botón se mantiene presionado
const $deleteButton = document.getElementById("clearInput");
let deleteTimer;

$deleteButton.addEventListener("mousedown", function () {
  // Iniciar el temporizador cuando el botón se presiona
  deleteTimer = setTimeout(function () {
    const $dataInput = document.getElementById("inputData");
    $dataInput.value = "";
  }, 1500);
});

// Cancelar el temporizador si el botón se suelta antes de 2 segundos
$deleteButton.addEventListener("mouseup", function () {
  clearTimeout(deleteTimer);
});

// cancelar el temporizador si el cursor se mueve fuera del botón
$deleteButton.addEventListener("mouseleave", function () {
  clearTimeout(deleteTimer);
});
