import { BaseVO } from "../../../modules/user/domain/value-objects/base-vo";

export class EmailVO extends BaseVO<string> {
  private constructor(email: string) {
    super(email);
  }

  static create(email: string): EmailVO {
    if (email.length < 3)
      throw new Error("El email debe tener al menos 3 caracteres");

    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      throw new Error("El email no es válido");
    }
    return new EmailVO(email);
  }
}
