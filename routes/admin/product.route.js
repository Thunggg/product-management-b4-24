const express = require("express");
const multer  = require('multer') // dùng để cho ông BE hứng đc file ảnh khi ng dùng upload
const router = express.Router();


// ----------------[dùng để hứng ảnh của ngưởi dùng và đổi tên file theo tên mong muốn]----------------
const storageMulterHelper = require("../../helpers/storageMulter.helper");

const upload = multer({ storage: storageMulterHelper.stograge })
//-------------------------------------------------------------------------------------------------------  

const controller = require("../../controllers/admin/product.controller");

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

router.patch("/change-position/:id", controller.changePosition);

router.get("/create", controller.create); //render ra giao diện thêm mới sản phẩm

router.post("/create", upload.single('thumbnail'), controller.createPost);
module.exports = router;