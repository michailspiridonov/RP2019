const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "password",
    database : "Catalogue",
    multipleStatements : true,
    port: 3306
});

mysqlConnection.connect((err) => {
    if(err){
        console.log("Connection failed" + err.message);
    } else {
        console.log("Connected");
    }
});

module.exports = mysqlConnection;