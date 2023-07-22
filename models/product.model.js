const mongoose = require("mongoose");
const product = mongoose.model(
  "Product",
  mongoose.Schema(
    {
      productName: {
        type: String,
        required: true,
        unquie: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
      productShortDescription: {
        type: String,
        required: false,
      },
      productPrice: {
        type: Number,
        required: true,
      },
      productSalePrice: {
        type: Number,
        required: true,
        default: 0,
      },
      productSKU: {
        type: String,
        required: false,
      },
      productType: {
        type: String,
        required: true,
        default: "simple",
      },
      stackStatus: {
        type: String,
        default: "IN",
      },
      productImage: {
        type: String,
      },
      relatedProducts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "RelatedProduct",
        },
      ],
      isFavorite:{
        type: Boolean,
        default:false
      }
    },
    {
      toJSON: {
        transform: function (doc, ret) {
          ret.productId = ret._id.toString();
          delete ret._id;
          delete ret.__v;
        },
      },
    }
  )
);
module.exports = {
  product,
};
