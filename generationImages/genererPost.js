const moment = require('moment');
const logger = require('../gestion/gestionLog');

const generationImages = require('./posteVttEvasionGenilacImage');
const generationTexte = require('./posteVttEvasionGenilacTexte');
const suprPNG = require('../gestion/suppresionPNG');

function genererPost(cheminImage, date, distance, groupe) {
    const formattedDate = moment(date).format('DD/MM/YYYY');
    
    let formattedGroupe = "";
    switch (JSON.stringify(groupe)) {
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
    
    generationImages(cheminImage, formattedDate)
        .then(() => {
            // La première fonction (generationImages) a terminé
            logger.info("La génération d'images est terminée.");
    
            // Appeler la deuxième fonction (generationTexte)
            return generationTexte(formattedDate, distance, formattedGroupe);
        })
        .then(() => {
            // La deuxième fonction (generationTexte) a terminé
            logger.info("La génération du texte de l'image est terminée.");
    
            // Appeler la troisième fonction (suprPNG)
            return suprPNG();
        })
        .then(() => {
            // La troisième fonction (suprPNG) a terminé
            logger.info("Suppression des fichiers PNG terminée.");
        })
        .catch((erreur) => {
            logger.error("Une erreur s'est produite :", erreur);
        });
}

module.exports = genererPost;