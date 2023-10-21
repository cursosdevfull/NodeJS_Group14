import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";

AppDataSource.initialize()
  .then(async () => {
    const PAGE_SIZE = 3;
    const currentPage = 0;

    const medicRepository = AppDataSource.getRepository(MedicEntity);

    const medic = await medicRepository
      .createQueryBuilder("doctor")
      .where("doctor.id = 3")
      .getOne();

    console.log(medic);
  })
  .catch(console.log);
