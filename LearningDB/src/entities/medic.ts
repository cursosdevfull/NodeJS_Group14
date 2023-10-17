import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SpecialtyEntity } from "./specialty";

@Entity({ name: "medic" })
export class MedicEntity {
  @PrimaryGeneratedColumn()
  private id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  private name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  private lastname: string;

  @Column({ type: "int", nullable: false })
  private age: number;

  @Column({ type: "varchar", length: 100, unique: true })
  private cmp: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  private gender: string;

  @OneToOne(() => SpecialtyEntity, (specialty) => specialty.medic)
  @JoinColumn()
  specialty: SpecialtyEntity;

  constructor(
    name: string,
    lastname: string,
    age: number,
    cmp: string,
    gender: string
  ) {
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.cmp = cmp;
    this.gender = gender;
  }
}
