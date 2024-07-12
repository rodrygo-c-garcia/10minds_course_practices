// Realizar una función que reciba como parámetro un Array y añada los siguientes elementos de tipo string:
// * "tomate" al principio del Array.
// * "cebolla" y "pimiento" al final del Array.
// Posteriormente, debe verificar el funcionamiento de la función con el array "verduras" como parámetro. Finalmente, imprimir en la consola el array "verduras" para comprobar el resultado.

let verduras = ["lechuga", "espinaca", "brócoli", "remolacha", "zanahoria"];

function modificarArray(array) {
  array.unshift("tomate");
  array.push("cebolla", "pimiento");
}

modificarArray(verduras);

verduras.forEach((verdura) => console.log(verdura));
