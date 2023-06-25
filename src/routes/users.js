const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");

const router = express.Router();
//Post to users and validation of no repeated username
router.post("/users", async (req, res) => {
  var newUserName = req.body.userName;
  var password = req.body.password;
  var newName = req.body.name;
  var newPhoneNumber = req.body.phoneNumber;
  var newAddress = req.body.address;

  const existingUser = await userSchema.findOne({ userName: newUserName });
  if (existingUser) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const User = {
    userName: newUserName,
    password: passwordHash,
    name: newName,
    phoneNumber: newPhoneNumber,
    address: newAddress,
    salt: salt,
  };

  const newUser = userSchema(User);

  newUser
    .save()
    .then((data) => {
      res.status(200).json({
        message: "User created",
        obj: data
      })
    })
    .catch((err) => {
      res.status(500).json({
        message: "User not created",
        error: err
      });
    });
});

/*
router.post('/login', async(req, res) => {

})
*/
module.exports = router;
