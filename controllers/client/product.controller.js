const Product = require("../../models/product.model");

// [GET] /products/ (lấy ra danh sách sản phẩm)
module.exports.index = async (req, res) => {
  const products = await Product.find({
    status: "active",
    deleted: false
  })
  .sort({
    position: "desc"
  });

  for (const item of products){
    item.priceNew = (item.price * (1 - item.discountPercentage/100)).toFixed(0);
  }

  res.render("client/pages/products/index", {
    pageTitle: "Danh sách sản phẩm",
    products: products
  });
}

// [GET] /products/:slug
module.exports.detail = async (req, res) => {
  const slug = req.params.slug;

  const product = await Product.findOne({
    slug: slug,
    deleted: false,
    status: "active"
  });

  console.log(product);

  if(product){
    res.render("client/pages/products/detail", {
      pageTitle: "chi tiết sản phẩm",
      product: product
    });
  }
  else{
    res.redirect("/");
  }
  
}