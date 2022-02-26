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
var bcrypt = require('bcryptjs');
const removeDiacritics = require('../stringNormalizer');
const fs = require('fs');

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
   const path = (req.query.path).replace(/\\/g, '\\\\');
   console.log(path)
   const QUERY = `INSERT INTO papers (author, title, path, class, year, subject, mentor, keywords) VALUES ('${req.query.author}', '${req.query.title}', '${path}', '${req.query.class}', ${req.query.year}, '${req.query.subject}', '${req.query.mentor}', '${req.query.keywords}')`;
   if (req.session.loggedin) {
      mysqlConnection.query(QUERY, (err, result) => {
         console.log
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
   if (req.session.loggedin) {
      const SELECT_QUERY = `SELECT * FROM papers WHERE id=${req.query.id}`;
      mysqlConnection.query(SELECT_QUERY, (err, result) => {
         if (err) {
            res.json({ success: false, message: err });
         } else {
            const path = result[0].path;
            try {
               fs.unlinkSync(path)
               //file removed
            } catch (err) {
               console.error(err)
            }
            mysqlConnection.query(`DELETE FROM papers WHERE id=${req.query.id}`, (err, result) => {
               if (err) {
                  console.log(err);
               } else {
                  return res.json({ success: true, id: `${req.query.id}` });
               }
            });
         }
      });

   } else {
      res.json({ success: false, message: 'Not logged in' });
   }
});

//File upload

const DIR = path.join(__dirname, '../files/');

const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, DIR);
   },
   filename: (req, file, cb) => {
      const fileName = String(file.originalname.toLowerCase().split(' ').join('-'));
      removeDiacritics(fileName, str => {
         cb(null, str);
      });
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
   const username = req.body.username;
   const password = req.body.password;
   const QUERY = `SELECT * FROM users WHERE username LIKE '${req.body.username}'`;
   mysqlConnection.query(QUERY, (err, result) => {
      if (err) {
         console.log(err);
      } if (result.length) {
         bcrypt.compare(password, result[0].password, (err, result) => {
            if (result) {
               res.json({ login: true });
               req.session.loggedin = true;
               req.session.username = username;
               req.session.save();
            } else {
               res.json({ login: false });
            }
         });
      } else {
         res.json({ login: false });
      }
   });
});

//Add User
Router.post('/adduser', (req, res) => {
   if (req.session.loggedin) {
      if (req.session.username === 'admin') {
         const password = req.body.password;
         const username = req.body.username;
         bcrypt.hash(password, 8, (err, hash) => {
            const QUERY = `INSERT INTO users (name, username, password) VALUES ('${username}', '${username}', '${hash}')`;
            mysqlConnection.query(QUERY, (err) => {
               if (err) {
                  console.log(err);
                  res.json({ success: false, message: err.code + ";\n " + err.sqlMessage });
               } else {
                  res.json({ success: true });
               }
            });
         });
      } else {
         res.json({ success: false, message: 'Only admin can add users' });
      }
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
   res.json({ result: 'Logged Out' })
});

//get all users
Router.get("/getusers", (req, res) => {
   if (req.session.username === 'admin') {
      mysqlConnection.query("SELECT * FROM users", (err, rows, fields) => {
         if (err) {
            console.log(err);
         } else {
            res.send(rows);
         }
      });
   } else {
      res.json({result: 'Not logged in as admin'});
   }
});

//delete user
Router.get("/deleteuser", (req, res) => {
   if (req.session.username === 'admin') {
      if (!(req.query.username === 'admin')) {
         const QUERY = `DELETE FROM users WHERE username='${req.query.username}'`;
         console.log(QUERY)
         mysqlConnection.query(QUERY, (err, result) => {
            if (err) {
               console.log(err);
            } else {
               return res.json({ result: true, id: `${req.query.username}` });
            }
         });
      } else {
         return res.json({ result: false, message: `Can't delete admin` });
      }
   } else if (req.session.loggedin) {
      return res.json({ result: false, message: `Only admin can delete users` });
   } else {
      return res.json({ result: false, message: `You have to be loggeds in as admin` });
   }
});

//Change Password
Router.post('/changepassword', (req, res) => {
   if (req.session.loggedin && req.body.user === 'admin') {
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const confirmationPassword = req.body.confirmationPassword;
      const username = req.body.selectedUser;
      if (newPassword === confirmationPassword) {
         const QUERY = `SELECT * FROM users WHERE username LIKE '${username}'`;
         mysqlConnection.query(QUERY, (err, result) => {
            if (err) {
               console.log(err);
            } else {
               if (result.length) {
                  bcrypt.compare(oldPassword, result[0].password, (err, result) => {
                     if (result) {
                        bcrypt.hash(newPassword, 8, (err, hash) => {
                           const QUERY = `UPDATE users SET password='${hash}' WHERE username='${username}'`;
                           mysqlConnection.query(QUERY, (err, result) => {
                              if (err) {
                                 console.log(err);
                                 res.json({ result: false, message: err });
                              } else {
                                 res.json({ result: true });
                              }
                           });
                        });
                     } else {
                        res.json({ result: false, message: `Old password is wrong` });
                     }
                  });
               }
            }
         });
      } else {
         res.json({
            result: false,
            message: `Passwords don't match`
         })
      }
   } else if(req.session.loggedin){
      const oldPassword = req.body.oldPassword;
      const newPassword = req.body.newPassword;
      const confirmationPassword = req.body.confirmationPassword;
      const username = req.body.user;
      if (newPassword === confirmationPassword) {
         const QUERY = `SELECT * FROM users WHERE username LIKE '${username}'`;
         mysqlConnection.query(QUERY, (err, result) => {
            if (err) {
               console.log(err);
               res.json({result: false, message: err});
            } else {
               if (result.length) {
                  bcrypt.compare(oldPassword, result[0].password, (err, result) => {
                     if (result) {
                        bcrypt.hash(newPassword, 8, (hash) => {
                           const QUERY = `UPDATE users SET password='${hash}' WHERE username='${username}'`;
                           mysqlConnection.query(QUERY, (err) => {
                              if (err) {
                                 console.log(err);
                                 res.json({ result: false, message: err });
                              } else {
                                 res.json({ result: true });
                              }
                           });
                        });
                     } else {
                        res.json({ result: false, message: `Old password is wrong` });
                     }
                  });
               } else {
                  res.json({result: false, message: `Didn't find any users with username: ${username}`});
               }
            }
         });
      } else {
         res.json({
            result: false,
            message: `Passwords don't match`
         })
      }
   } else {
      res.json({
         result: false,
         message: `Not logged in`
      })
   }
});

//Change Username
Router.post('/changeusername', (req, res) => {
   if (req.session.loggedin) {
      const oldUsername = req.body.user;
      const newUsername = req.body.newUsername;
      const QUERY = `SELECT * FROM users WHERE username LIKE '${oldUsername}'`;
      mysqlConnection.query(QUERY, (err, result) => {
         if (err) {
            console.log(err);
            res.json({ message: err });
         } else {
            if (result.length) {
               const QUERY = `UPDATE users SET username='${newUsername}' WHERE username='${oldUsername}'`;
               mysqlConnection.query(QUERY, (err) => {
                  if (err) {
                     console.log(err);
                     res.json({ result: false, message: err });
                  } else {
                     res.json({ result: true });
                  }
               });
            } else {
               res.json({result: `Couldn\'t find any users with username: '${result}'`})
            }
         }
      });
   } else {
      res.json({
         result: false,
         message: `Not logged in`
      })
   }
});

module.exports = Router;