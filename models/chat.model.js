const mongoose = require("mongoose");

const chat = mongoose.model(
  "Chat",
  mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
       
      },
      sessionId: { type: Number, required: true },
      timestamp: { type: Date, required: true },
      message: { type: String, required: true },
      botResponse: { type: String },
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

module.exports = { chat };
