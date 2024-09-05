const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const noteRoutes = require('./routes');
app.use('/notes', noteRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});