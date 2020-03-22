const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");

var JSONdata;
//Get all papers
Router.get("/papers", (req, res) => {
   mysqlConnection.query("SELECT * FROM papers", (err, rows, fields) => {
      if (err) {
         console.log(err);
      } else {
         res.send(rows);
      }
   });
});
//Get paper by class
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

//Get paper by id
Router.get("/papers/:id", (req, res) => {
   mysqlConnection.query(`SELECT * FROM papers WHERE id = '${req.params.id}'`, (err, rows, fields) => {
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

//Add paper
Router.get("/papers/add", (req, res) => {
   mysqlConnection.query(`INSERT INTO papers (author, title, path, class, year, subject, mentor) VALUES ('${author}', '${title}', '${path}', '${clas}', ${year}, ${subject}, ${mentor})`, (err, result) => {
      if(err){
         console.log(err);
      } else {
         return res.send('<h1>succesfully added</h1>');
      }
   });
});

//Delete paper
Router.get("/papers/delete", (req, res) => {
   mysqlConnection.query(`DELETE FROM papers WHERE id=${id}`, (err, result) => {
      if(err){
         console.log(err);
      } else {
         return res.send('<h1>succesfully added</h1>');
      }
   });
});




module.exports = Router;