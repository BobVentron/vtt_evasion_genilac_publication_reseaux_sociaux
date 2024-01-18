const Erreur = require('./gestion/gestionError');
const generationImages = require('./generationImages/posteVttEvasionGenilacImage')
const generationTexte = require('./generationImages/posteVttEvasionGenilacTexte')
const suprPNG = require('./gestion/suppresionPNG')
const arg = process.argv.slice(2);

if (require.main === module) {
    if (arg.length === 4){
        generationImages(arg[0], arg[1])
            .then(() => {
                // La première fonction (generationImages) a terminé
                console.log("La génération d'images est terminée.");
        
                // Appeler la deuxième fonction (generationTexte)
                return generationTexte(arg[1], arg[2], arg[3]);
            })
            .then(() => {
                // La deuxième fonction (generationTexte) a terminé
                console.log("La génération du texte de l'image est terminée.");
        
                // Appeler la troisième fonction (suprPNG)
                return suprPNG();
            })
            .then(() => {
                // La troisième fonction (suprPNG) a terminé
                console.log("Suppression des fichiers PNG terminée.");
            })
            .catch((erreur) => {
                console.error("Une erreur s'est produite :", erreur);
            });
    }else{
        Erreur("index.js" ,"Vous devez donnez 3 parametre qui sont : \n -Le chemin de l'image \n -La date à mettre sur la publication \n -Le groupe a mettre sur la publication \n -Le nombre de km et de D+")
    }
} else {
    console.log("Le script est importé comme module.");
}