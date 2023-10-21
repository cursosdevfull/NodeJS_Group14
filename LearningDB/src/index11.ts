import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";

AppDataSource.initialize()
  .then(async () => {
    const medicRepository = AppDataSource.getRepository(MedicEntity);
    const medics = await medicRepository.find();

    console.log(JSON.stringify(medics, null, "\t"));
  })
  .catch(console.log);
