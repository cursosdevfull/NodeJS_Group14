class Usuario {
  private readonly userId: string;
  name: string;
  readonly email: string;
  password: string;

  constructor(name: string, email: string, password: string) {
    this.userId = "7f894cf0-2f2f-47a4-b4bf-75c260e01a16";
    this.name = name;
    this.email = email;
    this.password = password;
  }

  properties() {
    return {
      userId: this.userId,
      name: this.name,
      email: this.email,
      password: this.password,
    };
  }

  update() {
    //this.userId = "6789"
  }
}

const usuario = new Usuario("Jimena", "jimena@correo.com", "12345");
console.log(usuario);
usuario.update();
console.log(usuario);
