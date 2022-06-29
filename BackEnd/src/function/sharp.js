const sharp = require('sharp')
const fs = require('fs')

const sharping = async function(req, res, next) {

            await Promise.all(req.files.map(file => 
                sharp(file.path)
                .resize({ width: 600 })
                .withMetadata()
                .toBuffer((err, buffer) => {
                    if (err)
                        throw err;
    
                    fs.writeFile(file.path, buffer, (err) => {
                        if (err)
                            throw err;
                    });
                })
            ))


}


module.exports = {sharping}