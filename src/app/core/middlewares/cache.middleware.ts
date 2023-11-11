import { NextFunction, Request, Response } from "express";

import { RedisBootstrap } from "../../bootstrap/redis";

export class CacheMiddleware {
  private static setParameters(key: string, params: Record<string, any>) {
    let newKey = key;
    if (params) {
      Object.keys(params).forEach((param) => {
        newKey += "_" + param + "_" + params[param];
      });
    }

    return newKey;
  }

  static build(prefix: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      let cacheKey = prefix;
      cacheKey = this.setParameters(cacheKey, req.params);
      cacheKey = this.setParameters(cacheKey, req.query);
      cacheKey = this.setParameters(cacheKey, req.body);

      const client = RedisBootstrap.redisClient;
      const value = await client.get(cacheKey);

      if (value) {
        console.log("Cache from Redis");
        return res.send(JSON.parse(value));
      }

      console.log("Cache from database");
      res.locals.cacheKey = cacheKey;
      next();
    };
  }
}
