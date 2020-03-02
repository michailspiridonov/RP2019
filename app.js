const express = require('express');
const mysqlConnection = require("./connection");
const testRoutes = require('./pages');
const pagesPath = "/home/michail/RP2019/pages/";

var app = express();
app.use('/styles', express.static(__dirname + '/assets'));
app.use("/", testRoutes);


app.listen(3000);