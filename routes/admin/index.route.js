const dashboardRoute = require("./dashboard.route");
const productRoute = require("./product.route");
const systemConfig = require("../../config/system");
const productsCategoryRoute = require("./product-category.route");
const rolesRoute = require("./roles.route");
const accountsRoute = require("./account.route");
const authRoute = require("./auth.route");
const authMiddleware = require("../../middlewares/admin/auth.middleware");
const profileRoute = require("./profile.route");

module.exports.index = (app) => {
  const path = `/${systemConfig.prefixAdmin}`;

  app.use(
    `${path}/dashboard`,
    authMiddleware.requireAuth,
    dashboardRoute);

  app.use(
    `${path}/products`,
    authMiddleware.requireAuth,
    productRoute);
  
  app.use(
    `${path}/products-category`,
    authMiddleware.requireAuth,
    productsCategoryRoute);
  
  app.use(
    `${path}/roles`,
    authMiddleware.requireAuth,
    rolesRoute);

  app.use(
    `${path}/accounts`,
    authMiddleware.requireAuth,
    accountsRoute);
   
    
    app.use(
      `${path}/profile`,
      authMiddleware.requireAuth,
      profileRoute
    );  
  app.use(`${path}/auth`, authRoute);
}

