import { IncomingMessage, ServerResponse } from 'http';
import { readFile } from 'fs/promises';
import { parse } from 'querystring';

const users = ['Batman', 'Superman', 'Hulk'];

const handleDynamicUsersList = (page: string) => {
  const usersTemplate = users.reduce((result, user) => {
    return result + `<li>${user}</li>`
  }, '');

  return page.replace('[USER_LIST]', usersTemplate);
};

export const writePageToResponse = async (filePath: string, res: ServerResponse) => {
  const fileBuffer = await readFile(filePath);
  const page = fileBuffer.toString();
  let resultPage = filePath.includes('users')
    ? handleDynamicUsersList(page)
    : page;

  res.write(resultPage);
};

export const requestListener = async (req: IncomingMessage, res: ServerResponse) => {
  const { url, method } = req;

  switch (url) {
    case '/':
      await writePageToResponse('./templates/index.html', res);
      break;
    case '/users':
      await writePageToResponse('./templates/users.html', res);
      break;
    case '/create-user':
      if (method === 'POST') {
        const data = await getRequestBody(req);
        users.push(parse(data).userName as string);
        res.writeHead(302, { 'Location': '/users' });

        await writePageToResponse('./templates/users.html', res);
      }
      break;
    default:
      await writePageToResponse('./templates/404.html', res);
      break;
  }

  res.end();
};

function getRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise<string>((resolve) => {
    let formInput = '';

    req.on('data', (chunk) => formInput += chunk.toString());
    req.on('end', () => resolve(formInput));
  });
}