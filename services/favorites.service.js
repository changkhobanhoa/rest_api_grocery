const { favorite } = require("../models/favorite.model");
const { user } = require("../models/user.model");
const { product } = require("../models/product.model");

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
      const index = response.favorites.findIndex(
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
async function getFavorite(params, callback) {
  // Tìm kiếm user theo token
  try {
    const usermodel = await user.findOne({ _id: params.userId }).populate({
      path: "favorites",
      populate: {
        path: "product",
        model: "Product",
        select: "productName productPrice productSalePrice productImage",
       
      },
    });

    if (!usermodel) {
      return callback({ message: "Not found user" });
    }
    const favorites = usermodel.favorites;
    const productIds = favorites.map((favorite) => favorite.product);
    const products = await product
      .find({ _id: { $in: productIds } })
      .populate("category", "categoryName categoryImage");
    const res = { userId: params.userId, "products ": products };
    return callback(null, usermodel);
  } catch (err) {
    return callback(err);
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
