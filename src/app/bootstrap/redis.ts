import IORedis from 'ioredis';
import { DataSource } from 'typeorm';

import { Parameter } from '../core/Parameter';
import { IBootstrap } from './bootstrap.interface';

export class RedisBootstrap implements IBootstrap {
  private static client: IORedis;

  initialize(): Promise<boolean | DataSource> {
    return new Promise((resolve, reject) => {
      const client = new IORedis({
        host: Parameter.redisHost,
        port: Parameter.redisPort,
        password: Parameter.redisPassword,
        maxRetriesPerRequest: Parameter.redisMaxRetriesPerRequest,
      });

      client
        .on("connect", () => {
          console.log("Redis connected");
          resolve(true);
        })
        .on("error", (error) => {
          console.log("Redis connection error", error);
          reject(error);
        });

      RedisBootstrap.client = client;
    });
  }

  close(): void {
    RedisBootstrap.client?.disconnect();
  }

  static get redisClient(): IORedis {
    return RedisBootstrap.client;
  }

  static async get(key: string): Promise<string | null> {
    return await RedisBootstrap.client.get(key);
  }

  static async set(key: string, value: string): Promise<void> {
    await RedisBootstrap.client.set(
      key,
      value,
      "PX",
      Parameter.redisExpireCache
    );
  }

  static async clear(prefix: string = ""): Promise<void> {
    const keys = await RedisBootstrap.client.keys(`${prefix}*`);
    if (keys.length > 0) {
      RedisBootstrap.client.del(keys);
    }
  }
}
