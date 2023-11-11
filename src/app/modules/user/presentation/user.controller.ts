import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

import { RedisBootstrap } from "../../../bootstrap/redis";
import { EncryptService } from "../../../core/application/services/Encrypt.service";
import { TokenService } from "../../../core/application/services/tokens";
import { UserCreate } from "../application/UserCreate";
import { UserDelete } from "../application/UserDelete";
import { UserGetAll } from "../application/UserGetAll";
import { UserGetAllByRole } from "../application/UserGetAllByRole";
import { UserGetByPage } from "../application/UserGetByPage";
import { UserGetImage } from "../application/UserGetImage";
import { UserGetOne } from "../application/UserGetOne";
import { UserUpdate } from "../application/UserUpdate";
import { Address } from "../domain/entities/Address";
import { Role } from "../domain/entities/Role";
import { User, UserToUpdate } from "../domain/roots/User";
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
    private readonly userDelete: UserDelete,
    private readonly userGetImage: UserGetImage
  ) {}

  async list(req: Request, res: Response) {
    const usersResult = await this.userGetAll.execute();
    if (usersResult.isErr()) {
      return res.status(500).json({
        message: usersResult.error.message,
        stack: usersResult.error.stack,
      });
    }

    RedisBootstrap.redisClient.set(
      res.locals.cacheKey,
      JSON.stringify(usersResult.value)
    );
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
      image,
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
      roles: roles ? roles.map((role: string) => new Role(role)) : [],
      image,
      refreshToken: TokenService.generateRefreshToken(),
    });

    const userInserted = await this.userCreate.execute(user);
    if (userInserted.isErr()) {
      return res.status(500).json({
        message: userInserted.error.message,
        stack: userInserted.error.stack,
      });
    }

    RedisBootstrap.clear("users");

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

    const response = UserDto.fromDomainToResponse(userResult.value);

    RedisBootstrap.redisClient.set(
      res.locals.cacheKey,
      JSON.stringify(response)
    );

    res.json(response);
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
    const { id } = req.params;
    const userToUpdate: UserToUpdate = req.body;

    const userUpdateResult = await this.userUpdate.execute(id, userToUpdate);
    if (userUpdateResult.isErr()) {
      return res.status(500).json({
        message: userUpdateResult.error.message,
        stack: userUpdateResult.error.stack,
      });
    }

    res.json(userUpdateResult.value);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const userDeleteResult = await this.userDelete.execute(id);
    if (userDeleteResult.isErr()) {
      return res.status(500).json({
        message: userDeleteResult.error.message,
        stack: userDeleteResult.error.stack,
      });
    }

    res.json(UserDto.fromDomainToResponse(userDeleteResult.value));
  }

  async getImage(req: Request, res: Response) {
    const imageResult = await this.userGetImage.getImage(req.params.id);
    if (imageResult.isErr()) {
      return res.status(500).json({
        message: imageResult.error.message,
        stack: imageResult.error.stack,
      });
    }

    res.send(imageResult.value);
  }
}
