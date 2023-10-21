import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    await manager
      .createQueryBuilder()
      .from(MedicEntity, "medic")
      .insert()
      .values({
        name: "Luis",
        lastname: "Sotelo",
        age: 25,
        gender: "M",
        cmp: "12345689",
      })
      .execute();
  })
  .catch(console.log);
