// Realizar una función que reciba dos Arrays como parámetros y devuelva un nuevo Array con los nombres de las personas contenidas en los dos Arrays de entrada que tengan una edad menor a 18 años.
// El Array resultante debe contener elementos del tipo string, es decir, solamente se desea guardar el nombre de las personas que tengan una edad menor a 18 años.
// Comprobar el correcto funcionamiento de la función con los Arrays "estudiantes" y "docentes" como parámetros de entrada. Finalmente, imprimir en consola el Array resultante.

let estudiantes = [
  { nombre: "Juan Pinto", edad: 35, email: "juan@gmail.com" },
  { nombre: "Pepe Molina", edad: 40, email: "pepe@gmail.com" },
  { nombre: "Daniel Scott", edad: 15, email: "daniel@gmail.com" },
  { nombre: "Pedro Picapiedra", edad: 17, email: "pedro@gmail.com" },
  { nombre: "Joaquin Herbozo", edad: 14, email: "joaquin@gmail.com" },
  { nombre: "Ivar Lopez", edad: 16, email: "ivar@gmail.com" },
];
let profesores = [
  { nombre: "Fernando Candia", edad: 35, email: "fer@gmail.com" },
  { nombre: "Edgar Santos", edad: 18, email: "edgar@gmail.com" },
  { nombre: "Ale Tapia", edad: 17, email: "ale@gmail.com" },
  { nombre: "Carla Flores", edad: 40, email: "carla@gmail.com" },
  { nombre: "Carlos Fuentes", edad: 50, email: "carlos@gmail.com" },
  { nombre: "Alejandro Valda", edad: 17, email: "alejo@gmail.com" },
  { nombre: "Bryan Pinto", edad: 60, email: "bryan@gmail.com" },
];

const menorDeEdad = (estudiantes, profesores) => {
  let menorDeEdad = [];
  estudiantes.forEach((estudiante) => {
    if (estudiante.edad < 18) menorDeEdad.push(estudiante.nombre);
  });

  profesores.forEach((profesor) => {
    if (profesor.edad < 18) menorDeEdad.push(profesor.nombre);
  });

  return menorDeEdad;
};

menorDeEdad(estudiantes, profesores).forEach((personaMenor) => {
  console.log(personaMenor);
});
