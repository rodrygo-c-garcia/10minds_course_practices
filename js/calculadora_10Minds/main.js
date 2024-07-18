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

  console.log("startPos ", startPos);
  console.log("endPos ", endPos);
  console.log("inputValue ", inputValue);

  // Caso especial cuando el valor es "0"
  if (data !== "0" || (inputValue.length > 0 && startPos > 0)) {
    // Insertar el número en la posición correcta
    const before = inputValue.substring(0, startPos);
    const after = inputValue.substring(endPos, inputValue.length);
    $dataInput.value = before + data + after;

    // Mover el cursor después del número insertado
    const newPos = startPos + data.length;
    $dataInput.setSelectionRange(newPos, newPos);
  } else {
    console.log("Caso especial");
  }

  $dataInput.focus();
}

document.addEventListener("DOMContentLoaded", (event) => {
  const $dataInput = document.getElementById("inputData");
  $dataInput.focus();
  $dataInput.value = "";

  $dataInput.addEventListener("keydown", function (event) {
    event.preventDefault(); // Esto evita que cualquier tecla presionada tenga efecto en el input
  });
});
