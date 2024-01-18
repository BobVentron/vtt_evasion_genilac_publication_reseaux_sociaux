const fs = require('fs');
function suprPNG(){
    return new Promise((resolve) => {
        fs.readdirSync('./media/images_final').forEach(fichier => {
            const cheminFichier = `./media/images_final/${fichier}`;
        
            // Vérifier si le fichier a l'extension .png
            if (fichier.endsWith('temp.png')) {
                // Supprimer le fichier
                fs.unlinkSync(cheminFichier);
                console.log(`Fichier ${fichier} supprimé avec succès.`);
                resolve();
            }
        });
    });
}

module.exports = suprPNG;