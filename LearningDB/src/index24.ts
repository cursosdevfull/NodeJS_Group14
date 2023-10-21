import { AppDataSource } from "./datasource";

AppDataSource.initialize()
  .then(async () => {
    const manager = AppDataSource.manager;

    const sentence = manager
      .createQueryBuilder()
      .from("medic", "medic")
      .select(["medic.id", "medic.name", "medic.lastname", "medic.age"])
      .where("medic.age >= :min")
      .andWhere("medic.age <= :max");

    const randomNumber = Math.random();

    if (randomNumber > 0.5) {
      sentence.setParameter("min", 20).setParameter("max", 30);
    } else {
      sentence.setParameter("min", 30).setParameter("max", 40);
    }

    const medics = await sentence.getRawMany();

    console.log(medics);
  })
  .catch(console.log);
