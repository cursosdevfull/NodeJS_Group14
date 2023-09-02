class Person {
  firstname: string;
  lastname: string;
  age: number;

  constructor(firstname: string, lastname: string, age: number) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.age = age;
  }

  properties() {
    return {
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
    };
  }
}

class Adult extends Person {
  licenseDriver: string;

  constructor(
    firstname: string,
    lastname: string,
    age: number,
    licenseDriver: string
  ) {
    super(firstname, lastname, age);
    this.licenseDriver = licenseDriver;
  }
}

const adult: Person = new Adult("Sergio", "Hidalgo", 23, "abc-123");
console.log(adult.properties());
