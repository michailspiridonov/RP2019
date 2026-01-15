const mysql = require('mysql');

var mysqlConnection = mysql.createConnection({
    host : process.env.DB_HOST || "localhost",
    user : process.env.DB_USER || "root",
    password : process.env.DB_PASSWORD || "password",
    database : process.env.DB_NAME || "Catalogue",
    multipleStatements : true,
    port: 3306
});

mysqlConnection.connect((err) => {
    if(err){
        console.log("Error setting up database connection: " + err.message);
    } else {
        console.log("Successfully connected to the database.");
    }
});

module.exports = mysqlConnection;