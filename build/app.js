"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const routes_1 = require("./routes");
const server = (0, http_1.createServer)(routes_1.requestListener);
server.listen(3000, () => console.log('listening on port 3000'));
