import { Router } from "express";

import { UserInfrastructure } from "../../user/infrastructure/UserInfrastructure";
import { AuthLogin } from "../application/AuthLogin";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { AuthController } from "./auth.controller";

class AuthRoutes {
  readonly router: Router;

  constructor(private readonly controller: AuthController) {
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
  }
}

const authRepository: AuthRepository = new UserInfrastructure();

const authController = new AuthLogin(authRepository);
export default new AuthRoutes(new AuthController(authController)).router;
