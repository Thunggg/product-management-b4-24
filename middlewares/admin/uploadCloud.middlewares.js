// ------------------------------------[đẩy ảnh lên trên cloudiary]--------------------------------------
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
//-------------------------------------------------------------------------------------------------------  

// ------------------------------------[cấu hình cho cloudiary]--------------------------------------
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SERC 
});
//-------------------------------------------------------------------------------------------------------  


module.exports.uploadSingle = (req, res, next) => {
    if (req.file) {
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream(
                    (error, result) => {
                        if (result) {
                            resolve(result);
                        } else {
                            reject(error);
                        }
                    }
                );
                streamifier.createReadStream(req.file.buffer).pipe(stream);
            });
        }

        const uploadToCloundinary = async (buffer) => {
            const result = await streamUpload(buffer);
            req.body[req.file.fieldname] = result.url;
            next();
        }
        uploadToCloundinary(req.file.buffer);
    }
    else {
        next();
    }
}