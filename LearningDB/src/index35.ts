import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const queryRunner = AppDataSource.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    const manager = queryRunner.manager;

    try {
      const specialtyInserted = await manager
        .createQueryBuilder()
        .from("specialty", "specialty")
        .insert()
        .values({ name: "Cardiología Geriátrica" })
        .execute();

      const medicInserted = await manager
        .createQueryBuilder()
        .from("medic", "medic")
        .insert()
        .values({
          name: "Carlos",
          lastname: "Olmos",
          age: 40,
          gender: "M",
          cmp: "01234567",
          specialty: specialtyInserted.identifiers[0].id,
        })
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  })
  .catch(console.log);
