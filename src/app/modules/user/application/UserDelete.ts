import { ok, Result } from "neverthrow";

import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserDelete {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<Result<User, Error>> {
    await this.repository.delete(user.properties().id);

    return Promise.resolve(ok(user));
  }
}
