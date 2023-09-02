class Animal {
  public raza: string;
  color: string;
  mamifero: string;

  constructor(mamifero: string, raza: string, color: string) {
    this.raza = raza;
    this.color = color;
    this.mamifero = mamifero;
  }

  public description() {
    //return "Raza: " +  this.raza + " Color: " + this.color
    return `Mamifero: ${this.mamifero} Raza: ${this.raza} Color: ${this.color}`;
  }
}

const animal = new Animal("Canino", "Samoyedo", "blanco");
console.log("raza", animal.raza);
console.log("color", animal.color);
console.log("description", animal.description());
