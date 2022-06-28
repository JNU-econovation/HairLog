const cloudinary = require('./cloudinary/upload')

const urls = async function (files) {
    let images = {}
    for(let i =0; i < 3; i++) {
        images[`img${i+1}`] = files[i].path
    }
    let array = Object.entries(images)
    let url = await Promise.all(array.map( result => cloudinary.upload(result[1])))
    return url
}

const images = async function(urls) {
    console.log(urls)
    let images = {}
    for(let i =0; i < 3; i++) {
        images[`img${i+1}`] = urls[i]
    }
    return images
}

module.exports= {urls, images}