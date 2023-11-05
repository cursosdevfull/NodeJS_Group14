import { err, ok, Result } from 'neverthrow';

import { UserRepository } from '../domain/repositories/UserRepository';
import { User } from '../domain/roots/User';
import { ExceptionApplicationMessage } from './exceptions/exception';

//const pdfMake = require("pdfmake/build/pdfmake");

export class UserCreate {
  constructor(private readonly repository: UserRepository) {}

  async execute(user: User): Promise<Result<User, Error>> {
    const userExistsResult = await this.repository.existsUserWithEmail(
      user.properties().email
    );
    if (userExistsResult.isErr()) {
      return err(new Error(userExistsResult.error.message));
    }

    const userExists = userExistsResult.value;

    if (userExists) {
      return err(new Error(ExceptionApplicationMessage.USER_ALREADY_EXISTS));
    }

    const userInsertedResult = await this.repository.save(user);
    if (userInsertedResult.isErr()) {
      return err(new Error(userInsertedResult.error.message));
    }

    const userInserted = userInsertedResult.value;
    user.update({
      image: `http://localhost:4000/photos/${userInserted.properties().image}`,
    });
    return Promise.resolve(ok(userInserted));
  }
}
