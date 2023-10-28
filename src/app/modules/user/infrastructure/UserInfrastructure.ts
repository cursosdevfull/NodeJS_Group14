import { err, ok, Result } from "neverthrow";
import { IsNull } from "typeorm";

import { DatabaseRelation } from "../../../bootstrap/database-relation";
import { PageResult } from "../../../core/domain/page-result.interface";
import { IError } from "../../../core/error/error.interface";
import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";
import { UserDto } from "./dtos/User.dto";
import { UserEntity } from "./entities/user.entity";

//import { UserMemory } from "./UserMemory";
export class UserInfrastructure implements UserRepository {
  constructor() {}

  async save(user: User): Promise<Result<User, Error>> {
    try {
      const userEntity: UserEntity = UserDto.fromDomainToData(user);

      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);
      await repository.save(userEntity);

      return Promise.resolve(ok(user));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  async getOne(id: string): Promise<Result<User, Error>> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);

      const userFound = await repository.findOne({
        where: { id, deletedAt: IsNull() },
        relations: ["roles"],
      });

      if (userFound) {
        return Promise.resolve(ok(UserDto.fromDataToDomain(userFound)));
      } else {
        const objErr: IError = new Error("User not found");
        objErr.status = 404;
        return Promise.resolve(err(objErr));
      }
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  async existsUserWithEmail(email: string): Promise<Result<boolean, Error>> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);

      const userFound = await repository.findOne({ where: { email } });
      if (userFound) {
        return Promise.resolve(ok(true));
      } else {
        return Promise.resolve(ok(false));
      }
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  async getAll(): Promise<Result<User[], Error>> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);

      const usersFound = await repository.find({
        where: { deletedAt: IsNull() },
        relations: ["roles"],
      });

      return Promise.resolve(
        ok(usersFound.map((userFound) => UserDto.fromDataToDomain(userFound)))
      );
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  async getByPage(
    page: number,
    pageSize: number
  ): Promise<Result<PageResult<User>, Error>> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);
      const [data, totalRecords] = await repository.findAndCount({
        skip: page * pageSize,
        take: pageSize,
        where: { deletedAt: IsNull() },
        relations: ["roles"],
      });

      const totalPages = Math.ceil(totalRecords / pageSize);

      const users = data.map((userFound) =>
        UserDto.fromDataToDomain(userFound)
      );

      const pageResult: PageResult<User> = {
        page,
        totalRecords,
        totalPages,
        data: users,
      };
      return Promise.resolve(ok(pageResult));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  async update(user: User): Promise<Result<User, Error>> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);

      const userEntity: UserEntity = UserDto.fromDomainToData(user);
      await repository.save(userEntity);

      return Promise.resolve(ok(user));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  async delete(id: string): Promise<Result<boolean, Error>> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);

      const userFound = await repository.findOne({
        where: { id, deletedAt: IsNull() },
      });

      if (!userFound) {
        const objErr: IError = new Error("User not found");
        objErr.status = 404;
        return Promise.resolve(err(objErr));
      }

      const user = UserDto.fromDataToDomain(userFound);
      user.delete();

      const userDeleted = UserDto.fromDomainToData(user);
      await repository.save(userDeleted);

      return Promise.resolve(ok(true));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  async getAllByRole(roleId: string): Promise<Result<User[], Error>> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(UserEntity);

      const usersFound = await repository.find({
        where: { deletedAt: IsNull(), roles: { id: roleId } },
        relations: ["roles"],
      });

      return Promise.resolve(
        ok(usersFound.map((userFound) => UserDto.fromDataToDomain(userFound)))
      );
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }
}
