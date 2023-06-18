const relatedProductService = require("../services/related-product.services");

exports.create = (req, res, next) => {
  relatedProductService.addRelatedProduct(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};
exports.delete = (req, res, next) => {
  var model = {
    id: req.params.id,
  };
  relatedProductService.removeRelatedProduct(model, (err, result) => {
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
