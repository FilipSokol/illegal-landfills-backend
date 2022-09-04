const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const markerController = require("../controllers/marker.controller");

// get all users
router.get("/users", userController.getAllUsers);

// // get user by id
// router.get("/:userid", userController.getUserById);

// login
router.post("/login", userController.loginUser);

// register user
router.post("/register", userController.registerUser);

// login
router.delete("/logout", userController.logoutUser);

// get all markers
router.get("/markers", markerController.getAllMarkers);

// create marker
router.post("/createmarker", markerController.createMarker);

// report marker
router.post("/deletemarker", markerController.deleteMarker);

// report marker
router.post("/reportmarker", markerController.reportMarker);

// report marker
router.post("/deletereport", markerController.deleteMarkerReport);

// get all reported markers
router.get("/reportedmarkers", markerController.getAllReportedMarkers);

module.exports = router;
