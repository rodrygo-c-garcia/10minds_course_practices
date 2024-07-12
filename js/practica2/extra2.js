//Realizar una función que reciba como parámetro un Array y que devuelva un nuevo Array con solamente los números impares contenidos en el Array de entrada.
// Posteriormente, debe verificar el funcionamiento de la función con el array "números" como parámetro. Finalmente, imprimir en la consola el array resultante para comprobar el resultado.

const numeros = [
  98, 60, 78, 48, 100, 15, 11, 32, 78, 95, 36, 50, 51, 32, 40, 89, 13, 5, 100,
  20, 2, 25, 44, 7, 61, 62, 45,
];

const numerosImpares = (array) => {
  return array.filter((numero) => numero % 2 !== 0);
};

console.log(numerosImpares(numeros));
