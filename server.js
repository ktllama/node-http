const http = require('http');

const hostname = 'localhost';
const port = 3000;

const path = require('path');
const fs = require('fs');
//both core modules in node- dont need to install

const server = http.createServer((req, res) => {
    console.log(`Request for ${req.url} by method ${req.method}`);

    if (req.method === 'GET') { //this is where we will handle the request if it is a get request
        let fileUrl = req.url;
        if (fileUrl === '/') {
            fileUrl = '/index.html';
        } //if url sent doesnt have extension like /about or /contact then we would like to send the index page automatically using this if block above

        //now we will get the absolute path of the file thats being requested and stor it in the filepath variable- 
        //path.resolve() will convert it from a relative path to an absolute path
        const filePath = path.resolve('./public' + fileUrl); //fileurl will already contain / as the first character
        const fileExt = path.extname(filePath); //will parse out the extension from the file path
        //if the fileExt is html we will run this below code 
        if (fileExt === '.html') {
            //fs.access lets us know if the file is accessible/exists on the server- takes two arguments the path of the file we want to check and then a callback that takes an error argument
            //if file not accessable then an error object will be passed to this err argument
            fs.access(filePath, err => {
                if (err) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);
                    return;
                } //common to first check if there is an error and if there isnt then we continue with what we want to send 
                res.statusCode = 200;
                res.setHeader('Content-Type', 'text/html');
                //createReadScreen with a file path actually sends the html doc - loads just a chunk at a time like lazy loading
                fs.createReadStream(filePath).pipe(res);
                //we then will take this document and pipe it using the aregument of res which means we are sending it over to the response object - pipe available on node streams- res and createreadstream are also streams- when you have two streams you can use the pipe method to send the information from one to the other
                //so here we are literally piping the data read at this file path to the response stream so the res object can now access that data
                //dont need to worry about using end method bc createread will end it once it finishes reading it  
            });
        } else { //if fileext is not html we will return this 404
            res.statusCode = 404;
            res.setHeader('Content-Type', 'text/html');
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);
        }
    } else {
        //if not a get request this will be returned as 404
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/html');
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);
    }
});

// ORIGINAL BASIC HTTP SERVER
// const server = http.createServer((req, res) => {
//     console.log(req.headers);
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/html');
//     res.end('<html><body><h1>Hello World!</h1></body></html>');
// });

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