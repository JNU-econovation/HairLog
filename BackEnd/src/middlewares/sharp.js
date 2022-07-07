const sharp = require('sharp')
const fs = require('fs');

const sharping = async function(req, res, next) {

            return await Promise.all(
                req.files.map(file => 
                sharp(file.path)
                .resize({ width: 600 })
                .withMetadata()
                .toBuffer({resolveWithObject : true})
                .then(({data}) => {
                    fs.writeFile(file.path, data, (err) => {
                        if (err)
                            throw err;
                    })
                })
            )).then(()=> {
                return next()
            })

}


module.exports = {sharping}