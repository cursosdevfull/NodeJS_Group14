import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

export class UserInfrastructure implements UserRepository {
  constructor() {}
  save(user: User) {
    console.log("Saving user: ", user);
  }
}
