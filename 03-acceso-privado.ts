class Usuario {
  name: string;
  email: string;
  private password: string;

  constructor(name: string, email: string, password: string) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  changeRandomPassword() {
    const newPassword = this.password + (Math.random() * 100 + 1).toString();
    console.log("new password", newPassword);
  }
}

const usuario = new Usuario("Carla", "carla@correo.com", "12345");
//console.log(usuario.password)
//usuario.password = "6789"
usuario.changeRandomPassword();
