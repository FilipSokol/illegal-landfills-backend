const UserModel = require("../models/user.model");
const dotenv = require("dotenv");

dotenv.config();
process.env.TOKEN_SECRET;

// get all user list
exports.getAllUsers = (req, res) => {
  UserModel.getAllUsers((error, users) => {
    try {
      res.send(users);
    } catch (err) {
      res.send(err);
    }
  });
};

// delete user
exports.deleteUser = (req, res) => {
  const userReqData = new UserModel(req.body);
  UserModel.deleteUser(userReqData, (error, data) => {
    try {
      res.send(data);
    } catch (err) {
      res.send(err);
    }
  });
};

// login user
exports.loginUser = (req, res) => {
  const userReqData = new UserModel(req.body);
  UserModel.loginUser(userReqData, (error, message) => {
    try {
      res.send(message);
    } catch (err) {
      res.send(err);
    }
  });
};

// register user
exports.registerUser = (req, res) => {
  const userReqData = new UserModel(req.body);
  console.log(req.body);
  UserModel.registerUser(userReqData, (error, message) => {
    try {
      res.send(message);
    } catch (err) {
      res.send(err);
    }
  });
};

// logout User
exports.logoutUser = (req, res) => {
  const refreshToken = req.header("x-auth-token");

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
  res.sendStatus(204);
};
