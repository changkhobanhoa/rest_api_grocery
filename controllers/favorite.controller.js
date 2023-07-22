const { user } = require("../models/user.model");
 

const favoriteService = require("../services/favorites.service");

exports.create = (req, res, next) => {
  var params = {
    userId: req.user.userId,
    productId: req.body.productId,
  };
  favoriteService.createFavorite(params, (err, result) => {
    if (err) {
      return next(err);
    }
    return res.status(200).send({ message: "Success", data: result });
  });
};
exports.deleteFavorite = (req, res, next) => {
  const params = {
    userId: req.user.userId,
    productId: req.body.productId,
  };
  favoriteService.removeFavorite(params, (err, result) => {
    if (err) {
      return next(err);
    }
    if (!result) {
      return res
        .status(404)
        .send({ message: "Product not found in favorites" });
    }
    return res.status(200).send({ message: "Success", data: result });
  });
};

exports.findAll = (req, res, next) => {
  const params = {
    userId: req.user.userId,
    productId: req.body.productId,
  };
  favoriteService.getFavorite(params,(err,result)=>{
    if (err) {
      return next(err);
    }
    if (!result) {
      return res
        .status(404)
        .send({ message: "Product not found in favorites" });
    }
    return res.status(200).send({ message: "Success", data: result });
  });
  
   
};
