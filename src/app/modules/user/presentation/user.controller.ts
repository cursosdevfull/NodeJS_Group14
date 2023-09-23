import { Request, Response } from "express";

import { UserCreate } from "../application/UserCreate";
import { UserGetAll } from "../application/UserGetAll";
import { UserGetOne } from "../application/UserGetOne";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { UserInfrastructure } from "../infrastructure/UserInfrastructure";

export class UserController {
  private readonly userCreate: UserCreate;
  private readonly userGetOne: UserGetOne;
  private readonly userGetAll: UserGetAll;

  constructor() {
    const userRepository: UserRepository = new UserInfrastructure();
    this.userCreate = new UserCreate(userRepository);
    this.userGetOne = new UserGetOne(userRepository);
    this.userGetAll = new UserGetAll(userRepository);

    //this.list = this.list.bind(this);
  }

  async list(req: Request, res: Response) {
    const users = await this.userGetAll.execute();
    res.json(users);
  }

  async insert(req: Request, res: Response) {
    const {
      name,
      lastname,
      email,
      password,
      age,
      street,
      number,
      city,
      country,
      gender,
    } = req.body;

    const user = new User(
      "7f2d459d-1bc0-41cf-9aff-f9f8f2926dd9",
      name,
      lastname,
      email,
      password,
      age,
      street,
      number,
      city,
      country,
      gender
    );

    const userInserted = await this.userCreate.insert(user);

    res.json(userInserted);
  }

  async getOne(req: Request, res: Response) {
    const user = await this.userGetOne.getOne(req.params.id);
    res.json(user);
  }
}
