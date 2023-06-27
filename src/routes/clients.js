//Importamos las librerias necesarias y el schema de clientes
const express = require("express");
const clientSchema = require('../models/client');

//Importamos la funcion router de express para manejar las rutas y peticiones
const router = express.Router();

//Creamos un metodo post para almacenar clients en nuestra base de datos
router.post('/clients', (req, res) => {
    //Almacenamos el objeto recibido en una constante del tipo clientSchema
    const user = clientSchema(req.body);

    //Los datos almacenados los mandamos a nuestra base de datos a traves de nuestro metodo .save, si funciona nos devuelve un 200, si no un error
    user.save().then((data) => {
        res.json(data)
    }).catch((err) => {
        res.json({
            message: err
        })
    });
});

//
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