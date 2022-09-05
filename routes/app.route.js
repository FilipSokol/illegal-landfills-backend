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

// login
router.delete("/logout", userController.logoutUser);

// get all markers
router.get("/markers", markerController.getAllMarkers);

// get all user markers
router.post("/usermarkers", markerController.getAllUserMarkers);

// create marker
router.post("/createmarker", markerController.createMarker);

// delete marker
router.post("/deletemarker", markerController.deleteMarker);

// report marker
router.post("/reportmarker", markerController.reportMarker);

// delete report
router.post("/deletereport", markerController.deleteMarkerReport);

// report trash activity
router.post("/reporttrash", markerController.reportTrashActivity);

// get all reported markers
router.get("/reportedmarkers", markerController.getAllReportedMarkers);

module.exports = router;
