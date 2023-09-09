class Database {
  private readonly host: string;
  private readonly username: string;
  private readonly password: string;

  private static instance: Database;

  private constructor(host: string, username: string, password: string) {
    this.host = host;
    this.username = username;
    this.password = password;
  }

  static create(host: string, username: string, password: string) {
    if (!this.instance) this.instance = new Database(host, username, password);

    return this.instance;
  }

  properties() {
    return {
      host: this.host,
      username: this.username,
      password: this.password,
    };
  }
}

const instance01 = Database.create("localhost", "root", "12345");
const instance02 = Database.create(
  "database-1.east-1.aws.com",
  "admin",
  "abcde"
);

console.log(instance01.properties());
console.log(instance02.properties());
