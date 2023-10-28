import { RoleListResult } from "../../infrastructure/role.infrastructure";

export interface RoleRepository {
  getAll(): Promise<RoleListResult>;
}
