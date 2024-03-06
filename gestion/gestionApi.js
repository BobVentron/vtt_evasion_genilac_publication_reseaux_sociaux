const express = require('express');
const multer = require('multer');

const config = require('../config.json')
const genererPost = require('../generationImages/genererPost');
const logger = require('./gestionLog');
const connection = require('./connectBDD')

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, config.directory.telecharger); // Spécifiez le répertoire de destination des fichiers téléchargés
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Générer un nom de fichier unique
    }
});

// Configurer multer pour gérer le téléchargement de fichiers
const upload = multer({ storage: storage });

router.post('/login', (req, res) => {
  const { login, password } = req.body;
  
  // Vérifier les informations de connexion dans la base de données
  connection.query('SELECT * FROM user WHERE login = ? AND mot_de_passe = ?', [login, password], (error, results) => {
    if (error) {
      logger.error('Erreur lors de la vérification des informations de connexion :', error);
      res.status(500).json({ error: 'Erreur lors de la vérification des informations de connexion' });
    } else {
      if (results.length > 0) {
        logger.info('Connexion réussie');
        res.json({ message: 'Connexion réussie' });
      } else {
        logger.warn('Identifiants incorrects');
        res.status(401).json({ error: 'Identifiants incorrects' });
      }
    }
  });
});

router.post('/forms', upload.single('image'), (req, res) => {
    // Vérifier si un fichier a été téléchargé
    if (!req.file) {
      logger.error('Aucun fichier téléchargé');
      return res.status(400).json({ error: 'Aucun fichier téléchargé' });
    }
  
    // Récupérer les données du formulaire
    const text1 = req.body.text1;
    const date = req.body.date;
    const choices = req.body.choices;
    const text2 = req.body.text2;
    logger.info(`Données du formulaire : text1=${text1}, date=${date}, choices=${choices}, text2=${text2}`);
  
    // Récupérer le chemin du fichier image téléchargé
    const imagePath = req.file.path;
    logger.info(`Chemin du fichier image téléchargé : ${imagePath}`);
  
    genererPost(imagePath, date, text1, choices)

    res.status(200).json({ message: 'Données et image reçues avec succès' });
});

module.exports = router;