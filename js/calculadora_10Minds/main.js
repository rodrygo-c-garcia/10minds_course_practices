function toggleHistorial(option) {
  showDataHistorial(option);
  const historial = document.getElementById("historialCard");
  const isVisible = historial.style.left === "0%";
  historial.style.left = isVisible ? "100%" : "0%";
}

function showDataHistorial(option) {
  $historialList = document.getElementById("historialList");
  if (option === "open") callHistory();
  else $historialList.innerHTML = "";
}

function selectButton(data) {
  const $dataInput = document.getElementById("inputData");
  const $dataOutput = document.getElementById("outputData");
  // Obtener la posición actual del cursor o de la selección
  const startPos = $dataInput.selectionStart;
  const endPos = $dataInput.selectionEnd;
  const inputValue = $dataInput.value;

  if (data === "=") {
    validateInput(inputValue);
  } else if (data === "c") {
    if (inputValue.length > 0) {
      deleteAtCursor($dataInput, startPos, endPos, inputValue);
      $dataOutput.innerText = "0";
    }
  } else {
    insertNumber($dataInput, startPos, endPos, inputValue, data);
    $dataOutput.innerText = "0";
  }
  $dataInput.focus();
}

function insertNumber($dataInput, startPos, endPos, inputValue, data) {
  // Insertar el número en la posición correcta
  const before = inputValue.substring(0, startPos);
  const after = inputValue.substring(endPos, inputValue.length);
  $dataInput.value = before + data + after;

  // Mover el cursor después del número insertado
  const newPos = startPos + data.length;
  $dataInput.setSelectionRange(newPos, newPos);
}

// Validar la entrada del usuario
function validateInput(inputValue) {
  const $dataOutput = document.getElementById("outputData");
  const $dataInput = document.getElementById("inputData");

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
        localStorage.setItem(inputValue, result);
      }
    } catch (error) {
      $dataOutput.innerText = "Error";
    }
  } else {
    $dataOutput.innerText = "Operación no válida";
  }
}

// Verificar si la entrada es una operación matemática válida
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
    $dataOutput.innerText = "0";
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

function createItem(id, input, result) {
  return `<li class="historial__item" id="item${id}">
            <p class="historial__item--content" id="res${id}">${input}=${result}</p>
            <button class="historial__button historial__button--restore" onclick="restoreItem('res${id}')">
              <img src="./img/window-restore-solid.svg" alt="Restore" width="20" height="20">
            </button>
            <button class="historial__button historial__button--delete" onclick="deleteItem('item${id}', '${input}')">
              <img src="./img/delete-left-solid.svg" alt="Delete" width="20" height="20">
            </button>
          </li>`;
}

// Mostrar el historial
function callHistory() {
  const $historialList = document.getElementById("historialList");
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      $historialList.innerHTML += createItem(i + 1, key, value);
    }
  } else {
    const $firstItem = document.createElement("li");
    $firstItem.classList.add("historial__item");
    $firstItem.classList.add("first__item");
    $firstItem.id = "firstItem";
    $firstItem.textContent = "No hay operaciones guardadas";
    $historialList.appendChild($firstItem);
  }
}

// Borrar todo el historial
function trashHistory() {
  if (localStorage.length > 0) {
    if (confirm("¿Estás seguro de que deseas eliminar todo el historial?")) {
      localStorage.clear();
      const $historialList = document.getElementById("historialList");
      $historialList.innerHTML = "";
      callHistory();
    }
  }
}

// Borrar un item del historial
function deleteItem(id, key) {
  const $historialList = document.getElementById("historialList");
  const $deleteItem = document.getElementById(id);
  $historialList.removeChild($deleteItem);
  localStorage.removeItem(key);
  showDataHistorial("close");
  showDataHistorial("open");
}

// Restaurar un item del historial
function restoreItem(id) {
  const $dataInput = document.getElementById("inputData");
  const $dataOutput = document.getElementById("outputData");
  const $restoreItem = document.getElementById(id);
  $dataInput.value = $restoreItem.textContent.split("=")[0];
  $dataOutput.innerText = $restoreItem.textContent;
  toggleHistorial("close");
}

// Mostrar el resultado en el input
document.getElementById("outputData").addEventListener("click", function () {
  const $dataOutput = document.getElementById("outputData");
  const $dataInput = document.getElementById("inputData");
  if ($dataOutput.textContent === "") return;
  $dataInput.value = $dataOutput.textContent.split("=")[0];
  $dataInput.focus();
});
