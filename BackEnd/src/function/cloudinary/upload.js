const cloudinary = require('cloudinary').v2

const upload = async function (req){
    
    try{
        var result = await cloudinary.uploader.upload(req.file.path, {upload_preset: "hairlog"})
        return result.url
    }catch(e){ 
        console.log(e)
    }

}


module.exports = { upload }