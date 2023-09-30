import { err, ok, Result } from "neverthrow";

import { BaseVO } from "./base-vo";

export class NameVO extends BaseVO<string> {
  private constructor(name: string) {
    super(name);
  }

  static create(name: string | undefined): Result<NameVO, Error> {
    if (name && name.length < 3) {
      return err(new Error("El nombre debe tener al menos 3 caracteres"));
    } else if (!name) {
      return err(new Error("El nombre es requerido"));
    }
    return ok(new NameVO(name as string));
  }
}
