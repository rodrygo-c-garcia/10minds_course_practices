import { esParOImpar } from "./extra3.mjs";

const esNumeroOstring = (valor) => {
  if (typeof valor === "number") {
    return esParOImpar(valor);
  } else if (typeof valor === "string") {
    return valor.length;
  } else {
    return "Solo recibo números o strings";
  }
};

console.log(esNumeroOstring("hola"));
