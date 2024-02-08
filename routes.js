"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestHandler = void 0;
const fs_1 = __importDefault(require("fs"));
const requestHandler = (req, res) => {
    const { url, method } = req;
    res.setHeader('Content-Type', 'text/html');
    if (url === '/') {
        const index = fs_1.default.readFileSync('./index.html');
        res.write(index);
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs_1.default.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        });
    }
};
exports.requestHandler = requestHandler;
