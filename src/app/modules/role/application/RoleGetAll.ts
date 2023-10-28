import { err, ok, Result } from "neverthrow";

import { RoleRepository } from "../domain/repositories/role.repository";
import { Role } from "../domain/roots/role";
import { ExceptionApplicationMessage } from "./exceptions/exception";

export class RoleGetAll {
  constructor(private readonly repository: RoleRepository) {}

  async execute(): Promise<Result<Role[], Error>> {
    const rolesFoundResult = await this.repository.getAll();
    if (rolesFoundResult.isErr()) {
      return err(new Error(ExceptionApplicationMessage.ROLES_NOT_FOUND));
    }

    const rolesFound = rolesFoundResult.value;
    return Promise.resolve(ok(rolesFound));
  }
}
