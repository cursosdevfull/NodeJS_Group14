import http from "http";

const paths = [
  {
    path: "/",
    method: "POST",
    execute: (req: http.IncomingMessage, res: http.ServerResponse) => {
      res.writeHead(200, { "content-type": "text/html; charset=utf8" });
      res.write("<h1>Hola mundo</h1>");
      res.write("<strong>Inicio de comunicación</strong>");
      res.end();
    },
  },
  {
    path: "/product",
    method: "GET",
    execute: (req: http.IncomingMessage, res: http.ServerResponse) => {
      const products = [{ name: "product 1" }, { name: "product 2" }];
      res.writeHead(200, { "content-type": "application/json; charset=utf8" });
      res.write(JSON.stringify(products));
      res.end();
    },
  },
];

const server = http.createServer((req, res) => {
  const url = req.url?.toLowerCase();
  const method = req.method?.toUpperCase();

  const path = paths.find((p) => p.path === url && p.method === method);

  if (path) {
    path.execute(req, res);
  } else {
    res.writeHead(404, { "content-type": "text/html; charset=utf8" });
    res.write("<h1>Ruta no encontrada</h1>");
    res.end();
  }

  /* if (req.url === "/" && req.method === "POST") {
    res.writeHead(200, { "content-type": "text/html; charset=utf8" });
    res.write("<h1>Hola mundo</h1>");
    res.write("<strong>Inicio de comunicación</strong>");
    res.end();
  } else if (req.url === "/product") {
    const products = [{ name: "product 1" }, { name: "product 2" }];
    res.writeHead(200, { "content-type": "application/json; charset=utf8" });
    res.write(JSON.stringify(products));
    res.end();
  } else if (req.url === "/download") {
    res.writeHead(200, { "content-type": "application/pdf" });
    const file = fs.readFileSync(
      "D://Cursos//NodeJS_Group14//src//files//manual-facebook.pdf"
    );
    res.write(file);
    res.end();
  } else {
    res.writeHead(404, { "content-type": "text/html; charset=utf8" });
    res.write("<h1>Ruta no encontrada</h1>");
    res.end();
  }*/
});

server.listen(3000, () => console.log("Server is running on port 3000"));

/*
    10x: informativo
    20x: éxito 
    30x: redirección
    40x: error del cliente
    50x: error del servidor
*/
