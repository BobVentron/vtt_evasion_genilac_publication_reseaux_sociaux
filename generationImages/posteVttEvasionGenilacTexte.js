const sharp = require('sharp');
const fs = require('fs');

function posteVttEvasionTexte(date, km, groupe){
    return new Promise((resolve) => {
        const cheminImage = './media/images_final/sortie_du_' + date.replace(/\//g, ".") + '_temp' + '.png' 
        const ImageFinale = './media/images_final/sortie_du_' + date.replace(/\//g, ".") + '.png'
        const police = './media/fonts/Aileron-Bold.otf'
        if (fs.existsSync(cheminImage)){
            if (fs.existsSync(police)){
                sharp(cheminImage)
                .resize(2100, 2100)
                .composite([{
                    input: Buffer.from(`<svg width="2100" height="2100" xmlns="http://www.w3.org/2000/svg">
                    <text x="-1200" y="700" font-family="${police}" font-size="170" fill="black" transform="rotate(-90 50,540)">${"Groupe des " + groupe}</text>
                    <text x="1000" y="-900" font-family="${police}" font-size="170" fill="black" transform="rotate(90 950,50)">${"du " + date}</text>
                    <text x="700" y="600" font-family="${police}" font-size="120" fill="black" transform="rotate(-7 50,540)">${km}</text>
                    </svg>`),
                    gravity: 'northwest',
                }])
                .png({ compressionLevel: 1 })
                .toFile(ImageFinale, (err, info) => {
                    if (err) {
                        console.error(err);
                        resolve();
                    } else {
                        console.log('Image générée avec succès:', info);
                        resolve();
                    };
                });
            }else{
                console.error('Le fichier ' + police + ' n\'existe pas:');
                resolve();
            }
        }else{
            console.error('Le fichier ' + cheminImage + ' n\'existe pas:');
            resolve();
        }
    });
}

module.exports = posteVttEvasionTexte;