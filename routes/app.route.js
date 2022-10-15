const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const markerController = require("../controllers/marker.controller");

// get all users
router.get("/users", userController.getAllUsers);

// delete user
router.post("/deleteuser", userController.deleteUser);

// login
router.post("/login", userController.loginUser);

// register user
router.post("/register", userController.registerUser);

// get users scoreboard
router.get("/scoreboard", userController.scoreboard);

// get all markers
router.get("/markers", markerController.getAllMarkers);

// get all user markers
router.post("/usermarkers", markerController.getAllUserMarkers);

// create marker
router.post("/createmarker", markerController.createMarker);

// edit marker description
router.post("/editdescription", markerController.editMarkerDescription);

// delete marker
router.post("/deletemarker", markerController.deleteMarker);

// report marker
router.post("/reportmarker", markerController.reportMarker);

// get all reported markers
router.get("/reportedmarkers", markerController.getAllReportedMarkers);

// delete report
router.post("/deletereport", markerController.deleteMarkerReport);

// delete reported trash marker
router.post("/deletetrashmarker", markerController.deleteTrashMarker);

// report trash activity
router.post("/reporttrash", markerController.reportTrashActivity);

module.exports = router;
