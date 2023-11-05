import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import app from './app';
import { DatabaseRelation } from './app/bootstrap/database-relation';
import { RedisBootstrap } from './app/bootstrap/redis';
import { ServerBootstrap } from './app/bootstrap/server';

dotenv.config();

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  const databaseRelationBootstrap = new DatabaseRelation();
  const redisBootstrap = new RedisBootstrap();

  try {
    const promises: Array<Promise<boolean | DataSource | Error>> = [
      serverBootstrap.initialize(),
      databaseRelationBootstrap.initialize(),
      redisBootstrap.initialize(),
    ];

    await Promise.all(promises);
    console.log("Database relation and server are running");
  } catch (error) {
    console.log(error);
    databaseRelationBootstrap.close();
    redisBootstrap.close();
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
