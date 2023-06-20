const express = require("express");
const clientSchema = require('../models/client');

const router = express.Router();

//Create client
router.post('/clients', (req, res) => {
    const user = clientSchema(req.body);
    user.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({
            message: err
        })
    });
});

//Get all clients
router.get('/clients', (req, res) => {
    clientSchema
    .find()
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({
            message: err
        })
    });
});

//find client
router.get('/clients/:id', (req, res) => {
    const { id } = req.params;
    clientSchema
    .findById(id)
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({
            message: err
        })
    });
});

//update a client
router.put('/clients/:id', (req, res) => {
    const { id } = req.params;
    const { name, lastName, phoneNumber, address } = req.body;
    clientSchema
    .updateOne({ _id: id }, { $set: {name, lastName, phoneNumber, address} })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({
            message: err
        })
    });
});

//delete a client
router.delete('/clients/:id', (req, res) => {
    const { id } = req.params;
    clientSchema
    .deleteOne({ _id: id })
    .then((data) => {
        res.json(data)
    })
    .catch((err) => {
        res.json({
            message: err
        })
    });
});

module.exports = router;