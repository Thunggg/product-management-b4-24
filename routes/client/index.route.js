const homeRoute = require("./home.route");
const productRoute = require("./product.route");
const searchRoute = require("./search.route");
const cartRoute = require("./cart.route");

const categoryMiddleware = require("../../middlewares/client/category.middleware");
const cartMiddleware = require("../../middlewares/client/cart.middleware");

module.exports.index = (app) => {
  app.use(categoryMiddleware.category) // menu dùng chung cho tất cả các trang
  app.use(cartMiddleware.cartId) //lưu lại giỏ hàng cho từng người dùng

  app.use("/",categoryMiddleware.category,homeRoute);
  
  app.use("/products",productRoute);

  app.use("/search", searchRoute);

  app.use("/cart", cartRoute);
}