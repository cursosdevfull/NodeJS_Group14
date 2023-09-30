import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { EncryptService } from "../application/services/Encrypt.service";
import { UserCreate } from "../application/UserCreate";
import { UserGetAll } from "../application/UserGetAll";
import { UserGetOne } from "../application/UserGetOne";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";
import { NameVO } from "../domain/value-objects/name.vo";
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

    //console.log(tratamientoPersona("hombre"));

    //this.list = this.list.bind(this);
  }

  async list(req: Request, res: Response) {
    const users = await this.userGetAll.execute();
    res.json(users);
  }

  async insert(req: Request, res: Response) {
    console.log("Method insert executed");
    const { name, lastname, email, password } = req.body;

    const nameResult = NameVO.create(name);
    if (nameResult.isErr()) {
      console.log("Error: ", nameResult.error.message);
      return res.status(411).json({
        message: nameResult.error.message,
        stack: nameResult.error.stack,
      });
    }

    const user = new User({
      id: uuidv4(),
      name: nameResult.value.getValue(),
      lastname,
      email,
      password: await EncryptService.encrypt(password),
      /*age,
      street,
      number,
      city,
      country,
      gender,*/
    });

    const userInserted = await this.userCreate.insert(user);
    if (userInserted.isErr()) {
      return res.status(500).json({
        message: userInserted.error.message,
        stack: userInserted.error.stack,
      });
    }

    res.json(userInserted.value);
  }

  async getOne(req: Request, res: Response) {
    const user = await this.userGetOne.getOne(req.params.id);
    res.json(user);
  }
}
