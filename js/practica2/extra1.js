// Realizar una función que elimine el elemento "remolacha" del Array "verduras".
// Verificar el funcionamiento de la función e imprimir en pantalla el Array verduras para comprobar el ejercicio.
// Ayuda: Investigar cobre el método "splice" de los Arrays en JS.

let verduras = ["lechuga", "espinaca", "brócoli", "remolacha", "zanahoria"];
const eliminarElemento = (array) => {
  let index = array.indexOf("remolacha");
  array.splice(index, 1);
  return array;
};

console.log(eliminarElemento(verduras));
