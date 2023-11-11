import { NextFunction, Request, Response } from 'express';

import { IError } from '../error/error.interface';

export abstract class AuthorizationGuard {
  static canActive(...rolesAllowed: string[]) {
    return (req: Request, res: Response, next: NextFunction) => {
      const rolesUser = res.locals.roles;

      for (let ind = 0; ind < rolesAllowed.length; ind++) {
        if (rolesUser.includes(rolesAllowed[ind])) {
          return next();
        }
      }

      const error: IError = new Error();
      error.message = "Access forbidden";
      error.status = 409;
      error.stack = "Access forbidden";
      return next(error);
    };
  }
}
