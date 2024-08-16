const express = require("express");
const router = express.Router();

const controller = require("../../controllers/client/product.controller");

router.get("/", controller.index);

// router.post('/create', (req, res) => {
//     res.render("client/pages/products/index.pug");
// });


router.get("/:slugCategory", controller.category);

router.get("/detail/:slug", controller.detail);


module.exports = router;