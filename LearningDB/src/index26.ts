import { Brackets } from "typeorm";

import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    // where age>=25 and (name='Jimena' or lastname='Sotelo')

    const medics = await manager
      .createQueryBuilder()
      .from("medic", "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .where("medic.age >= :age")
      .andWhere(
        new Brackets((query) => {
          query
            .where("medic.name = :name")
            .orWhere("medic.lastname = :lastname");
        })
      )
      .setParameters({ age: 25, name: "Jimena", lastname: "Sotelo" })
      .getRawMany();

    console.log(medics);
  })
  .catch(console.log);
