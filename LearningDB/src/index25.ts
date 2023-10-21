import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const medics = await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .where("medic.age >= :age")
      .orWhere("medic.name = :name")
      .setParameters({ age: 30, name: "Jimena" })
      .getRawMany();

    console.log(medics);
  })
  .catch(console.log);
