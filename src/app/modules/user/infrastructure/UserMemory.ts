import { User } from "../domain/User";

export class UserMemory {
  static users: User[] = [
    new User({
      id: "ef208023-049f-43a9-b497-719ac608878a",
      name: "Juan",
      lastname: "Perez",
      email: "juan.perez@email.com",
      password: "12345",
      age: 34,
      street: "calle azul",
      number: 345,
      city: "LIma",
      country: "Perú",
      gender: "Hombre",
    }),
  ];
}
