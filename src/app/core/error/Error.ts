import { NextFunction, Request, Response } from 'express';

import { Parameter } from '../Parameter';
import { IError } from './error.interface';

export class HandlerErrors {
  static generic(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const objError: IError = {
      message: error.message || "Internal error",
      status: error.status || 500,
      name: error.name || "Internal error",
    };

    if (Parameter.environment === "development") {
      objError.stack = error.stack;
    }

    res.status(objError.status!).json(objError);
  }
}
