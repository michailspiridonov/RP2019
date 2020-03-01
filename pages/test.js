const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");


Router.get("/", (req, res) => {
     mysqlConnection.query("SELECT * FROM test", (err, rows, fields) => {
         if(err){
            console.log(err);
         } else {
             res.send(rows);
         }
     });
});

module.exports = Router;