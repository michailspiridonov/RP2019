const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

var JSONdata;

Router.get("/papers", (req, res) => {
   mysqlConnection.query("SELECT * FROM papers", (err, rows, fields) => {
      if (err) {
         console.log(err);
      } else {
         res.send(rows);
      }
   });
});

Router.get("/papers/:class", (req, res) => {
   mysqlConnection.query(`SELECT * FROM papers WHERE class = '${req.params.class}'`, (err, rows, fields) => {
      if (err) {
         console.log(err);
      } 
      if (rows) {
         res.send(rows);
      } else {
         res.send(`<h1>Invalid request</h1>`)
      }
   });
});

Router.get("/papers/:keyword", (req, res) => {
   mysqlConnection.query(`SELECT * FROM papers WHERE class = '${req.params.keyword}'`, (err, rows, fields) => {
      if (err) {
         console.log(err);
      } 
      if (rows) {
         res.send(rows);
      } else {
         res.send(`<h1>Invalid request</h1>`)
      }
   });
});


module.exports = Router;