// Realizar una función que reciba tres parámetros de entrada:
// * Nombre
// * Edad
// * Email
// La función deberá devolver un objeto que tenga como propiedades los tres parámetros de entrada de la función.
// Ej. Si los parámetros de entrada son: ("Maria", 24, "maria@gmail.com"); entonces, el objeto resultante de la función será: {nombre: "Maria", edad: "24", email: "maria@gmail.com}

const crearObjeto = (nombre, edad, email) => {
  return {
    nombre: nombre,
    edad: edad,
    email: email,
  };
};

console.log(crearObjeto("Maria", 24, "maria@gmail.com"));
