import { err, ok, Result } from "neverthrow";

import { PageResult } from "../../../core/domain/page-result.interface";
import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

//const pdfMake = require("pdfmake/build/pdfmake");

export class UserGetByPage {
  constructor(private readonly repository: UserRepository) {}

  async execute(
    page: number,
    pageSize: number
  ): Promise<Result<PageResult<User>, Error>> {
    const userByPageResult = await this.repository.getByPage(page, pageSize);
    if (userByPageResult.isErr()) {
      return err(new Error(userByPageResult.error.message));
    }

    const userByPage = userByPageResult.value;
    return Promise.resolve(ok(userByPage));
  }
}
