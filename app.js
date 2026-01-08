const http = require("http");

const routes = require("./routes");

const requestListener = routes.handler;

const server = http.createServer(requestListener);

server.listen(3000);
