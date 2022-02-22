const http = require('http');

const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Hello World!</h1></body></html>');
});

//the http.createServer() method creates a very minimal basic server object using an existing http. sever class
// it then takes the request handler callback function which is the arrow function in the body
//this request handler is called every time the server recieves a request
//we dont create response object ourselves we just receive it in the request, edit it and send back 
//req and res objects are special types of objects called strings- with these types of objects the data is not all read at once but broken up into chucks and read piece by piece
//the request can be coming from browser or application
//any time youre sending html in the body you should set the header up as seen above

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

//this is how we start the server
//first arg port, second hostname, 3rd is a call back function that will be executed when the server starts up