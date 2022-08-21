const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

module.exports = async function (file) {
    return await cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
        if (err) return err
        if (result) return result
    })
}