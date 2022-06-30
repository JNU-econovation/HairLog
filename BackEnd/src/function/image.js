const cloudinary = require('./cloudinary/upload')

const urls = async function (files) {
    let temp = {}
    let i = 0
    for(let file of files) {
        temp[`img${i+1}`] = file.path
        i++
    }
    let images = Object.entries(temp)
    let url = await Promise.all(images.map(result => cloudinary.upload(result[1])))
    return url
}

const query = async function(urls) {
    let imgQeury = {}
    let i = 0;
    for(let url of urls) {
        imgQeury[`img${i+1}`] = url
        i++
    }
    return imgQeury
}

module.exports= {urls, query}