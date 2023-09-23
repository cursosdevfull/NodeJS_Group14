import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserCreate {
  constructor(private readonly repository: UserRepository) {}

  async insert(user: User): Promise<User> {
    const userInserted = await this.repository.save(user);
    return userInserted;
  }
}
