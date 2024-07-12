// Realizar una función que reciba como parámetro un Array y devuelva otro Array con solamente los dos primeros elementos del Array de entrada.
// Ej. Si la función recibe como parámetro el Array "verduras", entonces el Array resultante será: ["lechuga", "espinaca"].
// Posteriormente, debe verificar el funcionamiento de la función con el array "verduras" como parámetro. Finalmente, imprimir en la consola el array resultante para comprobar el resultado.

let verduras = ["lechuga", "espinaca", "brócoli", "remolacha", "zanahoria"];
const devolverVerduras = (array) => array.slice(0, 2);
devolverVerduras(verduras).forEach((verdura) => console.log(verdura));
