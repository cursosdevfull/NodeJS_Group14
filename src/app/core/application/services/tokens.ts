import { addMinutes } from 'date-fns';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../../modules/user/domain/roots/User';
import { IError } from '../../error/error.interface';
import { Parameter } from '../../Parameter';

export class TokenService {
  static generateAccessToken(user: User) {
    const currentDate = new Date();
    const expiresDate = addMinutes(currentDate, Parameter.tokenExpireTime);

    const properties = user.properties();
    const payload = {
      email: properties.email,
      roles: properties.roles.map((role) => role.name),
      iat: currentDate.getTime(),
      exp: expiresDate.getTime(),
    };

    return jwt.sign(payload, Parameter.tokenSecret);
  }

  static generateRefreshToken() {
    return uuidv4();
  }

  static validateAccessToken(token: string) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, Parameter.tokenSecret, (err, payload) => {
        if (err) {
          const error: IError = new Error();
          if (err.message === "jwt expired") {
            error.message = "Token expired";
            error.status = 409;
            error.stack = "Token expired";
          } else {
            error.status = 401;
            error.message = "Token invalid";
            error.stack = "Token invalid";
          }

          reject(error);
        } else {
          resolve(payload);
        }
      });
    });
  }
}
