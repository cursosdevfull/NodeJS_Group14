import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";
import { SpecialtyEntity } from "./entities/specialty";

AppDataSource.initialize()
  .then(async () => {
    const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);

    const specialty01 = new SpecialtyEntity();
    specialty01.name = "Cardiología Pediátrica";

    const specialty02 = new SpecialtyEntity();
    specialty02.name = "Cardiología Adultos";

    await specialtyRepository.save(specialty01);
    await specialtyRepository.save(specialty02);

    const medicRepository = AppDataSource.getRepository(MedicEntity);
    const medic = new MedicEntity("Juan", "Perez", 30, "CMP-456", "M", [
      specialty01,
      specialty02,
    ]);

    await medicRepository.save(medic);

    /*const specialty = new SpecialtyEntity();
    specialty.name = "Cardiología Pediátrica";

    const specialtyRepository = AppDataSource.getRepository(SpecialtyEntity);
    const specialtySaved = await specialtyRepository.save(specialty);

    const medic = new MedicEntity("Juan", "Perez", 30, "CMP-456", "M");
    medic.specialty = specialtySaved;

    const medicRepository = AppDataSource.getRepository(MedicEntity);
    const medicSaved = await medicRepository.save(medic);

    const medic2 = new MedicEntity("Juan", "Perez", 30, "CMP-456789", "M");
    medic.specialty = specialtySaved;

    const medicSaved2 = await medicRepository.save(medic2);*/
  })
  .catch(console.log);
