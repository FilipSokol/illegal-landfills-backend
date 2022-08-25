const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");

// get all users
router.get("/", userController.getAllUsers);

// get user by id
router.get("/:userid", userController.getUserById);

// login
router.post("/login", userController.loginUser);

// register user
router.post("/register", userController.registerUser);

// login
router.delete("/logout", userController.logoutUser);

module.exports = router;
