import { DataSource } from "typeorm";

import app from "./app";
import { DatabaseRelation } from "./app/bootstrap/database-relation";
import { ServerBootstrap } from "./app/bootstrap/server";

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseRelationBootstrap = new DatabaseRelation();
  try {
    const promises: Array<Promise<boolean | DataSource | Error>> = [
      serverBootstrap.initialize(),
      databaseRelationBootstrap.initialize(),
    ];

    await Promise.all(promises);
    console.log("Database relation and server are running");
  } catch (error) {
    console.log(error);
    databaseRelationBootstrap.close();
    serverBootstrap.close();
  }
})();

/*
    10x: informativo
    20x: éxito 
    30x: redirección
    40x: error del cliente
    50x: error del servidor
*/
