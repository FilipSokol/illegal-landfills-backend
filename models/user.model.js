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

// delete user
User.deleteUser = (userReqData, result) => {
  const userid = userReqData.userid;
  dbConn.query("DELETE FROM users WHERE userid = ?", [userid], (err, res) => {
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
      const username = res[0].username;
      const role = res[0].role;
      const userid = res[0].userid;
      bcrypt.compare(password, res[0].password, (error, response) => {
        if (response) {
          const accessToken = jwt.sign(
            { email: email, username: username, role: role, userid: userid },
            process.env.ACCESS_TOKEN_SECRET,
            {
              expiresIn: "60m",
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
                      console.log("Error podczas dodawania danych");
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

// get users scoreboard
User.scoreboard = (result) => {
  dbConn.query(
    "SELECT * FROM users ORDER BY score DESC LIMIT 15",
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = User;
