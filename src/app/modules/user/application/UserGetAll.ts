import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";
import { ExceptionApplicationMessage } from "./exceptions/exception";

export class UserGetAll {
  constructor(private readonly repository: UserRepository) {}

  async execute(): Promise<Result<User[], Error>> {
    const usersFoundResult = await this.repository.getAll();
    if (usersFoundResult.isErr()) {
      return err(new Error(ExceptionApplicationMessage.USERS_NOT_FOUND));
    }

    const usersFound = usersFoundResult.value;
    return Promise.resolve(ok(usersFound));
  }
}
