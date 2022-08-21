const mysql = require("mysql");

const dbConn = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "pracainz",
});

dbConn.connect(function (error) {
  if (error) throw error;
  console.log("Polaczono z baza danych");
});

module.exports = dbConn;
