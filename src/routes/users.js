const express = require('express');
const bcrypt = require('bcrypt');
const userSchema = require('../models/user');

const router = express.Router();

router.post('/users', async (req, res) => {
    var newUserName = req.body.userName;
    var password = req.body.password;
    var newName = req.body.name;
    var newPhoneNumber = req.body.phoneNumber;
    var newAddress = req.body.address;

    const salt = await bcrypt.genSalt(10);

    const passwordHash = await bcrypt.hash(password, salt);

    const User = {
        userName: newUserName,
        password: passwordHash,
        name: newName,
        phoneNumber: newPhoneNumber,
        address: newAddress,
        salt: salt
    };

    const newUser = userSchema(User);
    
    newUser.save()
    .then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            message: err
        })
    });
})

module.exports = router;