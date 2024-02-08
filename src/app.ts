import { createServer, IncomingMessage, ServerResponse } from 'http';
import { requestListener } from './routes';

// TODO: add a form with an input username to the '/' route
// and submit the POST request to '/create-user' route

// TODO: add create-user route and parse incoming data and add it to html page on /users route

const server = createServer(requestListener);

server.listen(3000, () => console.log('listening on port 3000'));
