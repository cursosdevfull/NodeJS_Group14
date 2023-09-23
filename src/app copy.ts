import { UserCreate } from "./app/modules/user/application/UserCreate";
import { User } from "./app/modules/user/domain/User";
import { UserRepository } from "./app/modules/user/domain/UserRepository";
import { UserInfrastructure } from "./app/modules/user/infrastructure/UserInfrastructure";

/*async function start() {
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
  console.log(await app.insert(user));
}*/

(async () => {
  const user = new User(
    "7f2d459d-1bc0-41cf-9aff-f9f8f2926dd9",
    "Juan",
    "Perez",
    "juan2.perez@email.com",
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
  console.log(await app.insert(user));

  /*const repository: UserRepository = new UserInfrastructure();
  const app = new UserGetOne(repository);
  console.log(await app.getOne("ef208023-049f-43a9-b497-719ac608878a"));*/
})();
