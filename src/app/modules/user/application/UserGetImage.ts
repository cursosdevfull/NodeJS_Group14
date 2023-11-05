import { err, ok, Result } from 'neverthrow';

import { UserRepository } from '../domain/repositories/UserRepository';



export class UserGetImage {
  constructor(private readonly repository: UserRepository) {}

  async getImage(id: string): Promise<Result<string, Error>> {
    const imageFoundResult = await this.repository.getImage(id);
    if (imageFoundResult.isErr()) {
      return Promise.resolve(err(new Error(imageFoundResult.error.message)));
    }

    const imageFound = imageFoundResult.value;

    return Promise.resolve(ok(imageFound));
  }
}
