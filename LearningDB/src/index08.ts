import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";
import { SpecialtyEntity } from "./entities/specialty";

AppDataSource.initialize()
  .then(async () => {
    const specialty = new SpecialtyEntity();
    specialty.id = 2;

    const medicRepository = AppDataSource.getRepository(MedicEntity);
    const medic = new MedicEntity("Jorge", "Álvarez", 30, "CMP-12345", "M", [
      specialty,
    ]);

    await medicRepository.save(medic);
  })
  .catch(console.log);
