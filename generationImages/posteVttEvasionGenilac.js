const sharp = require('sharp');

function posteVttEvasion(img, date, groupe, km){
    const cheminImageFinale = './media/images_final/sortie_du_' + date.replace(/\//g, ".") + '.jpg' 
    const srcTemplates = './media/templates/template.png'
    sharp(srcTemplates)
    .composite([{ input: img, gravity: 'center' }])
    .toFile(cheminImageFinale, (err, info) => {
        if (err) {
        console.error(err);
        } else {
        console.log('Image générée avec succès:', info);
        }
    });
}

module.exports = posteVttEvasion;