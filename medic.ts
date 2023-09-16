// Domain
class Medic {
  name: string;
  lastname: string;
  age: number;
  gender: string;
  specialtyId: number;
  subSpecialtyId: number;
  cmp: string;
  address: string;
  countryISO: string;

  constructor(
    name: string,
    lastname: string,
    age: number,
    gender: string,
    specialtyId: number,
    subSpecialtyId: number,
    cmp: string,
    address: string,
    countryISO: string
  ) {
    if (name.length < 1) throw new Error("Name cannot empty");
    if (age < 22) throw new Error("Age must be greater than 22");

    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.gender = gender;
    this.specialtyId = specialtyId;
    this.subSpecialtyId = subSpecialtyId;
    this.cmp = cmp;
    this.address = address;
    this.countryISO = countryISO;
  }
}

interface MedicRepository {
  findByCMP(cmp: string): Medic | undefined;
  insert(medic: Medic): void;
  exists(medic: Medic): boolean;
}

// Application
class MedicCreate {
  repository: MedicRepository;

  constructor(repository: MedicRepository) {
    this.repository = repository;
  }

  execute(medic: Medic) {
    //const medicOperation = new MedicOperation()
    const medicMatched = this.repository.findByCMP(medic.cmp);

    if (medicMatched) throw new Error("Medic duplicate");

    if (this.repository.exists(medic))
      throw new Error("SubSpecialty doesn't belong to Specialty");

    //const newMedic= new Medic(medic.name, medic.lastname, medic.age, medic.gender, medic.specialtyId, medic.subSpecialtyId, medic.cmp, medic.address, medic.countryISO)
    this.repository.insert(medic);
    console.log("Medic created");
  }
}

// Infrastructure
class MedicOperation implements MedicRepository {
  medics: Array<Medic> = [
    new Medic("Javier", "Tuesta", 34, "M", 3, 33, "abc-123", "calle1", "PE"),
    new Medic("Claudia", "Alba", 23, "F", 3, 87, "abc-456", "calle2", "CO"),
    new Medic("Carla", "Zuazo", 48, "F", 4, 53, "abc-789", "calle3", "MX"),
  ];

  insert(medic: Medic) {
    this.medics.unshift(medic);
  }

  list(): Array<Medic> {
    return this.medics;
  }

  exists(medic: Medic) {
    return medic.specialtyId === 1 && medic.subSpecialtyId === 20;
  }

  findByCMP(cmp: string) {
    return this.medics.find((el: Medic) => el.cmp === medic.cmp);
  }
}

const medic = new Medic(
  "César",
  "Zavala",
  42,
  "M",
  1,
  45,
  "abc-001",
  "calle4",
  "CL"
);

const medicRepository: MedicRepository = new MedicOperation();
const medicCreate = new MedicCreate(medicRepository);
medicCreate.execute(medic);
//console.log(medicCreate.medics)
