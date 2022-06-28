const cloudinary = require('cloudinary').v2

const upload = async function (req){
    var result = await cloudinary.uploader.upload(req.file.path, {upload_preset: "hairlog"})
    return result.url
}


module.exports = { upload }