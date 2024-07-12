// Selección de elementos del DOM
const $animalName = document.getElementById("animal");
const $peligroExtincion = document.querySelectorAll('input[name="extincion"]');
const $listarCard = document.getElementById("listarCard");
const $form = document.getElementById("form");
const $listarAnimales = document.getElementById("listarAnimales");
const $filaInicial = document.getElementById("filaInicial");

// Función para guardar el animal
function saveAnimal(event) {
  event.preventDefault();

  const isAnimalNameValid = $animalName.value !== "";
  const isExtincionSelected = Array.from($peligroExtincion).some(
    (radio) => radio.checked
  );

  if (isAnimalNameValid && isExtincionSelected) {
    $peligroExtincion.forEach((radio) => {
      if (radio.checked) {
        localStorage.setItem($animalName.value, radio.id);
        createAnimal($animalName.value, radio.id);
        $form.reset();
      }
    });
  } else {
    alert("Debes rellenar todos los campos");
  }
}

// Función para crear el elemento de la lista de animales
function createAnimal(animalName, extincionStatus) {
  if (!document.getElementById(animalName) && checkData()) {
    const newRow = document.createElement("tr");
    newRow.id = animalName;

    const newAnimalCell = document.createElement("td");
    newAnimalCell.textContent = animalName;

    const newExtincionCell = document.createElement("td");
    newExtincionCell.textContent =
      extincionStatus === "siPeligro" ? "SI" : "NO";

    newRow.appendChild(newAnimalCell);
    newRow.appendChild(newExtincionCell);
    $listarAnimales.appendChild(newRow);
  } else {
    alert("El animal ya existe");
  }
}

// Función para obtener y mostrar los animales guardados
function getAnimals() {
  if (checkData()) {
    for (let i = 0; i < localStorage.length; i++) {
      const animalName = localStorage.key(i);
      const extincionStatus = localStorage.getItem(animalName);

      createAnimal(animalName, extincionStatus);
    }
  }
}

// Función para verificar si hay datos en localStorage
function checkData() {
  const hasData = localStorage.length > 0;
  $filaInicial.classList.toggle("show__none", hasData);

  if (hasData) {
    console.log("Hay animales guardados");
  }

  return hasData;
}

// Función para eliminar todos los animales
function deleteAnimals() {
  if (checkData()) {
    for (let i = 0; i < localStorage.length; i++) {
      if (document.getElementById(localStorage.key(i))) {
        document.getElementById(localStorage.key(i)).remove();
      }
    }

    localStorage.clear();
  } else {
    alert("No hay animales guardados");
  }
}

// Función para manejar la eliminación de datos
function deleteData() {
  if (confirm("¿Estás seguro de eliminar todos los animales?")) {
    deleteAnimals();
    getAnimals();
  }
}

// Inicializar la lista de animales al cargar la página
document.addEventListener("DOMContentLoaded", getAnimals);
