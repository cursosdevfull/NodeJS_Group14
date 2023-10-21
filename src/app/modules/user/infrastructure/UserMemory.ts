import { User } from "../domain/roots/User";

export class UserMemory {
  private static users: User[] = [
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

  static findIndex(id: string): number {
    return this.users.findIndex((user) => user.properties().id === id);
  }

  static delete(position: number) {
    this.users.splice(position, 1);
  }

  static getPage(page: number, pageSize: number): [User[], number, number] {
    const data = this.users.slice((page - 1) * pageSize, page * pageSize);
    const totalRecords = this.users.length;
    const totalPages = Math.ceil(totalRecords / pageSize);

    return [data, totalRecords, totalPages];
  }

  static findByEmail(email: string) {
    return this.users.find((user: User) => user.properties().email === email);
  }

  static findById(id: string) {
    return this.users.find(
      (user: User) =>
        user.properties().id === id && !user.properties().deletedAt
    );
  }

  static add(user: User) {
    this.users.push(user);
  }

  static getAll(): User[] {
    return [...this.users.filter((user) => !user.properties().deletedAt)];
  }

  static update(user: User) {
    const position = this.findIndex(user.properties().id);
    this.users[position] = user;
  }
}
