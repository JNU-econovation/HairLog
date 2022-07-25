import cloudinary from './cloudinary/upload.js'

// get urls and public_id from result of uploading Cloudinary result 
const urls = async function (files) {
    let temp = {}
    let i = 0
    for(let file of files) {
        temp[`img${i+1}`] = file.path
        i++
    }
    let images = Object.entries(temp)
    let img = await Promise.all(images.map(result => cloudinary.upload(result[1])))
    let urls = await Promise.all(img.map(res => res.secure_url))
    let public_id = await Promise.all(img.map(res => res.public_id))
    let imgInformation = {urls, public_id}
    return imgInformation
}

// make query to use insert url into DB
const query = async function(urls) {
    let imgQeury = {}
    let i = 0;
    for(let url of urls) {
        imgQeury[`img${i+1}`] = url
        i++
    }
    return imgQeury
}

export default {urls, query}