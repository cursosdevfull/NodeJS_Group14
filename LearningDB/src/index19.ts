import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medic = await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .select("medic.name, medic.age, medic.id")
      //.from("medic", "medic")
      .where("medic.id = 3")
      .getRawOne();

    console.log(medic);
  })
  .catch(console.log);
