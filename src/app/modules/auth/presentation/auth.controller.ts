import { Request, Response } from "express";

import { AuthLogin } from "../application/AuthLogin";
import { Auth } from "../domain/roots/auth";

export class AuthController {
  constructor(private readonly authLogin: AuthLogin) {}

  async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const auth = new Auth({ email, password });
    const authResult = await this.authLogin.execute(auth);
    if (authResult.isErr()) {
      return res.status(500).json({
        message: authResult.error.message,
        stack: authResult.error.stack,
      });
    }
    res.json(authResult.value);
  }
}
