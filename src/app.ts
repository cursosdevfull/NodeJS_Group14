import express, { Application } from 'express';
import multer from 'multer';
import path from 'path';

import { RedisBootstrap } from './app/bootstrap/redis';
import { HandlerErrors } from './app/core/error/Error';
import authRouter from './app/modules/auth/presentation/auth.routes';
import roleRouter from './app/modules/role/presentation/role.routes';
import userRouter from './app/modules/user/presentation/user.routes';

class App {
  application: Application;

  constructor() {
    this.application = express();
    this.init();
    this.middlewares();
    this.mountHelpers();
    this.mountRoutes();
    this.mountErrorHandlers();
  }

  init() {
    multer();
  }

  mountHelpers() {
    this.application.get("/invalidate-cache", (req, res) => {
      RedisBootstrap.clear();
      res.send("Cache cleared");
    });
  }

  middlewares() {
    this.application.use(express.json());
    this.application.use(
      express.urlencoded({ extended: true, limit: "500mb" })
    );

    const currentPath = __dirname;
    const viewsPath = path.join(currentPath, "../public");

    //this.application.use(express.static(viewsPath));
  }

  mountRoutes() {
    this.application.use("/user", userRouter);
    this.application.use("/role", roleRouter);
    this.application.use("/auth", authRouter);
  }

  mountErrorHandlers() {
    this.application.use(HandlerErrors.generic);
  }
}

export default new App().application;
