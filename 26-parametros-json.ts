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
