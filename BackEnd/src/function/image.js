        // let imageUrl = await cloudinary.upload(req)
        // let image = await record.createImage({ img1 : imageUrl})

const cloudinary = require('./cloudinary/upload')

const urls = async function (req) {
    let urls = await Promise.all(req.files.map(file => cloudinary.upload(file.path)))
    return urls
}

const images = async function(recordInstance, urls) {
    let images = {}
    for(let i =0; i < 3; i++) {
        images[`img${i+1}`] = urls[i]
    }
    return images
}

module.exports= {urls, images}