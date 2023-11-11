import { EmailVO } from "../../../../core/domain/value-objects/email.vo";

export type AuthProperties = {
  readonly email: string;
  readonly password: string;
};

export class Auth {
  private readonly email: string;
  private readonly password: string;

  constructor(props: AuthProperties) {
    EmailVO.create(props.email);

    Object.assign(this, props);
  }

  properties(): AuthProperties {
    return {
      email: this.email,
      password: this.password,
    };
  }
}
