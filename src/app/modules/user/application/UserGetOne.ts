import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";

export class UserGetOne {
  constructor(private readonly repository: UserRepository) {}

  async getOne(id: string): Promise<Result<User, Error>> {
    const userFoundResult = await this.repository.getOne(id);
    if (userFoundResult.isErr()) {
      return Promise.resolve(err(new Error(userFoundResult.error.message)));
    }

    const userFound = userFoundResult.value;

    return Promise.resolve(ok(userFound));
  }
}
