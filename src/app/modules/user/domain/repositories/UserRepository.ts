import { PageResult } from "@/app/core/domain/page-result.interface";
import { Result } from "neverthrow";

import { User } from "../roots/User";

export interface UserRepository {
  save(user: User): Promise<Result<User, Error>>;
  getOne(id: string): Promise<Result<User, Error>>;
  existsUserWithEmail(email: string): Promise<Result<boolean, Error>>;
  getAll(): Promise<Result<User[], Error>>;
  getByPage(
    page: number,
    pageSize: number
  ): Promise<Result<PageResult<User>, Error>>;
  getAllByRole(roleId: string): Promise<Result<User[], Error>>;
  getImage(id: string): Promise<Result<string, Error>>;
  findUserByEmail(email: string): Promise<Result<User, Error>>;
}
