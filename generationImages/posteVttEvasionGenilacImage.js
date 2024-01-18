const sharp = require('sharp');
const fs = require('fs');

function posteVttEvasionImage(img, date){
    return new Promise((resolve) => {
        const cheminImageFinale = './media/images_final/sortie_du_' + date.replace(/\//g, ".") + '_temp' + '.png' 
        const srcTemplates = './media/templates/template.png'
        const cheminImageTemp = './media/images_final/image_temp.png'

        if (fs.existsSync(srcTemplates)){
            sharp(img)
            .resize({ width: 1400, height: 1400 })
            .toFile(cheminImageTemp, (err, info) => {
                if (err) {
                    console.error(err);
                    resolve();
                } else {
                    console.log('Image générée avec succès:', info);
                    // Obtenir les dimensions de l'image de fond
                    sharp(srcTemplates).metadata((err, metadata) => {
                        if (err) {
                            console.error(err);
                            resolve();
                        } else {
                            // Superposer les images en utilisant les dimensions de l'image de fond
                            sharp(srcTemplates)
                            .png({ compressionLevel: 8 })
                            .resize({ width: 2100, height: 2100 })
                            .composite([{ input: cheminImageTemp, gravity: 'center' }])
                            .rotate(7) // Rotation de 7 degrés vers la gauche
                            .toBuffer((err, buffer) => {
                                if (err) {
                                    console.error(err);
                                } else {
                                    // Rotation supplémentaire de -7 degrés
                                    sharp(buffer)
                                        .rotate(-7) // Rotation de -7 degrés
                                        .trim() // Recadrer pour enlever les bords noirs
                                        .resize(2100, 2100) // Redimensionner à la taille finale
                                        .toFile(cheminImageFinale, (err, info) => {
                                            if (err) {
                                                console.error(err);
                                                resolve();
                                            } else {
                                                console.log('Image générée avec succès:', info);
                                                resolve();
                                            }
                                        });
                                }
                            });
                        }
                    });
                }
            });
        }else{
            console.error('Le fichier image de fond n\'existe pas:', srcTemplates);
            resolve();
        }
        
    });
}

module.exports = posteVttEvasionImage;