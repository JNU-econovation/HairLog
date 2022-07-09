const cloudinary = require('cloudinary').v2

const deleteId = async function (id){
    
    try{
        let result = await cloudinary.uploader.destroy(id)
        return result
    }catch(e){ 
        console.log(e)
    }

}


module.exports = { deleteId }