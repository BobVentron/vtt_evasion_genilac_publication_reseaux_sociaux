const Erreur = require('./gestion/gestionError');
const generationImages = require('./generationImages/posteVttEvasionGenilac')
const arg = process.argv.slice(2);

if (require.main === module) {
    if (arg.length === 4){
        generationImages(arg[0], arg[1], arg[2], arg[3])
        console.log("ok")
    }else{
        Erreur("index.js" ,"Vous devez donnez 3 parametre qui sont : \n -Le chemin de l'image \n -La date à mettre sur la publication \n -Le groupe a mettre sur la publication \n -Le nombre de km et de D+")
    }
} else {
    console.log("Le script est importé comme module.");
}