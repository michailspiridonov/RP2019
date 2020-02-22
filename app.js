var express = require('express');
var app = express();
const pagesPath = "/home/michail/RP2019/pages/";
app.get('/', function (req, res) {
    res.sendFile(pagesPath+'index.html', {root : '/'});
});
var server = app.listen(3000, function () { });