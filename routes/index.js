const express = require("express");
const Router = express.Router();
const mysqlConnection = require("../connection");
const multer = require('multer');
var session = require('express-session');
const path = require('path');
const pdfParse = require('../fileParser');
const bodyParser = require('body-parser');
const getSimilarity = require('../similarityCheck');
const { request } = require("http");

Router.use(session({
   secret: 'secret',
   resave: true,
   saveUninitialized: true,
   cookie: {
      httpOnly: true,
      maxAge: 7200000
   }
}));

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
   const QUERY = `INSERT INTO papers (author, title, path, class, year, subject, mentor, keywords) VALUES ('${req.query.author}', '${req.query.title}', '${req.query.path}', '${req.query.class}', ${req.query.year}, '${req.query.subject}', '${req.query.mentor}', '${req.query.keywords}')`;
   if (req.session.loggedin) {
      mysqlConnection.query(QUERY, (err, result) => {
         if (err) {
            return res.json({
               result: false
            });
         } else {
            return res.json({
               title: req.query.title,
               result: true
            });
         }
      });
   } else {
      res.json({ result: false })
   }
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
         'mentor': data[6],
         'keywords': data[7],
      });
   });
   // getSimilarity(DIR + filename, result => {
   //    console.log(result + "result");
   // });
});

//Download
Router.get('/paper/download/:id', (req, res) => {
   const QUERY = `SELECT * FROM papers WHERE id = '${req.params.id}'`;
   mysqlConnection.query(QUERY, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         const file = result[0].path;
         res.download(file);
      }
   });
});
//Search
Router.get('/search', (req, res) => {
   const QUERY = `SELECT * FROM papers WHERE author LIKE '%${req.query.author}%' AND title LIKE '%${req.query.title}%' AND class LIKE '%${req.query.class}%' AND year LIKE '%${req.query.year}%' AND subject LIKE '%${req.query.subject}%' AND mentor LIKE '%${req.query.mentor}%' AND keywords LIKE '%${req.query.keywords}%'`;
   mysqlConnection.query(QUERY, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         res.send(result);
      }
   });
});

//Login
Router.post('/login', (req, res) => {
   // const QUERY = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}')`;
   const QUERY = `SELECT * FROM users WHERE username LIKE '${req.body.username}' AND password LIKE '${req.body.password}'`
   mysqlConnection.query(QUERY, (err, result) => {
      if (err) {
         console.log(err);
      } if (result.length) {
         res.json({ login: true });
         req.session.loggedin = true;
         req.session.username = `${req.body.username}`;
         req.session.save();
      } else {
         res.json({ login: false });
      }
   });
});

//Add User
Router.post('/adduser', (req, res) => {
   if (req.session.loggedin) {
      const QUERY = `INSERT INTO users (username, password) VALUES ('${req.body.username}', '${req.body.password}')`;
      mysqlConnection.query(QUERY, (err, result) => {
         if (err) {
            console.log(err);
            res.json({ success: false, message: 'Error, possibly duplicate usernames' });
         } else {
            res.json({ success: true });
         }
      });
   } else {
      res.json({ success: false, message: 'Not logged in' });
   }
});


//Get session data
Router.get('/session', (req, res) => {
   res.json({
      loggedin: req.session.loggedin,
      username: req.session.username
   })
});

//logout
Router.get('/logout', (req, res) => {
   req.session.destroy();
   res.json({result: 'Logged Out'})
});

//get all users
Router.get("/getusers", (req, res) => {
   if(req.session.username === 'admin'){
      mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
         if (err) {
            console.log(err);
         } else {
            res.send(rows);
         }
      });
   }
});

//delete user
Router.get("/deleteuser", (req, res) => {
   mysqlConnection.query(`DELETE FROM users WHERE username=${req.query.username}`, (err, result) => {
      if (err) {
         console.log(err);
      } else {
         return res.json({ result: `success`, id: `${req.query.username}` });
      }
   });
});

module.exports = Router;