import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { UserMemory } from './UserMemory';

export class UserInfrastructure implements UserRepository {
  constructor() {}
  save(user: User): Promise<User> {
    UserMemory.users.push(user);
    return Promise.resolve(user);
  }

  getOne(id: string): Promise<User | null> {
    const userFound = UserMemory.users.find((user: User) => user.id === id);
    return userFound ? Promise.resolve(userFound) : Promise.resolve(null);
  }

  getByEmail(email: string): Promise<boolean> {
    const userFound = UserMemory.users.find((user: User) => user.email === email)
    return userFound ? Promise.resolve(true) : Promise.resolve(false);
  }
}
