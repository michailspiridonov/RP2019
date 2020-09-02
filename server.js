const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
var session = require('express-session');
var fs = require('fs');
var dir = './files';

if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

var app = express();
app.use(bodyParser.json());
app.use("/", routes);



app.listen(5000);