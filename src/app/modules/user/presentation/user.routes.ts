import { Router } from 'express';

import { AuthenticationGuard } from '../../../core/middlewares/authentication.guard';
import { AuthorizationGuard } from '../../../core/middlewares/authorization.guard';
import { CacheMiddleware } from '../../../core/middlewares/cache.middleware';
import { UploadBuilder, UploadLocal } from '../../../core/middlewares/upload.middleware';
import { UserCreate } from '../application/UserCreate';
import { UserDelete } from '../application/UserDelete';
import { UserGetAll } from '../application/UserGetAll';
import { UserGetAllByRole } from '../application/UserGetAllByRole';
import { UserGetByPage } from '../application/UserGetByPage';
import { UserGetImage } from '../application/UserGetImage';
import { UserGetOne } from '../application/UserGetOne';
import { UserUpdate } from '../application/UserUpdate';
import { UserRepository } from '../domain/repositories/UserRepository';
import { UserInfrastructure } from '../infrastructure/UserInfrastructure';
import { UserController } from './user.controller';

class UserRoutes {
  readonly router: Router;

  constructor(private readonly controller: UserController) {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.get(
      "/",
      AuthenticationGuard.canActivate,
      AuthorizationGuard.canActive("ADMIN", "OPERATOR", "MEDIC"),
      CacheMiddleware.build("users_list"),
      this.controller.list.bind(this.controller)
    );
    this.router.get(
      "/:id",
      CacheMiddleware.build("users_get_one"),
      this.controller.getOne.bind(this.controller)
    );
    this.router.get(
      "/image/:id",
      this.controller.getImage.bind(this.controller)
    );
    this.router.post(
      "/",
      AuthenticationGuard.canActivate,
      AuthorizationGuard.canActive("ADMIN"),
      new UploadLocal().save(
        new UploadBuilder()
          .addFieldname("image")
          .addAllowedExtensions(["image/png", "image/jpg", "image/jpeg"])
          .addDestination("public")
          .addIsPublic(true)
          .addMaxSize(5000000)
          .addNameOfBucket("bucket-curso-nodejs")
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
const userGetImage = new UserGetImage(userRepository);
const userController = new UserController(
  userCreate,
  userGetOne,
  userGetAll,
  userGetAllByRole,
  userUpdate,
  userGetByPage,
  userDelete,
  userGetImage
);

export default new UserRoutes(userController).router;
