import { Column, Entity, PrimaryColumn } from "typeorm";

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

  @Column({ type: "int" })
  age: number;

  @Column({ type: "json" })
  address: string;

  @Column({ type: "varchar", length: 10 })
  gender: string;

  @Column({ type: "timestamp" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true })
  updatedAt: Date;

  @Column({ type: "timestamp", nullable: true })
  deletedAt: Date;
}
