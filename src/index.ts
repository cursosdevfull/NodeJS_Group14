import app from "./app";
import { ServerBootstrap } from "./app/bootstrap/server";

(async () => {
  const serverBootstrap = new ServerBootstrap(app);
  try {
    await serverBootstrap.initilize();
  } catch (error) {
    console.log(error);
  }
})();

/*
    10x: informativo
    20x: éxito 
    30x: redirección
    40x: error del cliente
    50x: error del servidor
*/
