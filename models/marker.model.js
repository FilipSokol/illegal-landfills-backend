const fs = require("fs");
const path = require("path");
const dbConn = require("../config/dbConfig");

const Marker = function (marker) {
  this.markerid = marker.markerid;
  this.userid = marker.userid;
  this.image = marker.image;
  this.imageurl = marker.imageurl;
  this.latitude = marker.latitude;
  this.longitude = marker.longitude;
  this.description = marker.description;
  this.status = marker.status;
  this.created = marker.created;
  this.updated = marker.updated;
  this.type = marker.type;
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
  const type = markerReqData.type;
  const created = new Date();

  dbConn.query(
    "INSERT INTO markers (userid, imageurl, latitude, longitude, description, type, created) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [userid, imageurl, latitude, longitude, description, type, created],
    (err, res) => {
      if (err) {
        console.log(err);
        console.log("Błąd podczas dodawania danych");
        result(null, err);
      } else {
        console.log(res);
        result(null, res);
      }
    }
  );
};

// edit marker description
Marker.editMarkerDescription = (markerReqData, result) => {
  const markerid = markerReqData.markerid;
  const description = markerReqData.description;

  dbConn.query(
    "UPDATE markers SET description = ? WHERE markerid = ?",
    [description, markerid],
    (err, res) => {
      if (err) {
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

// delete trash activity
Marker.deleteTrashMarker = (markerReqData, result) => {
  const markerid = markerReqData.markerid;
  const deleteDate = new Date();
  deleteDate.setDate(deleteDate.getDate() + 3);

  dbConn.query(
    "UPDATE markers SET deleted = ? WHERE markerid = ?",
    [deleteDate, markerid],
    (err, res) => {
      if (err) {
        result(null, err);
      } else {
        result(null, res);
      }
    }
  );
};

// upload marker image
Marker.uploadMarkerImage = (markerReqData, result) => {
  const fileName = `${Date.now() + markerReqData.userid.toString()}.jpeg`;
  const filePath = path.join(__dirname, `../images/${fileName}`);
  const buffer = Buffer.from(markerReqData.image.split(",")[1], "base64");

  try {
    fs.writeFileSync(filePath, buffer);
    result(null, { imageurl: fileName });
  } catch (err) {
    result(null, err);
  }
};

// delete marker image
Marker.deleteMarkerImage = (markerReqData, result) => {
  const imageurl = markerReqData.imageurl;
  const folderPath = path.join(__dirname, "../images/");

  fs.unlink(folderPath + imageurl, (err) => {
    if (err) {
      result(null, err);
    } else {
      result(null, { message: "Zdjęcie zostało usunięte" });
    }
  });
};

module.exports = Marker;
