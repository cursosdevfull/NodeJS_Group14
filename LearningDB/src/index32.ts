import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    // where age>=25 and (name='Jimena' or lastname='Sotelo')

    const medics = await manager.query("select * from medic where age> 27");

    console.log(medics);
  })
  .catch(console.log);
