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
  update(user: User): Promise<Result<User, Error>>;
  delete(id: string): Promise<Result<boolean, Error>>;
  getAllByRole(roleId: string): Promise<Result<User[], Error>>;
}
