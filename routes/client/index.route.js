const homeRoute = require("./home.route.js");
const productRoute = require("./product.route.js");
module.exports.index = (app) => { //.index la ten ham`
  app.use("/", homeRoute);
    
  app.use("/products", productRoute);
}