import { NextFunction, Request, Response } from 'express';

import { TokenService } from '../application/services/tokens';
import { IError } from '../error/error.interface';

export abstract class AuthenticationGuard {
  static async canActivate(req: Request, res: Response, next: NextFunction) {
    const headers: Record<string, any> = req.headers;

    if (!headers.authorization) {
      const error: IError = new Error();
      error.message = "Not authorized";
      error.status = 401;
      error.stack = "AuthenticationGuard";

      return next(error);
    }

    const parts = headers["authorization"].split("Bearer");
    if (parts.length !== 2) {
      const error: IError = new Error();
      error.message = "Not authorized";
      error.status = 401;
      error.stack = "AuthenticationGuard";

      return next(error);
    }

    TokenService.validateAccessToken(parts[1].trim())
      .then((payload: unknown) => {
        res.locals.roles = (payload as Record<string, any>).roles;
        next();
      })
      .catch((error) => next(error));
  }
}
