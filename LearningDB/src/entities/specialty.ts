import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

import { MedicEntity } from "./medic";

@Entity({ name: "specialty" })
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  //@OneToOne(() => MedicEntity, (medic) => medic.specialty)
  //@ManyToOne(() => MedicEntity, (medic) => medic.specialties)
  @ManyToMany(() => MedicEntity, (medic) => medic.specialties)
  medics: MedicEntity[];
}
