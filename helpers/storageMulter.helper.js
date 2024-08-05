const multer = require('multer');
// ----------------[dùng để hứng ảnh của ngưởi dùng và đổi tên file theo tên mong muốn]----------------
module.exports.stograge = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix =  + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
//-------------------------------------------------------------------------------------------------------  
