import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";
import { SpecialtyEntity } from "./entities/specialty";

AppDataSource.initialize()
  .then(async () => {
    const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);

    const specialty = await specialtyRepository.findOne({ where: { id: 2 } });

    const medicRepository = AppDataSource.getRepository(MedicEntity);
    const medic = new MedicEntity("Jimena", "Álvarez", 25, "CMP-456789", "F", [
      specialty,
    ]);

    await medicRepository.save(medic);
  })
  .catch(console.log);
