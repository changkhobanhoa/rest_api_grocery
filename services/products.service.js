const { product } = require("../models/product.model");
const { category } = require("../models/category.model");
const { MONGO_DB_CONFIG } = require("../config/app.config");

async function createProduct(params, calback) {
  if (!params.productName) {
    return calback(
      {
        message: "Product name required",
      },
      ""
    );
  }
  if (!params.category) {
    return calback(
      {
        message: "Category required",
      },
      ""
    );
  }
  const productModel = new product(params);
  productModel
    .save()
    .then((response) => {
      return calback(null, response);
    })
    .catch((error) => {
      return calback(error);
    });
}

async function getProducts(params, calback) {
  const productName = params.productName;
  const categoryId = params.categoryId;
  var condition = {};
  if (productName) {
    condition["productName"] = {
      $regex: new RegExp(productName),
      $options: "i",
    };
  }
  if (categoryId) {
    condition["category"] = categoryId;
  }
  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  product
    .find(
      condition,
      "productId productName productName productShortDescription productPrice productSalePrice productImage productSKU productType stockStatus"
    )
    .populate("category", "categoryName categoryImage")
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      return calback(null, response);
    })
    .catch((error) => {
      return calback(error);
    });
}

async function getProductById(params, calback) {
  const productId = params.productId;
  product
    .find(productId)
    .populate("category", "categoryName categoryImage")
    .then((response) => {
      return calback(null, response);
    })
    .catch((error) => {
      return calback(error);
    });
}

async function updateProduct(params, calback) {
  const productId = params.productId;
  product
    .findByIdAndUpdate(productId, params, { useFindAndModify: false })

    .then((response) => {
      if (!response) {
        calback(`Cannot update Product with id ${productId}`, response);
      } else calback(null, response);
    })
    .catch((error) => {
      return calback(error);
    });
}

async function deleteProduct(params, calback) {
  const productId = params.productId;
  product
    .findByIdAndRemove(productId, params, { useFindAndModify: false })
    .then((response) => {
      if (!response) {
        calback(`Cannot update Product with id ${productId}`);
      } else calback(null, response);
    })
    .catch((error) => {
      return calback(error);
    });
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
