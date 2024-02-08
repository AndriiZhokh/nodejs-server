import http from 'http';
import fs from 'fs';

export const requestHandler = (req: http.IncomingMessage, res: http.ServerResponse) => {
  const { url, method } = req;
  res.setHeader('Content-Type', 'text/html');

  if (url === '/') {
    const index = fs.readFileSync('./index.html');
    res.write(index);
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body: any[] = [];

    req.on('data', (chunk) => {
      body.push(chunk);
    });

    return req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];

      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');

        return res.end();
      });
    });
  }

};
