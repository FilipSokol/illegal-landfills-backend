const UserModel = require("../models/user.model");

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

// get user by id
exports.getUserById = (req, res) => {
  UserModel.getUserById(req.params.userid, (error, user) => {
    try {
      res.send(user);
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
