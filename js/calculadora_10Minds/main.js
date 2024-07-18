function toggleHistorial() {
  const historial = document.getElementById("historialCard");
  const isVisible = historial.style.left === "0%";
  historial.style.left = isVisible ? "100%" : "0%";
}

function selectButton(data) {
  const $dataInput = document.getElementById("inputData");
  const $dataOutput = document.getElementById("outputData");
  // Obtener la posición actual del cursor o de la selección
  const startPos = $dataInput.selectionStart;
  const endPos = $dataInput.selectionEnd;
  const inputValue = $dataInput.value;

  if (data === "=") {
    limpiarData(inputValue);
  } else if (data === "c") {
    if (inputValue.length > 0) {
      deleteAtCursor($dataInput, startPos, endPos, inputValue);
      $dataOutput.innerText = "";
    }
  } else {
    insertarNumero($dataInput, startPos, endPos, inputValue, data);
    $dataOutput.innerText = "";
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
  const $dataOutput = document.getElementById("outputData");
  const $dataInput = document.getElementById("inputData");

  for (let i = 0; i < inputValue.length; i++) {
    if (inputValue[i] === "x") {
      inputValue = inputValue.replace("x", "*");
    }
  }

  if (isMathOperation(inputValue)) {
    try {
      // Crear una nueva función que evalúa la expresión y retorna el resultado
      const result = new Function(`return ${inputValue}`)();

      // Verificar si el resultado es un número
      if (isNaN(result) || !isFinite(result)) {
        $dataOutput.innerText = "Error en la operación";
      } else {
        $dataOutput.innerText = inputValue + "=" + result;
        $dataInput.value = result;
      }
    } catch (error) {
      $dataOutput.innerText = "Error";
    }
  } else {
    $dataOutput.innerText = "Operación no válida";
  }
}

function isMathOperation(input) {
  const validChars =
    /^[+\-]?(\d*\.?\d+|\(([^()]*|\([^()]*\))*\))+([+\-*\/]\s*[+\-]?(\d*\.?\d+|\(([^()]*|\([^()]*\))*\))*)*$/;

  function hasBalancedParentheses(str) {
    let stack = [];
    for (let char of str) {
      if (char === "(") {
        stack.push(char);
      } else if (char === ")") {
        if (stack.length === 0) return false;
        stack.pop();
      }
    }
    return stack.length === 0; // los parentesis están balanceados (true)
  }

  // console.log(validChars.test(input), hasBalancedParentheses(input));
  return validChars.test(input) && hasBalancedParentheses(input);
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
    const $dataOutput = document.getElementById("outputData");
    $dataInput.value = "";
    $dataOutput.innerText = "";
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
