import { Router } from "express";

import { UserController } from "./user.controller";

class UserRoutes {
  readonly router: Router;
  private readonly userController: UserController;

  constructor() {
    this.userController = new UserController();
    this.router = Router();
    this.mountRoutes();
  }

  mountRoutes() {
    // get(path: string, fn: (req: Request, res: Response):void))

    this.router.get("/", this.userController.list.bind(this.userController));
    this.router.get(
      "/:id",
      this.userController.getOne.bind(this.userController)
    );
    this.router.post("/", this.userController.insert.bind(this.userController)); // apply, call

    /*
    
    class ExpressGet {
      get(path: string, fn: Function) {
        fn(req, res)
      }
    }

    */

    /*this.router.post("/", (req: Request, res: Response) => {
      console.log("Route /user POST");
      this.userController.insert(req, res);
    });*/
  }
}

export default new UserRoutes().router;
