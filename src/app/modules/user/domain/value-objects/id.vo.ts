import { validate } from "uuid";

import { BaseVO } from "./base-vo";

export class IdVO extends BaseVO<string> {
  create(value: string): BaseVO<string> {
    throw new Error("Method not implemented.");
  }
  private constructor(id: string) {
    super(id);
  }

  static create(id: string): IdVO {
    if (!validate(id)) {
      throw new Error("El id no es válido");
    }
    return new IdVO(id);
  }
}
