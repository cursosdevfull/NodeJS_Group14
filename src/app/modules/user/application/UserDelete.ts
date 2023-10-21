import { ok, Result } from "neverthrow";

import { UserRepository } from "../domain/repositories/UserRepository";
import { User } from "../domain/roots/User";

export class UserDelete {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<Result<User, Error>> {
    await this.repository.delete(user.properties().id);

    return Promise.resolve(ok(user));
  }
}
