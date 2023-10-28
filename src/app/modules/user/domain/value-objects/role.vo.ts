import { BaseVO } from "./base-vo";

export class RoleVO<Type> extends BaseVO<Type[]> {
  private constructor(roles: Type[]) {
    super(roles);
  }

  static create<Type>(roles: any[]): RoleVO<Type> {
    if (roles.length === 0) {
      throw new Error("Debe tener al menos un rol");
    }

    return new RoleVO(roles);
  }
}
