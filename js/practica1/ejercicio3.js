function esPositivo(numero) {
  if (numero === 0) {
    console.log(numero + ": es cero ps");
  } else if (numero > 0) {
    console.log(numero + ": es positivo");
  } else {
    console.log(numero + ": es negativo");
  }
}

esPositivo(0); // 0: es cero ps
esPositivo(1); // 1: es positivo
esPositivo(-1); // -1: es negativo
