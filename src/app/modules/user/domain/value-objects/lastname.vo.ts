import { BaseVO } from "./base-vo";

export class LastnameVO extends BaseVO<string> {
  private constructor(name: string) {
    super(name);
  }

  static create(lastname: string | undefined): LastnameVO {
    if (lastname && lastname.length < 3) {
      throw new Error("El apellido debe tener al menos 3 caracteres");
    } else if (!lastname) {
      throw new Error("El apellido es requerido");
    }
    return new LastnameVO(lastname);
  }
}
