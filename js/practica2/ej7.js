// Realizar una función que reciba dos Arrays como parámetros (un array con nombres y un array con apellidos de candidatos a un determinado trabajo).
// Dicha función debe devolver un Array donde en cada elemento se guarde el nombre completo del candidato respectivo en formato string, sabiendo que el nombre y apellido en una misma posición de los Arrays de entrada corresponden a un mismo candidato.
// Por ejemplo, si los Arrays de entrada serían los Arrays "nombres_candidatos" y "apellidos_candidatos" que están definidos abajo; entonces, el Array resultante sería: ["Pedro Lopez", "Jose Miranda", "Juan Pinto", "Edgar Tapia", "Alfredo Zambrana"]
// Comprobar el correcto funcionamiento de la función con los Arrays detallados abajo. Finalmente, imprimir en consola el Array resultante.

let nombres_candidatos = ["Pedro", "Jose", "Juan", "Edgar", "Alfredo"];
let apellidos_candidatos = ["Lopez", "Miranda", "Pinto", "Tapia", "Zambrana"];

const nombreCompleto = (nombres, apellidos) => {
  let nombreCompleto = [];
  for (let i = 0; i < nombres.length; i++)
    nombreCompleto.push(nombres[i] + " " + apellidos[i]);
  return nombreCompleto;
};

nombreCompleto(nombres_candidatos, apellidos_candidatos).forEach(
  (candidato) => {
    console.log(candidato);
  }
);
