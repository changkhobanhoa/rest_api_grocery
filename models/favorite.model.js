const mongoose = require("mongoose");

const favorite = mongoose.model(
  "Favorite",
  mongoose.Schema(
    {
      user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
      },
      product: {
        type: mongoose.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
    {
      toJson: {
        transform: function (doc, ret) {
          delete ret._id;
          delete ret.__v;
        },
      },
    }
  )
);

module.exports = { favorite };
