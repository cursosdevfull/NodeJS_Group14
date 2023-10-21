import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    // where age>=25 and (name='Jimena' or lastname='Sotelo')

    const medics = await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .having("medic.age >= :age")
      .setParameters({ age: 25 })
      .getRawMany();

    console.log(medics);
  })
  .catch(console.log);
