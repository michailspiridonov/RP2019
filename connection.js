const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "Catalogue",
    multipleStatements : true
});

mysqlConnection.connect((err) => {
    if(err){
        console.log("Connection failed");
    } else {
        console.log("Connected");
    }
});

module.exports = mysqlConnection;