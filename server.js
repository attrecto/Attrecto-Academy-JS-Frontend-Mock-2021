const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const { isAuthorized, getToken } = require("./utils");

server.use(middlewares);

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
  // Example for extending post data
  if (req.method === "POST") {
    req.body.createdAt = Date.now();
  }
  // Continue to JSON Server router
  next();
});

server.use((req, res, next) => {
  if (isAuthorized(req)) {
    // add your authorization logic here
    next(); // continue to JSON Server router
  } else {
    res.sendStatus(401);
  }
});

const getAuth = (req) => {
  if (req.get("Authorization")) {
    return req.get("Authorization").split("Bearer ")[1];
  }
  return "";
};

server.post("/login", (req, res) => {
  if (req.body.email) {
    res.send({
      token: getToken(req.body.email),
    });
  } else {
    res.sendStatus(401);
  }
});

// ----------------------------------------------------CUSTOMER ADMIN ENDS HERE ------------------------------------------------------

// Use default router
server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
