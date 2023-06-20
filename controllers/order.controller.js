const orderService = require("../services/order.service");

exports.create = (req, res, next) => {
  var model = {
    userId: req.user.userId,
    card_Name: req.body.card_Name,
    card_Number: req.body.card_Number,
    card_ExpMonth: req.body.card_ExpMonth,
    card_ExpYear: req.body.card_ExpYear,
    card_CVC: req.body.card_CVC,
    amount: req.body.amount,
  };
  orderService.createOrder(model, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.update = (req, res, next) => {
  orderService.updateOrder(req.body, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.findAll = (req, res, next) => {
    orderService.getOrders(req.body, (err, result) => {
      if (err) {
        return next(err);
      }
      return res.status(200).send({
        message: "Success",
        data: result,
      });
    });
  };
  