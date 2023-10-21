import { PageResult } from "@/app/core/domain/page-result.interface";
import { IError } from "@/app/core/error/error.interface";
import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";
import { UserMemory } from "./UserMemory";

export class UserInfrastructure implements UserRepository {
  constructor() {}

  save(user: User): Promise<Result<User, Error>> {
    try {
      UserMemory.add(user);
      return Promise.resolve(ok(user));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  getOne(id: string): Promise<Result<User, Error>> {
    try {
      const userFound = UserMemory.findById(id);

      if (userFound) {
        return Promise.resolve(ok(userFound));
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

  existsUserWithEmail(email: string): Promise<Result<boolean, Error>> {
    try {
      const userFound = UserMemory.findByEmail(email);
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

  getAll(): Promise<Result<User[], Error>> {
    try {
      return Promise.resolve(ok(UserMemory.getAll()));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  getByPage(
    page: number,
    pageSize: number
  ): Promise<Result<PageResult<User>, Error>> {
    try {
      const [data, totalRecords, totalPages] = UserMemory.getPage(
        page,
        pageSize
      );
      const pageResult: PageResult<User> = {
        page,
        totalRecords,
        totalPages,
        data,
      };
      return Promise.resolve(ok(pageResult));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  update(user: User): Promise<Result<User, Error>> {
    console.log(user);
    try {
      UserMemory.update(user);
      return Promise.resolve(ok(user));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }

  delete(id: string): Promise<Result<boolean, Error>> {
    try {
      const position = UserMemory.findIndex(id);
      if (position === -1) {
        const objErr: IError = new Error("User not found");
        objErr.status = 404;
        return Promise.resolve(err(objErr));
      }
      UserMemory.delete(position);
      return Promise.resolve(ok(true));
    } catch (error) {
      const objErr: IError = new Error(error.message);
      objErr.status = 500;

      return Promise.resolve(err(objErr));
    }
  }
}
