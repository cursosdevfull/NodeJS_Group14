import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";
import { SpecialtyEntity } from "./entities/specialty";

AppDataSource.initialize()
  .then(async () => {
    const specialty01 = new SpecialtyEntity();
    specialty01.name = "Cardiología Pediátrica";

    const specialty02 = new SpecialtyEntity();
    specialty02.name = "Cardiología Adultos";

    const medicRepository = AppDataSource.getRepository(MedicEntity);
    const medic = new MedicEntity("Pablo", "Córdova", 30, "CMP-789", "M", [
      specialty01,
      specialty02,
    ]);

    await medicRepository.save(medic);

    const medic02 = new MedicEntity("Claudia", "Sotelo", 25, "CMP-7890", "F", [
      specialty01,
    ]);

    await medicRepository.save(medic02);
  })
  .catch(console.log);
