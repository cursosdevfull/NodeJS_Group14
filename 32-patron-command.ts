interface IAppointment {
  countryIso: string;
  name: string;
  lastname: string;
  date: Date;
  medicId: number;
  specialtyId: number;
  centerId?: number;
  insurance?: string;
}

interface IAppointmentColombia {
  patient: string;
  date: Date;
  medicId: number;
  specialtyId: number;
  insurance: string;
}

interface IAppointmentPeru {
  patientName: string;
  patientLastname: string;
  date: Date;
  medicId: number;
  specialtyId: number;
}

interface IAppointmentChile {
  patientFullname: string;
  date: Date;
  medicId: number;
  specialtyId: number;
  centerId: number;
}

abstract class Command {
  protected payload: Record<string, any> = {};
  protected countryIso: string = "";

  abstract execute(): void;
  /*execute() {
        console.log(`Country target: ${this.countryIso}. Payload: ${JSON.stringify(this.payload)}`)
    }*/
}

class Appointment {
  constructor(public readonly appointment: IAppointment) {}
}

class AppointmentPeru extends Command {
  constructor(appointment: IAppointmentPeru) {
    super();
    this.payload = appointment;
    this.countryIso = "PE";
  }

  execute() {
    console.log(`Payload: ${JSON.stringify(this.payload)}`);
  }
}

class AppointmentColombia extends Command {
  constructor(appointment: IAppointmentColombia) {
    super();
    this.payload = appointment;
    this.countryIso = "CO";
  }

  execute() {
    console.log(
      `Country target: ${this.countryIso}. Payload: ${JSON.stringify(
        this.payload
      )}`
    );
  }
}

class AppointmentChile extends Command {
  constructor(appointment: IAppointmentChile) {
    super();
    this.payload = appointment;
    this.countryIso = "CH";
  }

  execute() {
    console.log(
      `Country target: ${this.countryIso}. Payload: ${JSON.stringify(
        this.payload
      )}`
    );
  }
}

const app = new Appointment({
  countryIso: "PE",
  name: "Juan",
  lastname: "Pérez",
  date: new Date(),
  medicId: 1,
  specialtyId: 10,
  insurance: "PRIVADO",
  centerId: 20,
});

let instance!: Command;

if (app.appointment.countryIso === "PE") {
  instance = new AppointmentPeru({
    patientName: app.appointment.name,
    patientLastname: app.appointment.lastname,
    date: app.appointment.date,
    medicId: app.appointment.medicId,
    specialtyId: app.appointment.specialtyId,
  });
} else if (app.appointment.countryIso === "CO") {
  instance = new AppointmentColombia({
    patient: `${app.appointment.name} ${app.appointment.lastname}`,
    date: app.appointment.date,
    medicId: app.appointment.medicId,
    specialtyId: app.appointment.specialtyId,
    insurance: app.appointment.insurance ?? "",
  });
} else if (app.appointment.countryIso === "CL") {
  instance = new AppointmentChile({
    patientFullname: `${app.appointment.name} ${app.appointment.lastname}`,
    date: app.appointment.date,
    medicId: app.appointment.medicId,
    specialtyId: app.appointment.specialtyId,
    centerId: app.appointment.centerId ?? 0,
  });
}

instance.execute();
