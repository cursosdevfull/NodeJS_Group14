import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const queryRunner = AppDataSource.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    const manager = queryRunner.manager;

    try {
      const orderInserted = await manager
        .createQueryBuilder()
        .from("order", "order")
        .insert()
        .values({ date: new Date() })
        .execute();

      const orderId = orderInserted.identifiers[0].id;

      const orderDetailInserted = await manager
        .createQueryBuilder()
        .from("order_detail", "order_detail")
        .insert()
        .values([
          { quantity: 10, productId: 1, order: orderId },
          { quantity: 50, productId: null, order: orderId },
        ])
        .execute();

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  })
  .catch(console.log);
