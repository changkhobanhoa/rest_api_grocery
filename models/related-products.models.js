const mongoose = require("mongoose");

const relatedProduct = mongoose.model(
  "RelatedProduct",
  mongoose.Schema(
    {
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
      relatedProduct: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    },
    {
      toJson: {
        transform: function (doc, ret) {
          delete ret._id;
          delete ret.__v;
        },
      },
      timestamps: true,
    }
  )
);

module.exports={
    relatedProduct
}