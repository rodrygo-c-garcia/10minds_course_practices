function toggleHistorial() {
  const historial = document.getElementById("historialCard");
  const isVisible = historial.style.left === "0%";
  historial.style.left = isVisible ? "100%" : "0%";
}
