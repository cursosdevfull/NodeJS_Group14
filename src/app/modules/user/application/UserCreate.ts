import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

export class UserCreate {
  constructor(private readonly repository: UserRepository) {}

  insert(user: User): void {
    this.repository.save(user);
  }
}
