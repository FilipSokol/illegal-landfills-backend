const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// get all users
router.get("/", userController.getAllUsers);

// get user by id
router.get("/:userid", userController.getUserById);

// register user
router.post("/register", userController.registerNewUser);

module.exports = router;
