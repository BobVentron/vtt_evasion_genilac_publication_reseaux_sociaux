const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('./config.json')
const connection =require('./gestion/connectBDD')
const logger = require('./gestion/gestionLog');
const apiRoutes = require('./gestion/gestionApi');

const app = express();

// Middleware pour autoriser les requêtes cross-origin (CORS)
app.use(cors());

// Middleware pour parser le corps des requêtes en JSON
app.use(bodyParser.json());

// Routes
app.use('/api', apiRoutes);

// Connectez-vous à la base de données
connection.connect((err) => {
    if (err) {
        logger.error('Erreur de connexion à la base de données :', err);
    } else {
        logger.log('connect', `Connecté à la base de données MySQL : ${config.db.database}`);
    }
});

connection.on('error', (err) => {
    logger.error('Erreur MySQL :', err);
});

app.use((req, res, next) => {
    logger.warn(`Route inconnue : ${req.method} ${req.url}`);
    res.status(404).json({ error: 'Route not found' });
});

// Démarrer le serveur Express
app.listen(config.port, () => {
    logger.log('connect', `Server is running on port ${config.port}`);
});