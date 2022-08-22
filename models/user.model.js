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

// login

User.loginUser = (userReqData, result) => {
  const email = userReqData.email;
  const password = userReqData.password;

  dbConn.query("SELECT * FROM users WHERE email = ?;", [email], (err, res) => {
    if (res.length != 0) {
      bcrypt.compare(password, res[0].password, (error, response) => {
        if (response) {
          // req.session.email = res;
          // console.log(req.session.email);
          result(null, res);
        } else {
          result(null, { message: "Nieprawidłowy adres e‑mail lub hasło" });
        }
      });
    } else {
      result(null, { message: "Nieprawidłowy adres e‑mail lub hasło" });
    }
  });
};

// register user
User.registerUser = (userReqData, result) => {
  const username = userReqData.username;
  const email = userReqData.email;
  const password = userReqData.password;

  bcrypt.hash(password, saltRounds, (error, hash) => {
    dbConn.query(
      "SELECT email FROM users WHERE email = '" + email + "'",
      (error, res) => {
        if (res.length === 0) {
          dbConn.query(
            "SELECT username FROM users WHERE username = '" + username + "'",
            (error, res) => {
              if (res.length === 0) {
                dbConn.query(
                  "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')",
                  [username, email, hash],
                  (err, res) => {
                    if (err) {
                      console.log("Error while inserting data");
                      result(null, err);
                    } else {
                      result(null, res);
                    }
                  }
                );
              } else {
                result(null, {
                  message: "Użytkownik o podanym loginie już istnieje",
                });
              }
            }
          );
        } else {
          result(null, {
            message: "Użytkownik o podanym emailu już istnieje",
          });
        }
      }
    );
  });
};

module.exports = User;
