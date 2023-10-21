import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    // where age>=25 and (name='Jimena' or lastname='Sotelo')

    const medics = await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .orderBy("medic.age", "DESC")
      .addOrderBy("medic.name", "ASC")
      .getRawMany();

    console.log(medics);
  })
  .catch(console.log);
