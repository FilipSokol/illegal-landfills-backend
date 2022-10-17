const ReportModel = require("../models/report.model");

// create report
exports.createReport = (req, res) => {
  const reportReqData = new ReportModel(req.body);
  ReportModel.createReport(reportReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// delete report
exports.deleteReport = (req, res) => {
  const reportReqData = new ReportModel(req.body);
  ReportModel.deleteReport(reportReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// get all reports
exports.getAllReports = (req, res) => {
  ReportModel.getAllReports((error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};
