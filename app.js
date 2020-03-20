const express = require('express');
const testRoutes = require('./routes');

var app = express();
app.use("/", testRoutes);


app.listen(3000);