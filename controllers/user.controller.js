const UserModel = require("../models/user.model");

// get all user list
exports.getAllUsers = (req, res) => {
  UserModel.getAllUsers((err, users) => {
    try {
      res.send(users);
    } catch (error) {
      res.send(error);
    }
  });
};

// get user by id
exports.getUserById = (req, res) => {
  UserModel.getUserById(req.params.userid, (err, user) => {
    try {
      res.send(user);
    } catch (error) {
      res.send(error);
    }
  });
};

// register user
exports.registerNewUser = (req, res) => {
  const userReqData = new UserModel(req.body);
  console.log("userReqData", userReqData);
  UserModel.registerUser(userReqData, (err, user) => {
    if (err) res.send(err);
    res.json({
      message: "Employee Created Successfully",
      data: user.userid,
    });
  });
};
