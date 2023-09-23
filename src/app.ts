import express, { Application } from "express";

import userRouter from "./app/modules/user/presentation/user.routes";

class App {
  application: Application;

  constructor() {
    this.application = express();
    this.mountRoutes();
  }

  mountRoutes() {
    this.application.use("/user", userRouter);

    /*this.application.post("/", (req: Request, res: Response) => {
      res
        .type("text/html; charset=utf8")
        .send("<h1>Hola mundo</h1><strong>Inicio de comunicación</strong>");
    });

    this.application.get("/product", (req: Request, res: Response) => {
      const products = [{ name: "product 1" }, { name: "product 2" }];

      res.type("application/json; charset=utf8").json(products);
    });

    this.application.get("/sales", (req: Request, res: Response) => {
      const sales = [{ name: "sale 1" }, { name: "sale 2" }];

      res.type("application/json; charset=utf8").json(sales);
    });*/
  }
}

export default new App().application;
