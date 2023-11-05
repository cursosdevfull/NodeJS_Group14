import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User, UserToUpdate } from "../domain/roots/User";

//const pdfMake = require("pdfmake/build/pdfmake");

export class UserUpdate {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    id: string,
    userToUpdate: UserToUpdate
  ): Promise<Result<User, Error>> {
    const userFoundResult = await this.repository.getOne(id);
    if (userFoundResult.isErr()) {
      return err(new Error(userFoundResult.error.message));
    }

    const userFound = userFoundResult.value;
    userFound.update(userToUpdate);

    const userUpdateResult = await this.repository.save(userFound);
    if (userUpdateResult.isErr()) {
      return err(new Error(userUpdateResult.error.message));
    }

    const userUpdated = userUpdateResult.value;
    return Promise.resolve(ok(userUpdated));
  }
}
