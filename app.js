"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const routes_1 = require("./routes");
const server = http_1.default.createServer(routes_1.requestHandler);
server.listen(3000, () => console.log('listening on port 3000'));
