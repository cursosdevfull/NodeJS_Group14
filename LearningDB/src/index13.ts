import { AppDataSource } from "./datasource";
import { SpecialtyEntity } from "./entities/specialty";

AppDataSource.initialize()
  .then(async () => {
    const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);
    const specialties = await specialtyRepository.find({
      select: { name: true },
      order: { name: "ASC" },
    });

    console.log(JSON.stringify(specialties, null, "\t"));
  })
  .catch(console.log);
