const dbConn = require("../config/dbConfig");

const Marker = function (marker) {
  this.userid = marker.userid;
  this.imageurl = marker.imageurl;
  this.latitude = marker.latitude;
  this.longitude = marker.longitude;
  this.description = marker.description;
  this.status = marker.status;
  this.spam = marker.spam;
};

// get all markers
Marker.getAllMarkers = (result) => {
  dbConn.query("SELECT * FROM markers", (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// create marker
Marker.createMarker = (markerReqData, result) => {
  const userid = markerReqData.userid;
  const imageurl = markerReqData.imageurl;
  const latitude = markerReqData.latitude;
  const longitude = markerReqData.longitude;
  const description = markerReqData.description;
  const status = markerReqData.status;
  const created = new Date();

  dbConn.query(
    "INSERT INTO markers (userid, imageurl, latitude, longitude, description, status, created, spam) VALUES (?, ?, ?, ?, ?, ?, ?, 'false')",
    [userid, imageurl, latitude, longitude, description, status, created],
    (err, res) => {
      if (err) {
        console.log("Error while inserting data");
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Marker;
