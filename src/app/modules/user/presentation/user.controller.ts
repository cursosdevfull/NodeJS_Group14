import { Request, Response } from "express";

import { UserCreate } from "../application/UserCreate";
import { UserGetOne } from "../application/UserGetOne";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserInfrastructure } from "../infrastructure/UserInfrastructure";

export class UserController {
  private readonly userCreate: UserCreate;
  private readonly userGetOne: UserGetOne;

  constructor() {
    const userRepository: UserRepository = new UserInfrastructure();
    this.userCreate = new UserCreate(userRepository);
    this.userGetOne = new UserGetOne(userRepository);
  }

  list(req: Request, res: Response) {}

  async insert(req: Request, res: Response) {
    const user = new User(
      "7f2d459d-1bc0-41cf-9aff-f9f8f2926dd9",
      "Juan",
      "Perez",
      "juan2.perez@email.com",
      "12345",
      34,
      "calle azul",
      345,
      "LIma",
      "Perú",
      "Hombre"
    );

    const userInserted = await this.userCreate.insert(user);

    res.json(userInserted);
  }
}
