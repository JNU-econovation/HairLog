const sharp = require('sharp')
const fs = require('fs')

const sharping = async function(req, res, next) {
    
    try {
        for( let i = 0; i < 3; i++) {
            sharp(req.files[i].path)
            .resize({ width: 600 })
            .withMetadata()
            .toBuffer((err, buffer) => {
                if (err)
                    throw err;

                fs.writeFile(req.files[i].path, buffer, (err) => {
                    if (err)
                        throw err;
                });
            });
        }
        next()
    } catch (err) {
        console.log(err);
    }

}


module.exports = {sharping}