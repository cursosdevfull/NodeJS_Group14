import { Request, Response } from "express";

import { RoleGetAll } from "../application/RoleGetAll";

export class RoleController {
  constructor(private readonly roleGetAll: RoleGetAll) {}

  async list(req: Request, res: Response) {
    const rolesResult = await this.roleGetAll.execute();
    if (rolesResult.isErr()) {
      return res.status(500).json({
        message: rolesResult.error.message,
        stack: rolesResult.error.stack,
      });
    }
    res.json(rolesResult.value);
  }
}
