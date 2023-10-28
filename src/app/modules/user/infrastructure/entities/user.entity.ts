import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

import { RoleEntity } from "../../../role/infrastructure/entities/role.entity";
import { Address } from "../../domain/entities/Address";

@Entity({ name: "user" })
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id: string;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @Column({ type: "varchar", length: 50 })
  lastname: string;

  @Column({ type: "varchar", length: 50 })
  email: string;

  @Column({ type: "varchar", length: 100 })
  password: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "json", nullable: true })
  address: Address;

  @Column({ type: "varchar", length: 10, nullable: true })
  gender: string;

  @Column({ type: "varchar", length: 200, nullable: true })
  image: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;

  @ManyToMany(() => RoleEntity, (role) => role.users)
  @JoinTable()
  roles: RoleEntity[];
}
