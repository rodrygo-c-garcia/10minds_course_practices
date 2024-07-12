function diasSemana(dia) {
  const dias = {
    lunes: "Monday",
    martes: "Tuesday",
    miercoles: "Wednesday",
    jueves: "Thursday",
    viernes: "Friday",
    sábado: "Saturday",
    domingo: "Sunday",
  };

  return dias[dia.toLowerCase()] || "Dia no válido";
}

console.log(diasSemana("MARTes")); // Tuesday
