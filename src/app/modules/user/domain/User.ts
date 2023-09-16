export class Address {
  street: string;
  number: number;
  city: string;
  country: string;
}

export type GENDER = "Hombre" | "Mujer" | "Otro";

export class User {
  name: string;
  lastname: string;
  email: string;
  password: string;
  age: number;
  address: Address;
  gender: GENDER;

  constructor(
    name: string,
    lastname: string,
    email: string,
    password: string,
    age: number,
    street: string,
    number: number,
    city: string,
    country: string,
    gender: GENDER
  ) {
    if (name.length < 3)
      throw new Error("El nombre debe tener al menos 3 caracteres");
    if (lastname.length < 3)
      throw new Error("El apellido debe tener al menos 3 caracteres");
    if (email.length < 3)
      throw new Error("El email debe tener al menos 3 caracteres");

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      throw new Error("El email no es válido");
    }

    if (age < 18) throw new Error("Debes ser mayor de edad");
    if (age > 140) throw new Error("Edad no válida");

    const address = new Address();
    address.street = street;
    address.number = number;
    address.city = city;
    address.country = country;

    this.name = name;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.age = age;
    this.address = address;
    this.gender = gender;
  }
}
