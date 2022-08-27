const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const markerController = require("../controllers/marker.controller");

// get all users
router.get("/users", userController.getAllUsers);

// get user by id
router.get("/:userid", userController.getUserById);

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

module.exports = router;
