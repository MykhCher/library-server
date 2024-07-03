const http = require('http');
require('dotenv').config();

const app = require('./src/app');


const port = process.env.PORT ?? 5000; 
const hostname = process.env.HOSTNAME ?? '127.0.0.1'; 

const server = http.createServer(app);

server.listen(port, hostname);
