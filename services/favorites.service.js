const { favorite } = require("../models/favorite.model");
const { user } = require("../models/user.model");
const { product } = require("../models/product.model");
const { response } = require("express");
const productService = require("./products.service");

async function createFavorite(params, callback) {
  if (!params.userId) {
    return callback({ message: "UserId Required" });
  }
  if (!params.productId) {
    return callback({ message: "ProductId Required" });
  }

  user
    .findOne({ _id: params.userId })
    .then((response) => {
      if (response.favorites == null) {
        callback(response);
      }
      const index = response.favorites.indexOf(
        (p) => p.product == params.productId
      );
      if (index === -1) {
        response.favorites.push({
          product: params.productId,
        });
      } else {
        return callback({ message: "Product already in favorites" });
      }

      response.save();
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}
async function getFavorite(userId, callback) {
  try{

    const users = await user.find({});
    return callback(user)
  }catch (err){
    return callback(err)
  }
  
}

function removeFavorite(params, callback) {
  if (!params.userId) {
    return callback({ message: "UserId Required" });
  }
  if (!params.productId) {
    return callback({ message: "ProductId Required" });
  }

  user
    .findOne({ _id: params.userId })
    .then((response) => {
      if (response.favorites == null) {
        callback(response);
      }
      const index = response.favorites.indexOf(
        (p) => p.product == params.productId
      );
      if (index === -1) {
         
        response.favorites.splice(index, 1);
       
      
      } else {
        return callback({ message: "Product already in favorites" });
      }

      response.save();
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}
module.exports = {
  createFavorite,
  getFavorite,
  removeFavorite,
};
