const cloudinary = require('cloudinary').v2

const upload = async function (path){
    
    try{
        var result = await cloudinary.uploader.upload(path, {upload_preset: "hairlog"})
        return result
    }catch(e){ 
        console.log(e)
    }

}


module.exports = { upload }