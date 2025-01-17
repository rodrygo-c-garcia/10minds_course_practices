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
function registerUser(e, ancestorSelector) {
  e.preventDefault();
  const $ancestor = document.getElementById(ancestorSelector);

  const nombre = $ancestor.querySelector("#name").value;
  const apellido = $ancestor.querySelector("#apellido").value;
  const email = $ancestor.querySelector("#email").value;
  const password = $ancestor.querySelector("#password").value;

  if (validateInputs(nombre, apellido, email, password, "register")) {
    if (!email_repetido(email)) {
      const usuario = new Usuario(nombre, apellido, email, password);
      console.log(usuario);
      localStorage.setItem(email, JSON.stringify(usuario));

      let htmlContent = formingHTML(usuario, "register");
      openModal(htmlContent);

      clearForm(e);
    } else {
      let htmlContent = formingHTML(email, "emailRepetido");
      openModal(htmlContent);
      clearForm(e);
    }
  } else {
    alert("Todos los campos son obligatorios");
  }
}

// Función para iniciar sesión
function loginUser(e, ancestorSelector) {
  e.preventDefault();
  const $ancestor = document.getElementById(ancestorSelector);

  const email = $ancestor.querySelector("#email").value;
  const password = $ancestor.querySelector("#password").value;

  if (validateInputs(null, null, email, password, "login")) {
    if (userExists(email, password) === "correctPassword") {
      const usuario = JSON.parse(localStorage.getItem(email));
      let htmlContent = formingHTML(usuario, "login");
      openModal(htmlContent);
      clearForm(e);
    } else if (userExists(email, password) === "incorrectPassword") {
      let htmlContent = formingHTML(email, "incorrectPassword");
      openModal(htmlContent);
    } else {
      let htmlContent = formingHTML(email, "noUser");
      openModal(htmlContent);
      clearForm(e);
    }
  } else {
    alert("Todos los campos son obligatorios");
  }
}

function clearForm(e) {
  const form = e.target.closest("form");
  if (form) {
    form.reset();
  }
}

// Función para validar si el usuario existe
function userExists(email, password) {
  const user = JSON.parse(localStorage.getItem(email));
  if (user) {
    if (user.password === password) {
      return "correctPassword";
    } else {
      return "incorrectPassword";
    }
  } else {
    return "noUser";
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
  } else if (option === "emailRepetido") {
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
  } else if (option === "noUser") {
    return `
      <h2 class="form__title">Usuario no registrado</h2>
      <p class="form__label data__label"><strong>Email:</strong> ${userData}</p>
      <button
          class="form__button options__button--login"
          id="buttonOption"
          onclick="changeOption() "
        >
          Registrarme
        </button>
    `;
  } else if (option === "incorrectPassword") {
    return `
      <h2 class="form__title">Contraseña Incorrecta</h2>
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

function validateInputs(nombre, apellido, email, password, option) {
  return option === "register"
    ? nombre && apellido && email && password
    : email && password;
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
