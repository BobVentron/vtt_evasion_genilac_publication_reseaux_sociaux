const sharp = require('sharp');
const fs = require('fs');
const logger = require('../gestion/gestionLog');
const config = require('../config.json');

function posteVttEvasionTexte(date, km, groupe) {
    return new Promise((resolve) => {
        const cheminImage = config.directory.ImageFinale + date.replace(/\//g, ".") + '_temp' + '.png';
        const ImageFinale = config.directory.ImageFinale + date.replace(/\//g, ".") + '.png';
        const police = config.directory.police;
        if (fs.existsSync(cheminImage)) {
            if (fs.existsSync(police)) {
                sharp(cheminImage)
                    .resize(2100, 2100)
                    .composite([{
                        input: Buffer.from(`<svg width="2100" height="2100" xmlns="http://www.w3.org/2000/svg">
                        <text x="-1200" y="700" font-family="${police}" font-size="170" fill="black" transform="rotate(-90 50,540)">${"Groupe " + groupe}</text>
                        <text x="1000" y="-900" font-family="${police}" font-size="170" fill="black" transform="rotate(90 950,50)">${"du " + date}</text>
                        <text x="700" y="600" font-family="${police}" font-size="120" fill="black" transform="rotate(-7 50,540)">${km}</text>
                        </svg>`),
                        gravity: 'northwest',
                    }])
                    .png({ compressionLevel: 1 })
                    .toFile(ImageFinale, (err, info) => {
                        if (err) {
                            logger.error(err);
                            resolve();
                        } else {
                            logger.info(`Image générée avec succès: ${JSON.stringify(info)}`);
                            resolve();
                        }
                    });
            } else {
                logger.error('Le fichier ' + police + ' n\'existe pas:');
                resolve();
            }
        } else {
            logger.error('Le fichier ' + cheminImage + ' n\'existe pas:');
            resolve();
        }
    });
}

module.exports = posteVttEvasionTexte;
