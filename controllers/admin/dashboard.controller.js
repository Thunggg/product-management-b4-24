module.exports.index = (req, res) => {
    res.render("admin/pages/dashboard/index", {
      pageTitle: "Trang chủ"
    });
}