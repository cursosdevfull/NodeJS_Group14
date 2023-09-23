import { Application } from "express";
import http from "http";

import { IBootstrap } from "./bootstrap.interface";

export class ServerBootstrap implements IBootstrap {
  constructor(private readonly app: Application) {}

  async initilize(): Promise<boolean> {
    const promise = new Promise<boolean>((resolve, reject) => {
      const port = process.env.PORT || 3000;

      const server = http.createServer(this.app);

      server
        .listen(port)
        .on("listening", () => {
          console.log(`Server is running on port ${port}`);
          resolve(true);
        })
        .on("error", (err: Error) => {
          reject(err);
        });
    });

    return await promise;
  }
}
