"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestListener = exports.writePageToResponse = void 0;
const promises_1 = require("fs/promises");
const querystring_1 = require("querystring");
const users = ['Batman', 'Superman', 'Hulk'];
const handleDynamicUsersList = (page) => {
    const usersTemplate = users.reduce((result, user) => {
        return result + `<li>${user}</li>`;
    }, '');
    return page.replace('[USER_LIST]', usersTemplate);
};
const writePageToResponse = (filePath, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileBuffer = yield (0, promises_1.readFile)(filePath);
    const page = fileBuffer.toString();
    let resultPage = filePath.includes('users')
        ? handleDynamicUsersList(page)
        : page;
    res.write(resultPage);
});
exports.writePageToResponse = writePageToResponse;
const requestListener = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url, method } = req;
    switch (url) {
        case '/':
            yield (0, exports.writePageToResponse)('./templates/index.html', res);
            break;
        case '/users':
            yield (0, exports.writePageToResponse)('./templates/users.html', res);
            break;
        case '/create-user':
            if (method === 'POST') {
                const data = yield getRequestBody(req);
                users.push((0, querystring_1.parse)(data).userName);
                res.writeHead(302, { 'Location': '/users' });
                yield (0, exports.writePageToResponse)('./templates/users.html', res);
            }
            break;
        default:
            yield (0, exports.writePageToResponse)('./templates/404.html', res);
            break;
    }
    res.end();
});
exports.requestListener = requestListener;
function getRequestBody(req) {
    return new Promise((resolve) => {
        let formInput = '';
        req.on('data', (chunk) => formInput += chunk.toString());
        req.on('end', () => resolve(formInput));
    });
}
