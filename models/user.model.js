const dbConn = require("../config/dbConfig");

const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

// Secret key
require("dotenv").config();
const secret = process.env;
//

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: secret.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: false, // potrzebowalem js do tego czy jest ciasteczko, kom. ze stacka (dont let browser javascript access cookie ever)
      expires: 24 * 60 * 60 * 1000, //WYGASZANIE CIASTECZKA 24h
    },
  })
);

const User = function (user) {
  this.userid = user.userid;
  this.username = user.username;
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
};

// get all users
User.getAllUsers = (result) => {
  dbConn.query("SELECT * FROM users", (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// get user by ID
User.getUserById = (userid, result) => {
  dbConn.query("SELECT * FROM users WHERE userid=?", userid, (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// register user
User.registerUser = (userReqData, result) => {
  dbConn.query("INSERT INTO users SET ? ", userReqData, (err, res) => {
    if (err) {
      console.log("Error while inserting data");
      result(null, err);
    } else {
      console.log("Employee created successfully");
      result(null, res);
    }
  });
  //   app.post("/register", (req, res) => {
  //     const username = req.body.username;
  //     const email = req.body.email;
  //     const password = req.body.password;
  //     bcrypt.hash(password, saltRounds, (err, hash) => {
  //       if (err) {
  //         res.send({ err: err });
  //       }
  //       db.query(
  //         "SELECT email FROM AccountsSystem WHERE email = '" + email + "'",
  //         function (err, result, field) {
  //           if (result.length === 0) {
  //             db.query(
  //               "SELECT username FROM AccountsSystem WHERE username = '" +
  //                 username +
  //                 "'",
  //               function (err, result, field) {
  //                 if (result.length === 0) {
  //                   db.query(
  //                     "INSERT INTO AccountsSystem (username, email, password, role) VALUES (?, ?, ?, 'user')",
  //                     [username, email, hash],
  //                     (err, result) => {
  //                       if (err) {
  //                         console.log(err);
  //                       } else {
  //                         res.send(result);
  //                         console.log(result);
  //                       }
  //                     }
  //                   );
  //                 } else {
  //                   res.send({
  //                     message: "Użytkownik o podanym loginie już istnieje",
  //                   });
  //                 }
  //               }
  //             );
  //           } else {
  //             res.send({
  //               message: "Użytkownik o podanym emailu już istnieje",
  //             });
  //           }
  //         }
  //       );
  //     });
  //   });
};

module.exports = User;
