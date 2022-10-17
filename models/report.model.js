const dbConn = require("../config/dbConfig");

const Report = function (report) {
  this.reportid = report.reportid;
  this.markerid = report.markerid;
  this.reporteduserid = report.reporteduserid;
  this.reportedbyid = report.reportedbyid;
  this.reason = report.reason;
};

// create report
Report.createReport = (reportReqData, result) => {
  const markerid = reportReqData.markerid;
  const reporteduserid = reportReqData.reporteduserid;
  const reportedbyid = reportReqData.reportedbyid;
  const reason = reportReqData.reason;

  //! ogarnac tego elsa
  dbConn.query(
    "SELECT markerid FROM reports WHERE markerid = '" + markerid + "'",
    (err, res) => {
      if (res.length === 0) {
        dbConn.query(
          "INSERT INTO reports (markerid, reporteduserid, reportedbyid, reason) VALUES (?, ?, ?, ?)",
          [markerid, reporteduserid, reportedbyid, reason],
          (err, res) => {
            if (err) {
              result(null, err);
            } else {
              console.log(res);
              result(null, res);
            }
          }
        );
      } else {
        result(null, {
          message: "Postał został już przez kogoś zgłoszony.",
        });
      }
    }
  );
};

// delte report
Report.deleteReport = (reportReqData, result) => {
  const reportid = reportReqData.reportid;

  dbConn.query(
    "DELETE FROM reports WHERE reportid = ?",
    [reportid],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// get all reported markers
Report.getAllReports = (result) => {
  dbConn.query(
    "SELECT r.*, m.imageurl, m.description, m.created, u.username AS reportedusername FROM reports r JOIN markers m ON r.markerid = m.markerid JOIN users u ON r.reporteduserid = u.userid",
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Report;
