import path from 'path';

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

  static get redisHost() {
    return process.env.REDIS_HOST || "localhost";
  }

  static get redisPort() {
    return Number(process.env.REDIS_PORT) || 6379;
  }

  static get redisPassword() {
    return process.env.REDIS_PASSWORD || "todovale";
  }

  static get redisMaxRetriesPerRequest() {
    return Number(process.env.REDIS_MAX_RETRIES_PER_REQUEST) || 3;
  }

  static get redisExpireCache() {
    return Number(process.env.REDIS_EXPIRE_CACHE) || 24 * 60 * 60 * 1000;
  }

  static get tokenExpireTime() {
    return Number(process.env.TOKEN_EXPIRE_TIME) || 10;
  }

  static get tokenSecret() {
    return process.env.TOKEN_SECRET || "secret";
  }

  static get environment() {
    return process.env.NODE_ENV || "development";
  }
}
