import express, { Application } from "express";
import multer from "multer";
import path from "path";

import roleRouter from "./app/modules/role/presentation/role.routes";
import userRouter from "./app/modules/user/presentation/user.routes";

class App {
  application: Application;

  constructor() {
    this.application = express();
    this.init();
    this.middlewares();
    this.mountRoutes();
  }

  init() {
    multer();
  }

  middlewares() {
    this.application.use(express.json());
    this.application.use(
      express.urlencoded({ extended: true, limit: "500mb" })
    );

    const currentPath = __dirname;
    const viewsPath = path.join(currentPath, "../public");

    this.application.use(express.static(viewsPath));
  }

  mountRoutes() {
    this.application.use("/user", userRouter);
    this.application.use("/role", roleRouter);
  }
}

export default new App().application;
