import * as bcrypt from "bcryptjs";

export class EncryptService {
  static encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }
}
