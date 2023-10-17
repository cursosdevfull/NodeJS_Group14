import { DataSource } from "typeorm";

import { MedicEntity } from "./entities/medic";
import { SpecialtyEntity } from "./entities/specialty";

interface IDataSource {
  type: "mysql";
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
  logging: boolean;
}

const connection: IDataSource = {
  type: "mysql",
  host: "localhost",
  port: 8200,
  username: "shidalgo",
  password: "12345",
  database: "course",
  synchronize: true,
  logging: true,
};

export const AppDataSource = new DataSource({
  ...connection,
  entities: [MedicEntity, SpecialtyEntity],
});
