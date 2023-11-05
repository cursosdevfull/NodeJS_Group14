import { Address } from "../entities/Address";
import { Role } from "../entities/Role";
import { AgeVO } from "../value-objects/age.vo";
import { EmailVO } from "../value-objects/email.vo";
import { IdVO } from "../value-objects/id.vo";
import { LastnameVO } from "../value-objects/lastname.vo";
import { NameVO } from "../value-objects/name.vo";
import { RoleVO } from "../value-objects/role.vo";

export type GENDER = "Hombre" | "Mujer" | "Otro";

export interface UserEssentials {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  roles: Role[];
}

export interface UserOptionals {
  age: number | null;
  address: Address | null;
  gender: GENDER | null;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
  image: string | null;
}

export type UserToUpdate = Partial<
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
  private roles: Role[];
  private image: string;
  private readonly createdAt: Date;
  private updatedAt: Date | null;
  private deletedAt: Date | null;

  constructor(props: UserProperties) {
    IdVO.create(props.id);
    NameVO.create(props.name);
    LastnameVO.create(props.lastname);
    EmailVO.create(props.email);
    AgeVO.create(props.age);
    RoleVO.create<Role>(props.roles);

    Object.assign(this, props);
    this.createdAt = new Date();
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
      roles: this.roles,
      image: this.image,
    };
  }

  update(userToUpdate: UserToUpdate) {
    if (userToUpdate.name) NameVO.create(userToUpdate.name);
    if (userToUpdate.lastname) LastnameVO.create(userToUpdate.lastname);

    Object.assign(this, userToUpdate);
    this.updatedAt = new Date();
  }

  delete() {
    this.deletedAt = new Date();
  }
}
