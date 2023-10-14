namespace Express {
  export interface Request {}
  export interface Response {}
}

// Infrastructure
// controladores, rutas, restfull, operaciones contra base de datos, manejadores de notificaciones, etc.
class MedicRoute {
  constructor(private readonly controller: MedicController) {}

  insert() {
    console.log("medic-route.insert");
    const request: Express.Request = {};
    const response: Express.Response = {};
    this.controller.insert(request, response);
  }
}

class MedicController {
  constructor(private readonly app: MedicCreate) {}

  insert(request: Express.Request, response: Express.Response) {
    console.log("controller.insert");
    const medic: Medic = new Medic("Juana", "abc-123", 50);
    this.app.execute(medic);
  }
}

class MedicInfrastructure implements MedicRepository {
  private medic: Medic[] = [];

  add(medic: Medic) {
    this.medic.push(medic);
  }

  findByCMP(cmp: string): Medic | undefined {
    return this.medic.find((el: Medic) => el.properties().cmp === cmp);
  }
}

// Application
// lógica de negocio, casos de uso
class MedicCreate {
  constructor(private readonly repository: MedicRepository) {}

  execute(medic: Medic) {
    const medicFound = this.repository.findByCMP(medic.properties().cmp);

    if (medicFound) {
      throw new Error("Medic just exists");
    }

    this.repository.add(medic);
  }
}

// Dominio
// conocimiento del problema, conocimiento del negocio
interface MedicRepository {
  findByCMP(cmp: string): Medic | undefined;
  add(medic: Medic): void;
}

class Medic {
  private name: string;
  private cmp: string;
  private age: number;

  constructor(name: string, cmp: string, age: number) {
    if (age > 90) throw new Error("Age cannot be greater than 90");

    this.name = name;
    this.cmp = cmp;
    this.age = age;
  }

  properties() {
    return {
      name: this.name,
      cmp: this.cmp,
      age: this.age,
    };
  }
}

const repository: MedicRepository = new MedicInfrastructure();
const application = new MedicCreate(repository);
const controller = new MedicController(application);
const route = new MedicRoute(controller);
route.insert();
