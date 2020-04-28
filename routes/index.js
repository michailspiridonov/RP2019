const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const multer = require('multer');
const path = require('path');
const pdfParse = require('../fileParser');

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
Router.get("/paper/class/:class", (req, res) => {
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
Router.get("/paper/id/:id", (req, res) => {
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
Router.get("/paper/add", (req, res) => {
   const QUERY = `INSERT INTO papers (author, title, path, class, year, subject, mentor) VALUES ('${req.query.author}', '${req.query.title}', '${req.query.path}', '${req.query.class}', ${req.query.year}, '${req.query.subject}', '${req.query.mentor}')`;
   console.log(QUERY);
   mysqlConnection.query(QUERY, (err, result) => {
      if (err) {
         console.log('err ' + err);
      } else {
         return res.send(`<h1> ${req.query.title} by ${req.query.author} was succesfully added</h1>`);
      }
   });
});

//Delete paper
Router.get("/paper/delete", (req, res) => {
   mysqlConnection.query(`DELETE FROM papers WHERE id=${req.query.id}`, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         return res.json({ result: `success`, id: `${req.query.id}` });
      }
   });
});

//File upload

const DIR = path.join(__dirname, '../files/');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, DIR);
   },
   filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, fileName)
   }
});

var upload = multer({
   storage: storage,
   fileFilter: (req, file, cb) => {
      if (file.mimetype == "application/pdf") {
         cb(null, true);
      } else {
         cb(null, false);
         return cb(new Error('Documents accepted only in .pdf format'));
      }
   }
});

Router.post('/paper/upload', upload.single('document'), (req, res, next) => {
   const filename = req.file.filename;
   pdfParse(DIR + filename, data => {
      res.json({
         'author': data[0],
         'title': data[1],
         'path': data[2],
         'class': data[3],
         'year': data[4],
         'subject': data[5],
         'mentor': data[6]
      });
   });
});

Router.get('/paper/download/:id', (req, res) => {
   const QUERY = `SELECT * FROM papers WHERE id = '${req.params.id}'`;
   mysqlConnection.query(QUERY, (err, result) => {
      if(err) {
         console.log(err);
      } else {
         const file = result[0].path;
         res.download(file);
      }
   });
});

module.exports = Router;