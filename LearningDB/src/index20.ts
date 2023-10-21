import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const sql = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .select("medic.name, medic.age, medic.id")
      //.from("medic", "medic")
      .where("medic.id = 3")
      .getSql();

    console.log("sql", sql);
  })
  .catch(console.log);
