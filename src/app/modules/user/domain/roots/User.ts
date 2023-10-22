import { Address } from "../entities/Address";
import { AgeVO } from "../value-objects/age.vo";
import { EmailVO } from "../value-objects/email.vo";
import { IdVO } from "../value-objects/id.vo";
import { LastnameVO } from "../value-objects/lastname.vo";
import { NameVO } from "../value-objects/name.vo";

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
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(props: UserProperties) {
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
    this.createdAt = new Date();

    const address = new Address();

    if (props.street && props.number && props.city && props.country) {
      address.street = props.street;
      address.number = props.number;
      address.city = props.city;
      address.country = props.country;
    }

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
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    };
  }

  update(userToUpdate: UserUpdate) {
    NameVO.create(userToUpdate.name);
    LastnameVO.create(userToUpdate.lastname);

    Object.assign(this, userToUpdate);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
