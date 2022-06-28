const cloudinary = require('./cloudinary/upload')

const urls = async function (files) {
    let temp = {}
    let i = 0
    for( let file of files) {
        temp[`img${i+1}`] = file.path
        i++
    }
    let images = Object.entries(temp)
    let url = await Promise.all(images.map( result => cloudinary.upload(result[1])))
    return url
}

const images = async function(urls) {
    let images = {}
    let i = 0;
    for(let url of urls) {
        images[`img${i+1}`] = url
        i++
    }
    return images
}

module.exports= {urls, images}