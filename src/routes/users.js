//Se importan las librerias necesarias para manejar los usuarios
const express = require("express");
const bcrypt = require("bcrypt");
const userSchema = require("../models/user");

//Se importa el router de express almacenandolo en una constante
const router = express.Router();
//Post to users and validation of no repeated username
router.post("/users", async (req, res) => {
  //Dentro del post, igualamos los parametros recibidos en el body en variables
  var newUserName = req.body.userName;
  var password = req.body.password;
  var newName = req.body.name;
  var newPhoneNumber = req.body.phoneNumber;
  var newAddress = req.body.address;

  //Se comprueba que el usuario no exista en la base de datos almacenando el resultado en una constante
  const existingUser = await userSchema.findOne({ userName: newUserName });
  //Se comprueba si el usuario existe o no, si no existe devolvemos un codigo de error
  if (existingUser) {
    return res.status(400).json({
      message: "Username already exists"
    });
  }

  //Generamos un salt para encriptar nuestra contrasena
  const salt = await bcrypt.genSalt(10);
  //La contrasena la encriptamos y la almacenamos en una constante que contendra nuestra contrasena ya encriptada
  const passwordHash = await bcrypt.hash(password, salt);

  //Creamos un objeto con los datos del usuario, la contrasena ya encriptada y el salt
  const User = {
    userName: newUserName,
    password: passwordHash,
    name: newName,
    phoneNumber: newPhoneNumber,
    address: newAddress,
    salt: salt,
  };

  //Creamos una constante llamada newUser, que es un objeto del tipo userSchema, que contiene los datos del usuario ya ligualados a nuestro schema
  const newUser = userSchema(User);

  //Guardamos el usuario en nuestra base de datos, si funciona nos devuelve un 200 y el mensaje de usuario creado, si no devuelve un 500 y el error
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

//Este post a la ruta login nos permite crear un inicio de sesion en nuestra api.
router.post('/login', async (req, res) => {
  //Recibimos como parametros userName y contrasena, despues los almacenamos en constantes
  const userName = req.body.userName;
  const password = req.body.password;

  //Creamos una constante que almacena el resultado de la busqueda del username en nuestra base de datos
  const user = await userSchema.findOne({ userName: userName });

  //Si el usuario no existe, devolvemos un codigo de error y un mensaje de error
  if (!user) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }

  //En una constante almacenamos el resultado de la contrasena recibida y la almacenada en la base de datos.
  const passwordMatch = await bcrypt.compare(password, user.password);

  //Si las contrasenas no coinciden, se devuelve un error y un mensaje indicando que no se pudo iniciar sesion
  if (!passwordMatch) {
    return res.status(401).json({
      message: 'Authentication failed'
    });
  }

  //Si todo coincide y funciona correctamente, mandamos un mensaje de inicio de sesion correcto y un codigo 200
  res.status(200).json({
    message: 'Authentication successful'
  });
});

//Se exporta el router para poder ser utilizado
module.exports = router;
