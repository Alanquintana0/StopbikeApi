//Se importan las dependencias, express para manejar el backend, mongoose para la conexion con la base de datos y dotenv para las variables de entorno
const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const clientRoutes = require('./routes/clients');
const serviceRoutes = require('./routes/services');

//Se usa una variable app para manejar los metodos de express, y se define el puerto con una variable de entorno o el puerto 3000
const app = express();
const port = process.env.PORT || 3000;

//middlewares para la manipulacion de jsons y de las rutas, para el uso de las rutas siempre se tendra que usar /api/ antes de la ruta
app.use(express.json());
app.use('/api', clientRoutes);
app.use('/api', serviceRoutes);


//el get a localhost sin una ruta especificada nos arrojara este mensaje predeterminado
app.get('/', (req, res) => {
    res.send('Welcome to my API')
});

//MongoDB nos conectara a la base de datos a traves de una variable de entorno, que nos lleva al URI de nuestro mongodb atlas.
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB ok')
}).catch((err) => {
    console.log(err)
});

//Al iniciar el servidor nos mostrara este mensaje en la consola
app.listen(port, () => {
    console.log(`Server listening in port: ${port}`);
})