//Importamos express y el modelo de la tabla servicio
const express = require('express');
const serviceSchema = require('../models/service');

//Se crea un router para manejar las rutas y peticiones de los servicios
const router = express.Router();

//Se crea un post en la ruta services, el cual recibe el objeto y lo almacena en nuestra base de datos
router.post('/services', (req, res) => {
    //Almacenamos el objeto en una constante del tipo serviceSchema
    const service = serviceSchema(req.body);

    //Almacenamos nuestro objeto en la base de datos con la funcion .save, si funciona nos da un 200, si no un error
    service.save().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({
            message: err
        })
    })
})

//Este metodo get nos devuelve todos los servicios almacenados en nuestra base de datos
router.get('/services', (req, res) => {
    //Buscamos todos los servicios almacenados en nuestra base de datos a traves del schema y la funcion .find
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

//Exportamos el router para el correcto funcionamiento
module.exports = router;