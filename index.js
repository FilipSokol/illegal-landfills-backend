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

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

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

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "pracainz",
});

app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.send({ err: err });
    }

    db.query(
      "SELECT email FROM AccountsSystem WHERE email = '" + email + "'",
      function (err, result, field) {
        if (result.length === 0) {
          db.query(
            "SELECT username FROM AccountsSystem WHERE username = '" +
              username +
              "'",
            function (err, result, field) {
              if (result.length === 0) {
                db.query(
                  "INSERT INTO AccountsSystem (username, email, password, role) VALUES (?, ?, ?, 'user')",
                  [username, email, hash],
                  (err, result) => {
                    console.log(err);
                  }
                );
              } else {
                res.send({
                  message: "Użytkownik o podanym loginie już istnieje",
                });
              }
            }
          );
        } else {
          res.send({
            message: "Użytkownik o podanym emailu już istnieje",
          });
        }
      }
    );
  });
});

app.get("/login", (req, res) => {
  if (req.session.email) {
    res.send({ loggedIn: true, email: req.session.email });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  db.query(
    "SELECT * FROM AccountsSystem WHERE email = ?;",
    [email],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
          if (response) {
            req.session.email = result;
            console.log(req.session.email);
            res.send(result);
          } else {
            res.send({ message: "Nieprawidłowy adres e‑mail lub hasło" });
          }
        });
      } else {
        res.send({ message: "Nieprawidłowy adres e‑mail lub hasło" });
      }
    }
  );
});

app.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    res.clearCookie("userId");
    res.send({ loggedIn: false });
  });
});

app.listen(3001, () => {
  console.log("running server");
});
