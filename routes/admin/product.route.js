const express = require("express");
const multer  = require('multer') // dùng để cho ông BE hứng đc file ảnh khi ng dùng upload
const router = express.Router();


// ----------------[dùng để hứng ảnh của ngưởi dùng và đổi tên file theo tên mong muốn]----------------
const storageMulterHelper = require("../../helpers/storageMulter.helper");

const upload = multer({ storage: storageMulterHelper.stograge })
//-------------------------------------------------------------------------------------------------------  

const controller = require("../../controllers/admin/product.controller");

const validate = require("../../validates/admin/product.validate");

router.get("/", controller.index);

router.patch("/change-status/:statusChange/:id", controller.changeStatus);

router.patch("/change-multi", controller.changeMulti);

router.patch("/delete/:id", controller.deleteItem);

router.patch("/change-position/:id", controller.changePosition);

router.get("/create", controller.create); //render ra giao diện thêm mới sản phẩm



router.post(
    "/create",
    upload.single('thumbnail'),
    validate.createPost,
    controller.createPost
);

router.get("/edit/:id", controller.edit); //render ra giao diện trang chỉnh sửa sản phẩm

router.patch(
    "/edit/:id",
    upload.single('thumbnail'),
    validate.createPost,
    controller.editPatch
);

router.get("/detail/:id", controller.detail); //render ra giao diện trang chi tiết sản phẩm
module.exports = router;