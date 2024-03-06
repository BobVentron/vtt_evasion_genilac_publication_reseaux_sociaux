const fs = require('fs');
const config = require('../config.json');
const logger = require('./gestionLog');

function suprPNG() {
    return new Promise((resolve) => {
        fs.readdirSync(config.directory.fichierImageFinale).forEach(fichier => {
            const cheminFichier = `${config.directory.fichierImageFinale}/${fichier}`;
        
            // Vérifier si le fichier a l'extension .png
            if (fichier.endsWith('temp.png')) {
                // Supprimer le fichier
                fs.unlinkSync(cheminFichier);
                logger.info(`Fichier ${fichier} supprimé avec succès.`);
                resolve();
            }
        });
    });
}

module.exports = suprPNG;