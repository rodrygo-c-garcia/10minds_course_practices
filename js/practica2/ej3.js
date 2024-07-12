// Crear una función que sea capaz de recibir como parámetro un Array con todas las calificaciones de un determinado alumno y devolver el promedio de dichas calificaciones.
// El Array que la función recibirá como parámetro puede ser de cualquier cantidad de elementos, sin embargo, la función debe devolver el resultado correcto en cualquier caso.
// Debe comprobar el correcto funcionamiento de la función con los dos Arrays detallado a continuación.

const notas_alumno1 = [
  98, 60, 78, 48, 100, 15, 24, 32, 78, 95, 36, 50, 51, 32, 40, 89, 14, 5, 100,
  20, 22, 25, 44, 33, 61, 62, 45,
];

const notas_alumno2 = [56, 45, 48, 36];

const promedio = (notas) => {
  let suma = 0;
  notas.forEach((nota) => (suma += nota));
  return (suma / notas.length).toFixed(2);
};

console.log(promedio(notas_alumno1));
