const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
app.use(bodyParser.json());
app.use("/", routes);



app.listen(5000);