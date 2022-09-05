const MarkerModel = require("../models/marker.model");

// create marker
exports.createMarker = (req, res) => {
  const markerReqData = new MarkerModel(req.body);
  MarkerModel.createMarker(markerReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// get all markers
exports.getAllMarkers = (req, res) => {
  MarkerModel.getAllMarkers((error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// get all user markers
exports.getAllUserMarkers = (req, res) => {
  const markerReqData = new MarkerModel(req.body);
  MarkerModel.getAllUserMarkers(markerReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// delete marker
exports.deleteMarker = (req, res) => {
  const markerReqData = new MarkerModel(req.body);
  MarkerModel.deleteMarker(markerReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// report marker
exports.reportMarker = (req, res) => {
  const markerReqData = new MarkerModel(req.body);
  MarkerModel.reportMarker(markerReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// delete marker report
exports.deleteMarkerReport = (req, res) => {
  const markerReqData = new MarkerModel(req.body);
  MarkerModel.deleteMarkerReport(markerReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// report trash activity
exports.reportTrashActivity = (req, res) => {
  const markerReqData = new MarkerModel(req.body);
  MarkerModel.reportTrashActivity(markerReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// get all markers
exports.getAllReportedMarkers = (req, res) => {
  MarkerModel.getAllReportedMarkers((error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};
