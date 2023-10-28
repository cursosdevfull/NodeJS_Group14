import { err, ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";
import { ExceptionApplicationMessage } from "./exceptions/exception";

export class UserGetAllByRole {
  constructor(private readonly repository: UserRepository) {}

  async execute(roleId: string): Promise<Result<User[], Error>> {
    const usersFoundResult = await this.repository.getAllByRole(roleId);
    if (usersFoundResult.isErr()) {
      return err(new Error(ExceptionApplicationMessage.USERS_NOT_FOUND));
    }

    const usersFound = usersFoundResult.value;
    return Promise.resolve(ok(usersFound));
  }
}
