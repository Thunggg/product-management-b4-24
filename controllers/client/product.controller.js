module.exports.index = (req, res) => {
    res.render("client/pages/products/index.pug", {
        pageTitle: "Trang danh sách sản phẩm"
    });
}