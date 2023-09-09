class User {
  id: number;
  constructor(
    public firstname: string,
    public lastname: string,
    readonly age: number,
    private email: string
  ) {
    this.id = Math.floor(Math.random() * 100 + 1);

    if (age < 18) throw new Error("User cannot be less 18");
  }
}

interface UserCreatedRepository {
  find(id: number): User | undefined;
  insert(user: User): User;
}

interface ElementRepository<Entity> {
  find(id: number): Entity | undefined;
  insert(entity: Entity): Entity;
}

interface ElementId<TypeId> {
  id: TypeId;
}

interface UserCreatedSystemRepository extends UserCreatedRepository {
  getByPage(
    page: number,
    pageSize: number
  ): { success: boolean; data: User[]; totalRecords: number };
}

class UserCreated {
  constructor(private readonly userRepository: UserCreatedRepository) {}

  execute(user: User) {
    const userFound = this.userRepository.find(user.id);
    const userMatched = userFound ? true : false;

    if (userMatched) throw new Error("User exists");

    //const userOperation = new UserOperation()
    return this.userRepository.insert(user);
  }
}

class ElementCreated<
  Entity extends ElementId<number>,
  Repository extends ElementRepository<Entity>
> {
  constructor(private readonly entityRepository: Repository) {}

  execute(entity: Entity) {
    const entityFound = this.entityRepository.find(entity.id);
    const entityMatched = entityFound ? true : false;

    if (entityMatched) throw new Error("User exists");

    return this.entityRepository.insert(entity);
  }
}

class UserOperation implements UserCreatedRepository {
  //usersInMemory: User[] = []
  usersInMemory: Array<User> = [];

  find(id: number) {
    return this.usersInMemory.find((user) => user.id === id);
  }

  insert(user: User) {
    this.usersInMemory.push(user);
    return user;
  }

  findAll(): User[] {
    return this.usersInMemory;
  }
}

/*class UserOperation {
    find(id: number) {
        return false
    }

    insert(user: User) {
        return user
    }
}*/

/*class UserOperationPart2 {
    findAll() {
        return []
    }
}*/

const user = new User("Sergio", "Hidalgo", 18, "sergio@correo.com");
const userRepository: UserCreatedRepository = new UserOperation();
const userCreated = new UserCreated(userRepository);
const userInserted = userCreated.execute(user);
//console.log(userInserted.firstname==="Sergio")
console.log(userCreated.execute(user));
//console.log(userCreated.execute(user))
