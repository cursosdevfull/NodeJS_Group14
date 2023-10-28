import { Router } from "express";

import { RoleGetAll } from "../application/RoleGetAll";
import { RoleRepository } from "../domain/repositories/role.repository";
import { RoleInfrastructure } from "../infrastructure/role.infrastructure";
import { RoleController } from "./role.controller";

class RoleRoutes {
  readonly router: Router;

  constructor(private readonly controller: RoleController) {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.get("/", this.controller.list.bind(this.controller));
  }
}

const roleRepository: RoleRepository = new RoleInfrastructure();
const roleGetAll = new RoleGetAll(roleRepository);

const roleController = new RoleController(roleGetAll);

export default new RoleRoutes(roleController).router;
