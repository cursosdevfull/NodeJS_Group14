import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";

//const pdfMake = require("pdfmake/build/pdfmake");

export class UserUpdate {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<Result<User, Error>> {
    const userResult = await this.repository.getOne(user.properties().id);

    if (userResult.isErr()) {
      return err(new Error(userResult.error.message));
    }

    await this.repository.update(user);

    return Promise.resolve(ok(user));
  }
}
