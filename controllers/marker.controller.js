const MarkerModel = require("../models/marker.model");

// get all markers
exports.getAllMarkers = (req, res) => {
  MarkerModel.getAllMarkers((error, markers) => {
    try {
      res.send(markers);
    } catch (err) {
      res.send(err);
    }
  });
};

// create marker
exports.createMarker = (req, res) => {
  const markerReqData = new MarkerModel(req.body);
  console.log(req.body);
  MarkerModel.createMarker(markerReqData, (error, message) => {
    try {
      res.send(message);
    } catch (err) {
      res.send(err);
    }
  });
};
