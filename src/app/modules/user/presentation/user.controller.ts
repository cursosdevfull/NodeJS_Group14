import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { EncryptService } from "../application/services/Encrypt.service";
import { UserCreate } from "../application/UserCreate";
import { UserDelete } from "../application/UserDelete";
import { UserGetAll } from "../application/UserGetAll";
import { UserGetAllByRole } from "../application/UserGetAllByRole";
import { UserGetByPage } from "../application/UserGetByPage";
import { UserGetOne } from "../application/UserGetOne";
import { UserUpdate } from "../application/UserUpdate";
import { Address } from "../domain/entities/Address";
import { User } from "../domain/roots/User";
import { NameVO } from "../domain/value-objects/name.vo";
import { UserDto } from "./dtos/user.dto";

export class UserController {
  constructor(
    private readonly userCreate: UserCreate,
    private readonly userGetOne: UserGetOne,
    private readonly userGetAll: UserGetAll,
    private readonly userGetAllByRole: UserGetAllByRole,
    private readonly userUpdate: UserUpdate,
    private readonly userGetByPage: UserGetByPage,
    private readonly userDelete: UserDelete
  ) {}

  async list(req: Request, res: Response) {
    const usersResult = await this.userGetAll.execute();
    if (usersResult.isErr()) {
      return res.status(500).json({
        message: usersResult.error.message,
        stack: usersResult.error.stack,
      });
    }
    res.json(usersResult.value);
  }

  async listByRole(req: Request, res: Response) {
    const { roleId } = req.params;
    const usersResult = await this.userGetAllByRole.execute(roleId);
    if (usersResult.isErr()) {
      return res.status(500).json({
        message: usersResult.error.message,
        stack: usersResult.error.stack,
      });
    }
    res.json(usersResult.value);
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
      country,
      city,
      gender,
      roles,
    } = req.body;

    const nameResult = NameVO.create(name);
    if (nameResult.isErr()) {
      return res.status(411).json({
        message: nameResult.error.message,
        stack: nameResult.error.stack,
      });
    }

    let address: Address | undefined;

    if (number && city && country) {
      address = new Address(street, number, city, country);
    }

    const user = new User({
      id: uuidv4(),
      name: nameResult.value.getValue(),
      lastname,
      email,
      password: await EncryptService.encrypt(password),
      age: age ? parseInt(age) : null,
      gender,
      address,
      roles,
    });

    const userInserted = await this.userCreate.execute(user);
    if (userInserted.isErr()) {
      return res.status(500).json({
        message: userInserted.error.message,
        stack: userInserted.error.stack,
      });
    }

    res.json(userInserted.value);
  }

  async getOne(req: Request, res: Response) {
    const userResult = await this.userGetOne.getOne(req.params.id);
    if (userResult.isErr()) {
      return res.status(500).json({
        message: userResult.error.message,
        stack: userResult.error.stack,
      });
    }

    res.json(UserDto.fromDomainToResponse(userResult.value));
  }

  async getUsersByPage(req: Request, res: Response) {
    const { page, pageSize } = req.params;
    const usersResult = await this.userGetByPage.execute(
      parseInt(page),
      parseInt(pageSize)
    );
    if (usersResult.isErr()) {
      return res.status(500).json({
        message: usersResult.error.message,
        stack: usersResult.error.stack,
      });
    }
    res.json(usersResult.value);
  }

  async update(req: Request, res: Response) {
    const userResult = await this.userGetOne.getOne(req.params.id);

    if (userResult.isErr()) {
      return res.status(500).json({
        message: userResult.error.message,
        stack: userResult.error.stack,
      });
    }

    const user = userResult.value;
    user.update(req.body);

    const userUpdateResult = await this.userUpdate.execute(user);
    if (userUpdateResult.isErr()) {
      return res.status(500).json({
        message: userUpdateResult.error.message,
        stack: userUpdateResult.error.stack,
      });
    }

    res.json(userUpdateResult.value);
  }

  async delete(req: Request, res: Response) {
    const userResult = await this.userGetOne.getOne(req.params.id);

    if (userResult.isErr()) {
      return res.status(500).json({
        message: userResult.error.message,
        stack: userResult.error.stack,
      });
    }

    const user = userResult.value;
    user.delete();

    const userDeleteResult = await this.userDelete.execute(userResult.value);
    if (userDeleteResult.isErr()) {
      return res.status(500).json({
        message: userDeleteResult.error.message,
        stack: userDeleteResult.error.stack,
      });
    }

    res.json(UserDto.fromDomainToResponse(userDeleteResult.value));
  }
}
