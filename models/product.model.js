const mongoose = require("mongoose");
slug = require('mongoose-slug-updater'); //để lấy tên sản phẩm ghi lên url
mongoose.plugin(slug);

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  deleted: {
    type: Boolean,
    default: false // nếu khi thêm mới không thêm deleted thì tự đông chuyển về false
  },
  slug: {
    type: String,
    slug: "title",
    unique: true //đề thêm chuỗi slug khác nhau nếu có nhiều sản phẩm trùng tên
  }
}, { timestamps: true }); // khi thêm timestamps thì mongoose sẽ tự động thêm các trường createdAt và updatedAt cho database

const Product = mongoose.model("Product", productSchema, "products");

module.exports = Product;