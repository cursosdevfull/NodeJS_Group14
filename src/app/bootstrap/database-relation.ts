import { DataSource } from "typeorm";

import { Parameter } from "../core/Parameter";
import { IBootstrap } from "./bootstrap.interface";

export class DatabaseRelation implements IBootstrap {
  private static appDataSource: DataSource;

  initialize(): Promise<boolean | DataSource> {
    const dbConfig = {
      host: Parameter.host,
      port: Parameter.port,
      entities: [Parameter.entities],
      username: Parameter.username,
      password: Parameter.password,
      database: Parameter.database,
      synchronize: Parameter.synchronize,
      logging: Parameter.logging,
      poolSize: Parameter.poolSize,
      maxQueryExecutionTime: Parameter.maxQueryExecutionTime,
    };

    console.log("dbConfig", dbConfig);

    const AppDataSource = new DataSource({
      type: "mysql",
      ...dbConfig,
    });

    DatabaseRelation.appDataSource = AppDataSource;

    return AppDataSource.initialize();
  }

  static get dataSource(): DataSource {
    return DatabaseRelation.appDataSource;
  }

  close() {
    DatabaseRelation.appDataSource?.destroy();
  }
}
