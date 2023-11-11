import { err, ok, Result } from "neverthrow";

import { EncryptService } from "../../../core/application/services/Encrypt.service";
import { TokenService } from "../../../core/application/services/tokens";
import { IError } from "../../../core/error/error.interface";
import { User } from "../../user/domain/roots/User";
import { AuthRepository } from "../domain/repositories/auth.repository";
import { Auth } from "../domain/roots/auth";
import { AuthTokens } from "./dtos/auth-token";

export class AuthLogin {
  constructor(private readonly repository: AuthRepository) {}

  async execute(auth: Auth): Promise<Result<AuthTokens, Error>> {
    const userFoundResult = await this.repository.findUserByEmail(
      auth.properties().email
    );

    if (userFoundResult.isErr()) {
      return err(new Error(userFoundResult.error.message));
    }

    const userFound: User = userFoundResult.value;

    const isMatched = await EncryptService.compare(
      auth.properties().password,
      userFound.properties().password
    );

    if (isMatched) {
      const authTokens = new AuthTokens();
      authTokens.refreshToken = userFound.properties().refreshToken;
      authTokens.accessToken = TokenService.generateAccessToken(userFound);
      return ok(authTokens);
    }

    const error: IError = new Error();
    error.message = "Invalid credentials";
    error.stack = "Invalid credentials";
    error.status = 401;

    return err(error);
  }
}
