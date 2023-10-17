import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";

AppDataSource.initialize()
  .then(async () => {
    const medic = new MedicEntity("Shirley", "Hidalgo", 25, "123456", "F");

    try {
      await AppDataSource.getRepository(MedicEntity).save(medic);
    } catch (error) {
      console.log(error);
    }

    /*AppDataSource.getRepository(MedicEntity)
      .save(medic)
      .then(console.log)
      .catch(console.log);*/
  })
  .catch(console.log);
