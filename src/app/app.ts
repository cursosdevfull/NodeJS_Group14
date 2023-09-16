import { UserCreate } from "./modules/user/application/UserCreate";
import { User } from "./modules/user/domain/User";
import { UserRepository } from "./modules/user/domain/UserRepository";
import { UserInfrastructure } from "./modules/user/infrastructure/UserInfrastructure";

const user = new User(
  "Juan",
  "Perez",
  "juan.perez@email.com",
  "12345",
  34,
  "calle azul",
  345,
  "LIma",
  "Perú",
  "Hombre"
);
const repository: UserRepository = new UserInfrastructure();
const app = new UserCreate(repository);
app.insert(user);
