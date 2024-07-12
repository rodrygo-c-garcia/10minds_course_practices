// Desarrollar una función que reciba un Array de empleados y devuelva otro Array de empleados que tengan salarios mayores o iguales a 3000$.
// El Array resultante de la función debe ser un Array que contenga objetos como elementos.
// Comprobar el correcto funcionamiento de la función con el Array "empleados" que se define a continuación. Finalmente, imprimir en consola el Array resultante.

let empleados = [
  { nombre: "Juan Pérez", salario: 3000, item: true },
  { nombre: "Valeria Wayar", salario: 2500, item: false },
  { nombre: "Roxana Sanz", salario: 1800, item: true },
  { nombre: "Michael Bueno", salario: 4500, item: false },
  { nombre: "Ruth Tapia", salario: 1500, item: true },
  { nombre: "Pepe Tapia", salario: 40000, item: true },
  { nombre: "Ruth Tapia", salario: 8500, item: false },
];

const empleadosConSalarioMayorOIgualA3000 = (empleados) =>
  empleados.filter((empleado) => empleado.salario >= 3000);

empleadosConSalarioMayorOIgualA3000(empleados).forEach((element) => {
  console.log(element);
});
