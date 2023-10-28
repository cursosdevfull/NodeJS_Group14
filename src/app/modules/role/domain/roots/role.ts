export interface RoleEssential {
  readonly id: string;
  readonly name: string;
}

export type RoleProperties = RoleEssential;

export class Role {
  private readonly id: string;
  private name: string;

  constructor(properties: RoleProperties) {
    this.id = properties.id;
    this.name = properties.name;
  }
}
