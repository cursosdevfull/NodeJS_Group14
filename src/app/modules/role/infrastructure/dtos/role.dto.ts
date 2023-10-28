import { Role } from "../../domain/roots/role";
import { RoleEntity } from "../entities/role.entity";

export class RoleDto {
  static fromDataToDomain(roleEntity: RoleEntity): Role {
    return new Role({ id: roleEntity.id, name: roleEntity.name });
  }
}
