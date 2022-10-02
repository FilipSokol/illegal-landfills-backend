const mysql = require("mysql");
const cron = require("node-cron");

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

//“At 00:00.” at 2022-10-03 00:00:00
// cron.schedule("0 0 * * *", () => {

cron.schedule("0 0 * * *", () => {
  const currentDate = new Date();
  dbConn.query(
    "DELETE FROM markers WHERE ? > deleted",
    [currentDate],
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log("Dokonano usunięcia zgłoszonych postów");
      }
    }
  );
});

module.exports = dbConn;
