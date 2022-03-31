var express = require("express");
var router = express.Router();
const UserRegistrationController = require("../controllers/userregistration");

router.get("/", UserRegistrationController.getUsers);
router.post("/", UserRegistrationController.createUser);
router.get(
  "/checkusername/:username",
  UserRegistrationController.checkUsername
);
router.get("/checkemail/:email", UserRegistrationController.checkEmail);
module.exports = router;
