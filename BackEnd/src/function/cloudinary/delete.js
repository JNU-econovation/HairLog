import { v2 as cloudinary } from 'cloudinary'

// delete image in cloudinary
const deleteId = async function (id){
    try{
        let result = await cloudinary.uploader.destroy(id)
        return result
    }catch(e){ 
        console.log(e)
    }
}


export default { deleteId }