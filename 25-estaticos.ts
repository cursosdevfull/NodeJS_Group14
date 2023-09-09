class Database {
  static readonly protocol = "https";

  static getUrlConnection(
    host: string,
    username: string,
    password: string,
    schema: string
  ) {
    return `${this.protocol}://${host}/${username}/${password}/${schema}`;
  }

  getProtocol() {
    console.log(Database.protocol);
  }
}

const database = new Database();
database.getProtocol();

console.log(
  Database.getUrlConnection(
    "database-pro.net.east-1.aws.com",
    "root",
    "12345",
    "planner"
  )
);
console.log(Database.protocol);

//Database.protocol = "ws"
console.log(
  Database.getUrlConnection(
    "database-pro.net.east-1.aws.com",
    "root",
    "12345",
    "planner"
  )
);

const database2 = new Database();
database2.getProtocol();
