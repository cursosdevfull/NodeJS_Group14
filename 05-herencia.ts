class Animal {
  breed: string;
  color: string;

  constructor(breed: string, color: string) {
    this.breed = breed;
    this.color = color;
  }

  description() {
    return `Breed: ${this.breed}. Color: ${this.color}`;
  }
}

class Mamal extends Animal {
  kind: string = "Feline";
}

const mamal = new Mamal("Feline", "yellow");
console.log("Kind", mamal.kind);
