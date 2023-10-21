import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .update()
      .set({ name: "Dr. House" })
      .where("medic.id = 1")
      .execute();

    await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .update()
      .set({ name: "Dr. Hyde" })
      .where("medic.id = :id", { id: 2 })
      .execute();

    await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .delete()
      .where("medic.id = :id")
      .setParameter("id", 3)
      .execute();
  })
  .catch(console.log);
