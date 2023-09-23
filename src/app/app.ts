import { UserGetOne } from "./modules/user/application/UserGetOne";
import { UserRepository } from "./modules/user/domain/UserRepository";
import { UserInfrastructure } from "./modules/user/infrastructure/UserInfrastructure";

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
  /*const user = new User(
    "ef208023-049f-43a9-b497-719ac608878a",
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
  console.log(await app.insert(user));*/

  const repository: UserRepository = new UserInfrastructure();
  const app = new UserGetOne(repository);
  console.log(await app.getOne("ef208023-049f-43a9-b497-719ac608878a"));
})();
