import { User } from "./User";

export interface UserRepository {
  save(user: User): Promise<User>;
  getOne(id: string): Promise<User | null>;
  getByEmail(email: string): Promise<boolean>;
  getAll(): Promise<User[]>;
}
