import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";

export class UserDelete {
  constructor(private readonly repository: UserRepository) {}

  async execute(id: string): Promise<Result<User, Error>> {
    const userFoundResult = await this.repository.getOne(id);
    if (userFoundResult.isErr()) {
      return Promise.resolve(err(new Error(userFoundResult.error.message)));
    }

    const userFound = userFoundResult.value;
    userFound.delete();

    const userDeletedResult = await this.repository.save(userFound);
    if (userDeletedResult.isErr()) {
      return err(new Error(userDeletedResult.error.message));
    }

    const userDeleted = userDeletedResult.value;
    return Promise.resolve(ok(userDeleted));
  }
}
