import { AppDataSource } from "./datasource";
import { MedicEntity } from "./entities/medic";
import { SpecialtyEntity } from "./entities/specialty";

AppDataSource.initialize()
  .then(async () => {
    const medic = new MedicEntity("Shirley", "Hidalgo", 25, "123", "F");

    const specialty = new SpecialtyEntity();
    specialty.name = "Cardiología";

    const repositoryMedic = AppDataSource.getRepository(MedicEntity);
    const repositorySpecialty = AppDataSource.getRepository(SpecialtyEntity);

    try {
      await repositoryMedic.save(medic);
      await repositorySpecialty.save(specialty);
    } catch (error) {
      console.log(error);
    }
  })
  .catch(console.log);
