class Usuario {
  constructor(nombre, apellido, email, password) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.email = email;
    this.password = password;
  }

  static fromLogin(email, password) {
    return new Usuario(null, null, email, password);
  }
}
