import { err, ok, Result } from "neverthrow";

import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

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
