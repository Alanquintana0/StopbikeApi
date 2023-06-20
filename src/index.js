const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const clientRoutes = require('./routes/clients');

const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use('/api', clientRoutes);


//routes
app.get('/', (req, res) => {
    res.send('Welcome to my API')
});

//mongodb connection with uri from mongodb atlas
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('DB ok')
}).catch((err) => {
    console.log(err)
});

app.listen(port, () => {
    console.log(`Server listening in port: ${port}`);
})