class MedicBuilder {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  age: number;
  specialty: string;
  subSpecialty: string;

  addName(value: string) {
    this.name = value;
    return this;
  }

  addLastname(value: string) {
    this.lastname = value;
    return this;
  }

  addCmp(value: string) {
    this.cmp = value;
    return this;
  }

  addEmail(value: string) {
    this.email = value;
    return this;
  }

  addAge(value: number) {
    this.age = value;
    return this;
  }

  addSpecialty(value: string) {
    this.specialty = value;
    return this;
  }

  addSubspecialty(value: string) {
    this.subSpecialty = value;
    return this;
  }

  buid() {
    return new Medic(this);
  }
}

type MedicProperties = {
  name: string;
  lastname: string;
  cmp: string;
  email: string;
  age: number;
  specialty: string;
  subSpecialty: string;
};
class Medic {
  private name: string;
  private lastname: string;
  private cmp: string;
  private email: string;
  private age: number;
  private specialty: string;
  private subSpecialty: string;

  constructor(props: MedicProperties) {
    this.name = props.name;
    this.lastname = props.lastname;
    this.cmp = props.cmp;
    this.email = props.email;
    this.age = props.age;
    this.specialty = props.specialty;
    this.subSpecialty = props.subSpecialty;
  }
}

const propsMedic: MedicProperties = {
  name: "Juan",
  lastname: "Pérez",
  cmp: "abc-123",
  email: "correojuan@correo.com",
  age: 33,
  specialty: "pediatria",
  subSpecialty: "pediatrica temprana",
};
const medic = new Medic(propsMedic);

const medicP = new MedicBuilder();

console.log(
  medicP
    .addName("Jorgé")
    .addLastname("Calderon")
    .addCmp("abc-123")
    .addEmail("sergio@correo.com")
    .addAge(12)
);
