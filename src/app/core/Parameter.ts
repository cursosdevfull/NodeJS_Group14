import path from "path";

export class Parameter {
  static get portApp() {
    return Number(process.env.PORT) || 3000;
  }

  static get host() {
    return process.env.DB_HOST || "localhost";
  }

  static get port() {
    return Number(process.env.DB_PORT) || 8200;
  }

  static get database() {
    return process.env.DB_DATABASE || "course";
  }

  static get entities(): string {
    const pathByDefault = path.join(
      __dirname,
      "../../app/modules/**/infrastructure/entities/*.entity.{ts,js}"
    );

    return process.env.DB_ENTITIES || pathByDefault;
  }

  static get username() {
    return process.env.DB_USERNAME || "shidalgo";
  }

  static get password() {
    return process.env.DB_PASSWORD || "12345";
  }

  static get synchronize() {
    return Boolean(process.env.DB_SYNCHRONIZE) || true;
  }

  static get logging() {
    return Boolean(process.env.DB_LOGGING) || true;
  }

  static get poolSize() {
    return Number(process.env.DB_POOL_SIZE) || 10;
  }

  static get maxQueryExecutionTime() {
    return Number(process.env.DB_MAX_QUERY_EXECUTION_TIME) || 10000;
  }
}
