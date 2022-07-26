import { v2 as cloudinary } from 'cloudinary'

// upload image to cloudinary
const upload = async function (path){
    try{
        var result = await cloudinary.uploader.upload(path, {upload_preset: "hairlog"})
        return result
    }catch(e){ 
        console.log(e)
    }
}


export default { upload }