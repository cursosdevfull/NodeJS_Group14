interface UserProperties {
  userId: string;
  firstname: string;
  lastname: string;
  age?: number;
  gender?: string;
  email?: string;
  tall?: number;
}

interface IUser {
  update(): void;
  delete(): void;
  reconstitute(): void;
}

class User implements UserProperties, IUser {
  userId: string;
  firstname: string;
  lastname: string;
  age: number;
  gender: string;
  email: string;
  tall: number;

  /*constructor(userId: string, firstname: string, lastname: string, age: number, gender: string, email: string, tall: number) {
        this.userId = userId
        this.firstname = firstname
        this.lastname = lastname
        this.age = age
        this.gender = gender
        this.email = email
        this.tall = tall
    }*/

  constructor(obj: UserProperties) {
    Object.assign(this, obj);
    /* this.userId = obj.userId
        this.firstname = obj.firstname
        this.lastname = obj.lastname
        this.age = obj.age
        this.gender = obj.gender
        this.email = obj.email
        this.tall = obj.tall*/
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
  reconstitute(): void {
    throw new Error("Method not implemented.");
  }
}

//const user = new User("3eb7d622-9f1e-448d-bc25-aabd47a33a02", "Juana", "Daniel", 34, "F", "juana.daniel@correo.com", 179)
const properties: UserProperties = {
  userId: "3eb7d622-9f1e-448d-bc25-aabd47a33a02",
  firstname: "Juana",
  lastname: "Daniel",
  //age: 34,
  //gender: "F",
  //email: "juana.daniel@correo.com",
  //tall: 179
};
const user = new User(properties);

console.log(user);
