const bcrypt = require("bcrypt");
const UserRegistration = require("../models/userregistration");
exports.getUsers = (req, res) => {
  UserRegistration.find((err, user_list) => {
    if (err) {
      res.json(err);
    } else {
      res.json(user_list);
    }
  });
};
exports.createUser = (req, res) => {
  console.log(req.body);
  let encryptedPassword;
  try {
    let salt = bcrypt.genSaltSync(10);
    console.log(salt);
    encryptedPassword = bcrypt.hashSync(req.body.password, salt);
    console.log(encryptedPassword);
  } catch (err) {
    console.log(err);
    console.log("Error in bcrypt");
  }
  const userOb = new UserRegistration({
    username: req.body.username,
    email: req.body.email,
    password: encryptedPassword,
    dob: req.body.dob,
  });
  console.log(userOb);
  userOb.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      res.json("User created successfully");
    }
  });
};
exports.checkUsername = async (req, res) => {
  const { username } = req.params;
  let userOb = await UserRegistration.findOne({ username });
  if (!userOb) {
    res.json({ status: 1, msg: "user doesnt exist" });
  } else {
    res.json({ status: 0, debug_data: "user exists" });
  }
};
exports.checkEmail = async (req, res) => {
  const { email } = req.params;
  let userOb = await UserRegistration.findOne({ email });
  if (!userOb) {
    res.json({ status: 1, debug_data: "Email ID doesnot exists" });
  } else {
    res.json({ status: 0, debug_data: "Email ID already exists" });
  }
};
