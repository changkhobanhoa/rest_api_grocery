const productServices = require("../services/products.service");
const upload = require("../middleware/product.upload");

exports.create = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      var model = {
        productName: req.body.productName,
        category: req.body.category,
        productShortDescription: req.body.productShortDescription,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productSalePrice: req.body.productSalePrice,
        productSKU: req.body.productSKU,
        productType: req.body.productType,
        stockStatus: req.body.stockStatus,
        productImage: path != "" ? "/" + path : "",
      };
      productServices.createProduct(model, (err, result) => {
        if (err) {
          return next(err);
        } else {
          return res.status(200).send({
            message: "Success",
            data: result,
          });
        }
      });
    }
  });
};

exports.findALL = (req, res, next) => {
  var model = {
    productIds:req.query.productIds,
    productName: req.query.productName,
    category: req.query.categoryId,
    pageSize: req.query.pageSize,
    page: req.query.page,
    sort: req.query.sort,
  };
  productServices.getProducts(model, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).send({
        message: "Success",
        data: result,
      });
    }
  });
};

exports.findOne = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };
  productServices.getProductById(model, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).send({
        message: "Success",
        data: result,
      });
    }
  });
};

exports.update = (req, res, next) => {
  upload(req, res, function (err) {
    if (err) {
      next(err);
    } else {
      const path =
        req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";
      var model = {
        productId: req.param.id,
        productName: req.body.productName,
        category: req.body.category,
        productShortDescription: req.body.productShortDescription,
        productDescription: req.body.productDescription,
        productPrice: req.body.productPrice,
        productSalsePrice: req.body.productSalsePrice,
        productSKU: req.body.productSKU,
        productType: req.body.productType,
        stockStatus: req.body.stockStatus,
        productImage: path != "" ? "/" + path : "",
      };
      productServices.updateProduct(model, (err, result) => {
        if (err) {
          return next(err);
        } else {
          return res.status(200).send({
            message: "Success",
            data: result,
          });
        }
      });
    }
  });
};

exports.delete = (req, res, next) => {
  var model = {
    productId: req.params.id,
  };
  productServices.deleteProduct(model, (err, result) => {
    if (err) {
      return next(err);
    } else {
      return res.status(200).send({
        message: "Success",
        data: result,
      });
    }
  });
};
