const http = require('http');
const fs = require('fs');
const port = 8080;

const server = http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('index.html', (err, data) => {
        if (err) {
            console.error(err);
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.write('404 - file not found');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());
        }
        res.end();
    });
});

server.listen(port, (error) => {
    if (error) {
        console.log("error " + error);
    }
});