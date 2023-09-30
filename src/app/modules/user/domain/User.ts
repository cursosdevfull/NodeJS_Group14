import { AgeVO } from "./value-objects/age.vo";
import { EmailVO } from "./value-objects/email.vo";
import { IdVO } from "./value-objects/id.vo";
import { LastnameVO } from "./value-objects/lastname.vo";
import { NameVO } from "./value-objects/name.vo";

export class Address {
  street: string;
  number: number;
  city: string;
  country: string;
}

export type GENDER = "Hombre" | "Mujer" | "Otro";

export interface UserEssentials {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserOptionals {
  age: number;
  street: string;
  number: number;
  city: string;
  country: string;
  gender: GENDER;
}

/*export interface UserUpdate {
  name: string;
  lastname: string;
  password: string;
  age: number;
  street: string;
  number: number;
  city: string;
  country: string;
  gender: GENDER
}*/

export type UserUpdate = Partial<
  Pick<UserEssentials, "name" | "lastname" | "password"> & UserOptionals
>;

export type UserProperties = UserEssentials & Partial<UserOptionals>;

export class User {
  private readonly id: string;
  private name: string;
  private lastname: string;
  private readonly email: string;
  private password: string;
  private age: number;
  private address: Address;
  private gender: GENDER;

  constructor(props: UserProperties) {
    console.log("Props", props);
    IdVO.create(props.id);
    NameVO.create(props.name);
    LastnameVO.create(props.lastname);
    EmailVO.create(props.email);
    AgeVO.create(props.age);

    if (props.age && props.age < 18) {
      console.log("props.age", props.age);
      throw new Error("Debes ser mayor de edad");
    }
    if (props.age && props.age > 140) throw new Error("Edad no válida");

    Object.assign(this, props);

    const address = new Address();

    if (props.street && props.number && props.city && props.country) {
      address.street = props.street;
      address.number = props.number;
      address.city = props.city;
      address.country = props.country;
    }
    /*    address.street = street ?? ""; // street || "";
    address.number = number ?? 0;
    address.city = city ?? "";
    address.country = country ?? "";*/

    this.id = props.id;
    this.name = props.name;
    this.lastname = props.lastname;
    this.email = props.email;
    this.password = props.password;
    if (props.age) this.age = props.age;
    this.address = address;
    if (props.gender) {
      this.gender = props.gender;
    }
  }

  properties() {
    return {
      id: this.id,
      name: this.name,
      lastname: this.lastname,
      email: this.email,
      password: this.password,
      age: this.age,
      address: this.address,
      gender: this.gender,
    };
  }

  update(userToUpdate: UserUpdate) {
    NameVO.create(userToUpdate.name);
    LastnameVO.create(userToUpdate.lastname);
  }
}
