const cartService = require("../services/cart.service");

exports.create = (req, res, next) => {
  var model = {
    userId: req.user.userId,
    products: req.body.products,
  };

  cartService.addCart(model, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({ message: "Success", data: result });
  });
};

exports.findAll = (req, res, next) => {
  cartService.getCart({ userId: req.user.userId }, (error, result) => {
    if (error) {
      return next(error);
    }
    if (result == null) {
      return res.status(500).send({ message: "Null ", data: result });
    }
    return res.status(200).send({ message: "Success", data: result });
  });
};

exports.delete = (req, res, next) => {
  var model = {
    userId: req.user.userId,
    productId: req.body.productId,
    qty: req.body.qty,
  };

  cartService.removeCartItem(model, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({ message: "Success", data: result });
  });
};
