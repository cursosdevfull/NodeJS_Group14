import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { MedicEntity } from "./medic";

@Entity({ name: "specialty" })
export class SpecialtyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 50 })
  name: string;

  @OneToOne(() => MedicEntity, (medic) => medic.specialty)
  medic: MedicEntity;
}
