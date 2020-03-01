const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require("./connection");
const testRoutes = require('./pages/test');
const pagesPath = "/home/michail/RP2019/pages/";

var app = express();
app.use(bodyParser.json());

app.use("/test", testRoutes);


app.listen(3000);