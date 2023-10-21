import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { SpecialtyEntity } from "./specialty";

@Entity({ name: "medic" })
export class MedicEntity {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  readonly name: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  readonly lastname: string;

  @Column({ type: "int", nullable: false })
  readonly age: number;

  @Column({ type: "varchar", length: 100, unique: true })
  readonly cmp: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  readonly gender: string;

  //@OneToOne(() => SpecialtyEntity, (specialty) => specialty.medic)
  //@JoinColumn()
  /*@OneToMany(() => SpecialtyEntity, (specialty) => specialty.medic, {
    cascade: true,
  })*/
  @ManyToMany(() => SpecialtyEntity, (specialty) => specialty.medics, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  specialties: SpecialtyEntity[];

  constructor(
    name: string,
    lastname: string,
    age: number,
    cmp: string,
    gender: string,
    specialties: SpecialtyEntity[]
  ) {
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.cmp = cmp;
    this.gender = gender;
    this.specialties = specialties;
  }
}
