import { err, ok, Result } from "neverthrow";

import { DatabaseRelation } from "../../../bootstrap/database-relation";
import { IError } from "../../../core/error/error.interface";
import { RoleRepository } from "../domain/repositories/role.repository";
import { Role } from "../domain/roots/role";
import { RoleDto } from "./dtos/role.dto";
import { RoleEntity } from "./entities/role.entity";

export type RoleListResult = Result<Role[], Error>;

export class RoleInfrastructure implements RoleRepository {
  async getAll(): Promise<RoleListResult> {
    try {
      const repository =
        DatabaseRelation.dataSource.manager.getRepository(RoleEntity);

      const rolesFound = await repository.find();

      const roles: Role[] = rolesFound.map((role) =>
        RoleDto.fromDataToDomain(role)
      );

      return Promise.resolve(ok(roles));
    } catch (error) {
      const objError: IError = new Error(error.message);
      objError.status = 500;
      return Promise.resolve(err(objError));
    }
  }
}
