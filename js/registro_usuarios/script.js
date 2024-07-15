function changeColorLabel(input, ancestorSelector) {
  const $ancestor = document.getElementById(ancestorSelector);
  if (!$ancestor) return;

  const $label = $ancestor.querySelector(`label[for="${input.id}"]`);
  if ($label) {
    $label.style.scale = "1.1";
    $label.style.color = "rgba(11, 37, 89, 0.81)";
  }

  // Agregar evento para revertir el color cuando el input pierde el foco
  input.onblur = function () {
    $label.style.scale = "1";
    $label.style.color = "#fff"; // Revertir al color original (o quitar el estilo)
  };
}

function changeOption() {
  const $forms = document.querySelectorAll(".main__form");
  const $button = document.getElementById("buttonOption");
  const $main = document.getElementById("main");

  if ($forms.length === 0) return;

  const isRegistering = $button.textContent === "Iniciar Sesion";
  const buttonText = isRegistering ? "Registrarme" : "Iniciar Sesion";
  const buttonLoginClass = "options__button--login";
  const buttonRegisterClass = "options__button--register";

  $main.classList.add("hidden");

  setTimeout(() => {
    $forms.forEach((element) => {
      element.classList.toggle("show__none");
    });

    $button.textContent = buttonText;
    $button.classList.toggle(buttonLoginClass, isRegistering);
    $button.classList.toggle(buttonRegisterClass, !isRegistering);

    $main.classList.remove("hidden");
  }, 400);
}
