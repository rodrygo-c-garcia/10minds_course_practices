// Coloque aquí el código JS

// Función para cambiar el color del label cuando el input tenga contenido o valor
function changeLabelColor(input, labelId) {
  console.log(input.type, labelId);

  const label =
    document.querySelector(`label[for=${input.id}]`) ||
    document.getElementById(labelId);
  console.log(label);

  if (input.type === "checkbox") {
    if (input.checked) {
      label.classList.add("active-label");
    } else {
      label.classList.remove("active-label");
    }
  } else if (input.type === "radio") {
    label.classList.add("active-label");
  } else {
    if (input.value !== "") {
      label.classList.add("active-label");
    } else {
      label.classList.remove("active-label");
    }
  }

  changeColorButton();
}

// Función para cambiar el color del botón cuando todos los labels estén activos
function changeColorButton() {
  const labels = document.querySelectorAll("label");
  let allActive = true;

  for (const label of labels) {
    if (!label.classList.contains("active-label")) {
      allActive = false;
      break;
    }
  }

  const button = document.querySelector("button");
  if (allActive) {
    button.classList.add("active-send-data");
  } else {
    button.classList.remove("active-send-data");
  }
}

const btnElement = document.querySelector("button");
btnElement.addEventListener("mousemove", () => {
  alert("¡Gracias por enviar tus datos!");
});
