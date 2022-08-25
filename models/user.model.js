const dbConn = require("../config/dbConfig");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
  console.log(userReqData);

  dbConn.query("SELECT * FROM users WHERE email = ?;", [email], (err, res) => {
    if (res.length != 0) {
      bcrypt.compare(password, res[0].password, (error, response) => {
        if (response) {
          const accessToken = jwt.sign(
            { email: email },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "1m",
            }
          );

          result(null, { accessToken });
        } else {
          result(null, { message: "Nieprawidłowy adres e‑mail lub hasło" });
        }
      });
    } else {
      result(null, { message: "Nieprawidłowy adres e‑mail lub hasło" });
    }
  });
};

let refreshTokens = [];

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
