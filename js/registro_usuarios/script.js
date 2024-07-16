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
  closeModal();
  const $forms = document.querySelectorAll(".main__form");
  const $main = document.getElementById("main");
  const $button = document.getElementById("buttonOption");

  if ($forms.length === 0) return;

  const isRegistering = $button.textContent.trim() === "Iniciar Sesion";
  const buttonText = isRegistering ? "Registrarme" : "Iniciar Sesion";
  const buttonLoginClass = "options__button--login";
  const buttonRegisterClass = "options__button--register";

  $main.classList.add("hidden");

  setTimeout(() => {
    $forms.forEach((element) => {
      element.classList.toggle("show__none");
    });

    $button.textContent = buttonText;
    $button.classList.toggle(buttonRegisterClass, isRegistering);
    $button.classList.toggle(buttonLoginClass, !isRegistering);

    $main.classList.remove("hidden");
  }, 400);
}

// funcion para registrar usuario
function registerUser(e) {
  e.preventDefault();

  const nombre = document.getElementById("name").value;
  const apellido = document.getElementById("apellido").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (validateInputs(nombre, apellido, email, password)) {
    if (!email_repetido(email)) {
      const usuario = new Usuario(nombre, apellido, email, password);
      console.log(usuario);
      localStorage.setItem(email, JSON.stringify(usuario));

      let htmlContent = formingHTML(usuario, "register");
      openModal(htmlContent);

      // Limpiar formulario
      const form = e.target.closest("form");
      if (form) {
        form.reset();
      }
    } else {
      let htmlContent = formingHTML(email, "email");
      openModal(htmlContent);
    }
  } else {
    alert("Todos los campos son obligatorios");
  }
}

function formingHTML(userData, option) {
  if (option === "login") {
    return `
      <h2 class="form__title">Bienvenido al Sistema</h2>
      <p class="form__label data__label"><strong>Email:</strong> ${userData.email}</p>
    `;
  } else if (option === "register") {
    return `
      <h2 class="form__title">Tus Datos Registrados</h2>
      <p class="form__label data__label"><strong>Nombre:</strong> ${userData.nombre}</p>
      <p class="form__label data__label"><strong>Apellido:</strong> ${userData.apellido}</p>
      <p class="form__label data__label"><strong>Email:</strong> ${userData.email}</p>
      <button
          class="form__button options__button--login"
          id="buttonOption"
          onclick="changeOption() "
        >
          Iniciar Sesion
        </button>
    `;
  } else if (option === "email") {
    return `
      <h2 class="form__title">Email ya registrado</h2>
      <p class="form__label data__label"><strong>Email:</strong> ${userData}</p>
      <button
          class="form__button options__button--login"
          id="buttonOption"
          onclick="changeOption() "
        >
          Iniciar Sesion
        </button>
    `;
  }
}

// Función para validar si el email ya está registrado
function email_repetido(email) {
  let repetido = false;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i) === email) {
      repetido = true;
      break;
    }
  }
  return repetido;
}

function validateInputs(nombre, apellido, email, password) {
  return nombre && apellido && email && password;
}

// Función para abrir el modal
function openModal(htmlContent) {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";

  // Mostrar datos del usuario en el modal
  const modalContent = document.getElementById("modalContent");
  modalContent.innerHTML = htmlContent;
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}
