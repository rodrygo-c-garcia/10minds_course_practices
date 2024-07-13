const $casilla1 = document.getElementById("1");
const $casilla2 = document.getElementById("2");
const $casilla3 = document.getElementById("3");
const $casilla4 = document.getElementById("4");
const $casilla5 = document.getElementById("5");
const $casilla6 = document.getElementById("6");
const $casilla7 = document.getElementById("7");
const $casilla8 = document.getElementById("8");
const $casilla9 = document.getElementById("9");

let turno = "X";
const $tablero = document.getElementById("tablero");
const $turno = document.getElementById("turno");

$tablero.addEventListener("click", (e) => {
  const casilla = e.target;
  if (
    casilla.classList.contains("tablero__casilla") &&
    casilla.textContent === ""
  ) {
    casilla.textContent = turno;
    verificarGanador(casilla.id, turno);
    turno = turno === "X" ? "O" : "X";

    $turno.textContent = turno;
  }
});

function verificarGanador(casilla, turno) {
  const casillas = [
    $casilla1.textContent,
    $casilla2.textContent,
    $casilla3.textContent,
    $casilla4.textContent,
    $casilla5.textContent,
    $casilla6.textContent,
    $casilla7.textContent,
    $casilla8.textContent,
    $casilla9.textContent,
  ];

  if (
    (casillas[0] === turno && casillas[1] === turno && casillas[2] === turno) ||
    (casillas[3] === turno && casillas[4] === turno && casillas[5] === turno) ||
    (casillas[6] === turno && casillas[7] === turno && casillas[8] === turno) ||
    (casillas[0] === turno && casillas[3] === turno && casillas[6] === turno) ||
    (casillas[1] === turno && casillas[4] === turno && casillas[7] === turno) ||
    (casillas[2] === turno && casillas[5] === turno && casillas[8] === turno) ||
    (casillas[0] === turno && casillas[4] === turno && casillas[8] === turno) ||
    (casillas[2] === turno && casillas[4] === turno && casillas[6] === turno)
  ) {
    alert(`Ganó la letra: ${turno}`);
    reiniciar();
  } else if (!casillas.includes("")) {
    alert("Empate");
    reiniciar();
  }
}

function reiniciar() {
  $casilla1.textContent = "";
  $casilla2.textContent = "";
  $casilla3.textContent = "";
  $casilla4.textContent = "";
  $casilla5.textContent = "";
  $casilla6.textContent = "";
  $casilla7.textContent = "";
  $casilla8.textContent = "";
  $casilla9.textContent = "";

  turno = "X";
  $turno.textContent = turno;
}
