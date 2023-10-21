import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medics = await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .select(["medic.id", "medic.name", "medic.lastname"])
      //.where("medic.age between :min and :max", { min: 20, max: 30 })
      .where("medic.age between :min and :max")
      .setParameters({ min: 20, max: 30 })
      .getRawMany();

    console.log(medics);
  })
  .catch(console.log);
