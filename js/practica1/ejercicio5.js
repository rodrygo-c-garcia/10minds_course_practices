function esDelMismoTipo(a, b) {
  return typeof a === "number" && typeof b === "number";
}

console.log(esDelMismoTipo(1, "hola")); // false
