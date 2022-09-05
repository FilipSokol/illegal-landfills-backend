const dbConn = require("../config/dbConfig");

const Marker = function (marker) {
  this.markerid = marker.markerid;
  this.userid = marker.userid;
  this.imageurl = marker.imageurl;
  this.latitude = marker.latitude;
  this.longitude = marker.longitude;
  this.description = marker.description;
  this.status = marker.status;
  this.spam = marker.spam;
  this.created = marker.created;
  this.updated = marker.updated;
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

// get all user markers
Marker.getAllUserMarkers = (markerReqData, result) => {
  const userid = markerReqData.userid;

  dbConn.query(
    "SELECT * FROM markers WHERE userid = ?",
    [userid],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// create marker
Marker.createMarker = (markerReqData, result) => {
  const userid = markerReqData.userid;
  const imageurl = markerReqData.imageurl;
  const latitude = markerReqData.latitude;
  const longitude = markerReqData.longitude;
  const description = markerReqData.description;
  const created = new Date();

  dbConn.query(
    "INSERT INTO markers (userid, imageurl, latitude, longitude, description, created, status, spam) VALUES (?, ?, ?, ?, ?, ?, 'activated', 'false')",
    [userid, imageurl, latitude, longitude, description, created],
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

// delete marker
Marker.deleteMarker = (markerReqData, result) => {
  const markerid = markerReqData.markerid;
  dbConn.query(
    "DELETE FROM markers WHERE markerid = ?",
    [markerid],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// report marker
Marker.reportMarker = (markerReqData, result) => {
  const markerid = markerReqData.markerid;
  dbConn.query(
    "UPDATE markers SET spam = 'true' WHERE markerid = ?",
    [markerid],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// delete marker report
Marker.deleteMarkerReport = (markerReqData, result) => {
  const markerid = markerReqData.markerid;
  dbConn.query(
    "UPDATE markers SET spam = 'false' WHERE markerid = ?",
    [markerid],
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
Marker.getAllReportedMarkers = (result) => {
  dbConn.query("SELECT * FROM markers WHERE spam = 'true'", (err, res) => {
    if (err) {
      result(null, err);
    } else {
      result(null, res);
    }
  });
};

// report trash activity
Marker.reportTrashActivity = (markerReqData, result) => {
  const markerid = markerReqData.markerid;
  const updated = new Date();

  dbConn.query(
    "UPDATE markers SET updated = ? WHERE markerid = ?",
    [updated, markerid],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

module.exports = Marker;
