const Product = require("../../models/product.model");
const systemConfig = require("../../config/system");

const paginationHelper = require("../../helpers/pagination.helper");

const createTreeHelper = require("../../helpers/createTree.helper");
const ProductCategory = require("../../models/product-category.model");

// [GET] /admin/products/ (lấy ra danh sách sản phẩm)
module.exports.index = async (req, res) => {
  const find = {
    deleted: false
  };

  const filterStatus = [
    {
      label: "Tất cả",
      value: ""
    },
    {
      label: "Hoạt động",
      value: "active"
    },
    {
      label: "Dừng hoạt động",
      value: "inactive"
    },
  ];

  if (req.query.status) {
    find.status = req.query.status;
  }

  // Tìm kiếm
  let keyword = "";
  if (req.query.keyword) {
    const regex = new RegExp(req.query.keyword, "i");
    find.title = regex;
    keyword = req.query.keyword;
  }
  // Hết Tìm kiếm

  // Phân trang
  const pagination = await paginationHelper(req, find);
  // Hết Phân trang

  // sắp xếp
  const sort = {};

  if (req.query.sortKey && req.query.sortValue) {
    sort[req.query.sortKey] = req.query.sortValue;
  } else {
    sort.position = "desc";
  }
  // END sắp xếp

  const products = await Product
    .find(find)
    .limit(pagination.limitItem)
    .skip(pagination.skip)
    .sort(sort);

  // console.log(products);

  res.render("admin/pages/products/index", {
    pageTitle: "Quản lý sản phẩm",
    products: products,
    keyword: keyword,
    filterStatus: filterStatus,
    pagination: pagination
  });
}

// [PATCH] /admin/products/change-status/:statusChange/:id (cập nhật trạng thái của 1 sản phẩm)
module.exports.changeStatus = async (req, res) => {
  const { id, statusChange } = req.params;

  await Product.updateOne({
    _id: id
  }, {
    status: statusChange
  });

  req.flash('success', 'Cập nhật trạng thái thành công!');

  res.json({
    code: 200
  });
}

// [PATCH] /admin/products/change-multi (cập nhật trạng thái của nhiều sản phẩm)
module.exports.changeMulti = async (req, res) => {
  const { status, ids } = req.body;

  switch (status) {
    case "active":
    case "inactive":
      await Product.updateMany({
        _id: ids
      }, {
        status: status
      });
      break;
    case "delete":
      await Product.updateMany({
        _id: ids
      }, {
        deleted: true
      });
      break;
    default:
      break;
  }

  res.json({
    code: 200
  });
}

// [PATCH] /admin/products/delete/:id (xoá sản phẩm)
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({
    _id: id
  }, {
    deleted: true
  });

  req.flash('success', 'Xóa sản phẩm thành công!');

  res.json({
    code: 200
  });
}

// [PATCH] /admin/products/change-position/:id (cập nhật vị trí của sản phẩm)
module.exports.changePosition = async (req, res) => {
  const id = req.params.id;
  const position = req.body.position;

  await Product.updateOne({
    _id: id
  }, {
    position: position
  });

  res.json({
    code: 200
  });
}

// [GET] /admin/products/create (di chuyển đến trang thêm sản phẩm)
module.exports.create = async (req, res) => {
  const categories = await ProductCategory.find({
    deleted: false
  });

const newCategories = createTreeHelper(categories);

  res.render("admin/pages/products/create", {
    pageTitle: "Thêm mới sản phẩm",
    categories: newCategories
  });
}

// [POST] /admin/products(thêm sản phẩm)
module.exports.createPost = async (req, res) => {

  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position) {
    req.body.position = parseInt(req.body.position);
  } else {
    const countProducts = await Product.countDocuments({});
    req.body.position = countProducts + 1;
  }

  const newProduct = new Product(req.body);
  await newProduct.save();

  res.redirect(`/${systemConfig.prefixAdmin}/products`);
}

// [GET] /admin/products/edit/:id  (render ra giao diện chỉnh sửa sản phẩm)
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });
    if (product) {
      const categories = await ProductCategory.find({
        deleted: false
    });

    const newCategories = createTreeHelper(categories);


      res.render("admin/pages/products/edit", {
        pageTitle: "Chỉnh sửa sản phẩm",
        product: product,
        categories: newCategories
      });
    }
    else {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}

// [PATCH] /admin/products/edit/:id  (chỉnh sửa sản phẩm sau khi gọi vào link)
module.exports.editPatch = async (req, res) => {
  try {
    const id = req.params.id;

    req.body.price = parseInt(req.body.price);
    req.body.discountPercentage = parseInt(req.body.discountPercentage);
    req.body.stock = parseInt(req.body.stock);
    if (req.body.position) {
      req.body.position = parseInt(req.body.position);
    } else {
      const countProducts = await Product.countDocuments({});
      req.body.position = countProducts + 1;
    }

    await Product.updateOne({
      _id: id
    }, req.body);

    req.flash("success", "Cập nhật sản phẩm thành công");

  } catch (error) {
    req.flash("error", "id sản phẩm không hợp lệ");
  }

  res.redirect("back");

}

// [GET] /admin/products/detail/:id  (render ra giao diện trang chi tiết sản phẩm
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await Product.findOne({
      _id: id,
      deleted: false
    });
    if (product) {
      res.render("admin/pages/products/detail", {
        pageTitle: "chi tiết sản phẩm",
        product: product
      });
    }
    else {
      res.redirect(`/${systemConfig.prefixAdmin}/products`);
    }
  } catch (error) {
    res.redirect(`/${systemConfig.prefixAdmin}/products`);
  }
}