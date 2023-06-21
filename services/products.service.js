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
  const categoryId = params.category;
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

  if (params.productIds) {
    condition["_id"] = {
      $in: params.productIds.split(","),
    };
  }

  let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
  let page = (Math.abs(params.page) || 1) - 1;

  product
    .find(
      condition,
      "productId productName productShortDescription productPrice productSalePrice productImage productSKU productType stackStatus  createAt updateAt"
    )
    .sort(params.sort)
    .populate("category", "categoryName categoryImage")
    .populate("relatedProducts", "relatedProduct")
    .limit(perPage)
    .skip(perPage * page)
    .then((response) => {
      var res = response.map((r) => {
        if (r.relatedProducts.length > 0) {
          r.relatedProducts = r.relatedProducts.map((x) => x.relatedProduct);
        }
        return r;
      });
      return calback(null, res);
    })
    .catch((error) => {
      return calback(error);
    });
}

async function getProductById(params, calback) {
  const productId = params.productId;
  product
    .findById(productId)
    .populate("category", "categoryName categoryImage")
    .populate("relatedProducts", "relatedProduct")
    .then((response) => {
      response.relatedProducts = response.relatedProducts.map((x) => {
        return x.relatedProduct;
      });
      return calback(null, response);
    })
    .catch((error) => {
      return calback(error);
    });
}

async function updateProduct(params, calback) {
  const productId = params.id;
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
  const productId = params.id;
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
