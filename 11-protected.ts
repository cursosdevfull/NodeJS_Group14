class User {
  protected readonly userId = "3eb7d622-9f1e-448d-bc25-aabd47a33a02";
  protected readonly password = "r3lM0MQ'h411";
}

class Developer extends User {
  getPasswordLength() {
    return this.password.length;
  }

  getUserId() {
    return this.userId;
  }
}

class DeveloperCloud extends Developer {
  constructor() {
    super();
    console.log(this.password);
  }
}

const user = new User();
//user.password = "abcd"
