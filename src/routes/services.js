const express = require('express');
const serviceSchema = require('../models/service');

//Se crea un router para manejar las rutas y peticiones de los servicios
const router = express.Router();

router.post('/services', (req, res) => {
    const service = serviceSchema(req.body);
    service.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            message: err
        })
    })
})

router.get('/services', (req, res) => {
    serviceSchema
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

module.exports = router;