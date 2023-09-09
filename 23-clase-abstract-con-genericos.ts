interface IGetData<TypeData> {
  getData(): Array<TypeData>;
}

class User {
  constructor(public name: string, public lastname: string) {}
}
class UserService implements IGetData<User> {
  private users: User[] = [
    new User("John", "Colt"),
    new User("Javier", "Anticona"),
  ];

  getData() {
    return this.users;
  }
}

class Product {
  constructor(public name: string, public stock: number) {}
}
class ProductService implements IGetData<Product> {
  private products: Product[] = [
    new Product("product01", 33),
    new Product("product02", 8),
  ];

  getData() {
    return this.products;
  }
}

abstract class BaseComponent<Entity, Service extends IGetData<Entity>> {
  abstract filename: string;

  constructor(protected service: Service) {}

  export() {
    return this.service.getData();
  }
}

class UserComponent extends BaseComponent<User, UserService> {
  filename = "users";

  constructor(protected userService: UserService) {
    super(userService);
  }
}

class ProductComponent extends BaseComponent<Product, ProductService> {
  filename = "products";

  constructor(protected productService: ProductService) {
    super(productService);
  }
}
