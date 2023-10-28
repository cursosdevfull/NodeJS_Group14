import { Router } from "express";

import {
  UploadBuilder,
  UploadLocal,
} from "../../../core/middlewares/upload.middleware";
import { UserCreate } from "../application/UserCreate";
import { UserDelete } from "../application/UserDelete";
import { UserGetAll } from "../application/UserGetAll";
import { UserGetAllByRole } from "../application/UserGetAllByRole";
import { UserGetByPage } from "../application/UserGetByPage";
import { UserGetOne } from "../application/UserGetOne";
import { UserUpdate } from "../application/UserUpdate";
import { UserRepository } from "../domain/repositories/UserRepository";
import { UserInfrastructure } from "../infrastructure/UserInfrastructure";
import { UserController } from "./user.controller";

class UserRoutes {
  readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.get("/", this.controller.list.bind(this.controller));
    this.router.get("/:id", this.controller.getOne.bind(this.controller));
    this.router.post(
      "/",
      new UploadLocal().save(
        new UploadBuilder()
          .addFieldname("image")
          .addAllowedExtensions(["image/png", "image/jpg", "image/jpeg"])
          .addDestination("public")
          .addIsPublic(true)
          .addMaxSize(5000000)
          .build()
      ),
      this.controller.insert.bind(this.controller)
    ); // apply, call
    this.router.get(
      "/page/:page/pageSize/:pageSize",
      this.controller.getUsersByPage.bind(this.controller)
    );
    this.router.get(
      "/role/:roleId",
      this.controller.listByRole.bind(this.controller)
    );

    this.router.put("/:id", this.controller.update.bind(this.controller));
    this.router.delete("/:id", this.controller.delete.bind(this.controller));
  }
}

const userRepository: UserRepository = new UserInfrastructure();
const userCreate = new UserCreate(userRepository);
const userGetOne = new UserGetOne(userRepository);
const userGetAll = new UserGetAll(userRepository);
const userUpdate = new UserUpdate(userRepository);
const userGetByPage = new UserGetByPage(userRepository);
const userDelete = new UserDelete(userRepository);
const userGetAllByRole = new UserGetAllByRole(userRepository);
const userController = new UserController(
  userCreate,
  userGetOne,
  userGetAll,
  userGetAllByRole,
  userUpdate,
  userGetByPage,
  userDelete
);

export default new UserRoutes(userController).router;
