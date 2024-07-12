// Desarrollar una función que reciba un Array de empleados y devuelva la suma de los salarios de solamente los empleados que tengan item (item: true).
// Comprobar el correcto funcionamiento de la función con el Array "empleados" que se define a continuación. Finalmente, imprimir en consola el valor de la suma de dichos salarios.

let empleados = [
  { nombre: "Juan Pérez", salario: 3000, item: true },
  { nombre: "Valeria Wayar", salario: 2500, item: false },
  { nombre: "Roxana Sanz", salario: 1800, item: true },
  { nombre: "Michael Bueno", salario: 4500, item: false },
  { nombre: "Ruth Tapia", salario: 1500, item: true },
  { nombre: "Pepe Tapia", salario: 40000, item: true },
  { nombre: "Ruth Tapia", salario: 8500, item: false },
];

const sumarSalarios = (empleados) => {
  let suma = 0;
  empleados.forEach((empleado) => {
    if (empleado.item) suma += empleado.salario;
  });
  return suma;
};

console.log(sumarSalarios(empleados));
