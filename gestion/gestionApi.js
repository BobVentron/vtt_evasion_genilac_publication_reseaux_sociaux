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
  connection.query('SELECT nom FROM user WHERE login = ? AND mot_de_passe = ?', [login, password], (error, results) => {
    if (error) {
      logger.error('Erreur lors de la vérification des informations de connexion :', error);
      res.status(500).json({ error: 'Erreur lors de la vérification des informations de connexion' });
    } else {
      if (results.length > 0) {
        const nomUtilisateur = results[0].nom;
        logger.info(`Connexion réussie pour l'utilisateur: ${nomUtilisateur}`);
        res.json({ message: `Connexion réussie pour l'utilisateur: ${nomUtilisateur}` });
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
  
    let formattedGroupe = "";
    switch (JSON.stringify(choices)) {
        case "[\"option1\"]":
            formattedGroupe = "des jeunes";
            break;
        case "[\"option2\"]":
            formattedGroupe = "intermédiaire";
            break;
        case "[\"option3\"]":
            formattedGroupe = "des forts";
            break;
        case "[\"option4\"]":
            formattedGroupe = "mixte";
            break;
        default:
            formattedGroupe = "inconnu";
    }

    // Récupérer le chemin du fichier image téléchargé
    const imagePath = req.file.path;
    logger.info(`Chemin du fichier image téléchargé : ${imagePath}`);
  
    genererPost(imagePath, date, text1, choices)

    const query = 'INSERT INTO poste (user ,date, groupe, `km/D+`, commentaire, NomFich) VALUES (?, ?, ?, ?, ?, ?)';
    const values = [1, date, formattedGroupe, text1, text2, imagePath];
  
    connection.query(query, values, (error, results) => {
      if (error) {
        logger.error('Erreur lors de l\'enregistrement des données dans la base de données :', error);
        res.status(500).json({ error: 'Erreur lors de l\'enregistrement des données dans la base de données' });
      } else {
        logger.info('Données enregistrées avec succès dans la base de données');
        res.status(200).json({ message: 'Données et image reçues et enregistrées avec succès' });
      }
    });
});

module.exports = router;