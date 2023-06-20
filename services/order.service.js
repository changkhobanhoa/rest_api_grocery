const { user } = require("../models/user.model");
const { cards } = require("../models/cards.model");
const { order } = require("../models/order.model");

const stripeService = require("../services/stripe.service");
const cartService = require("../services/cart.service");

async function createOrder(params, callback) {
  user
    .findOne({ _id: params.userId })
    .then(async (userDB) => {
      var model = {};
      if (!userDB.stripeCustomerID) {
        await stripeService.createCustomer(
          {
            name: userDB.fullName,
            email: userDB.email,
          },
          (error, results) => {
            if (error) {
              return callback(error);
            }
            if (results) {
              userDB.stripeCustomerID = results.id;
              userDB.save();
              model.stripeCustomerID = results.id;
            }
          }
        );
      } else {
        model.stripeCustomerID = userDB.stripeCustomerID;
      }
      cards
        .findOne({
          customerId: model.stripeCustomerID,
          cardNumber: params.card_Number,
          cardExpMonth: params.card_ExpMonth,
          cardExpYear: params.card_ExpYear,
        })
        .then(async (response) => {
          if (!response) {
            await stripeService.addCard(
              {
                card_Name: params.card_Name,
                card_Number: params.card_Number,
                card_ExpMonth: params.card_ExpMonth,
                card_ExpYear: params.card_ExpYear,
                card_CVC: params.card_CVC,
                customer_Id: model.stripeCustomerID,
              },
              (err, results) => {
                if (err) {
                  return callback(err);
                }
                if (results) {
                  const cardModel = new cards({
                    cardId: results.card,
                    cardName: params.card_Name,
                    cardNumber: params.card_Number,
                    cardExpMonth: params.card_ExpMonth,
                    cardExpYear: params.card_ExpYear,
                    cardCVC: params.card_CVC,
                    customerId: model.stripeCustomerID,
                  });
                  cardModel.save();
                  model.cardId = results.card;
                }
              }
            );
          } else {
            model.cardId = response.cardId;
          }
          await stripeService.generatePaymentIntent(
            {
              receipt_email: userDB.email,
              amount: params.amount,
              card_id: model.cardId,
              customer_id: model.stripeCustomerID,
            },
            (err, results) => {
              if (err) {
                return callback(err);
              }
              if (results) {
                model.paymentIntentId = results.id;
                model.client_secret = results.client_secret;
              }
            }
          );
          cartService.getCart({ userId: userDB.id }, (err, response) => {
            if (err) {
              return callback(err);
            } else {
              if (response) {
                var products = [];
                var grandTotal = 0;
                response.products.forEach((product) => {
                  products.push({
                    product: product.product._id,
                    qty: product.qty,
                    amount: product.product.productSalePrice,
                  });
                  grandTotal += product.product.productSalePrice;
                });
                const orderModel = new order({
                  userId: response.userId,
                  products: products,
                  orderStatus: "pending",
                  grandTotal: grandTotal,
                });
                orderModel
                  .save()
                  .then((response) => {
                    model.orderId = response._id;
                    return callback(null, model);
                  })
                  .catch((err) => {
                    return callback(err);
                  });
              }
            }
          });
        })
        .catch((error) => {
          return callback(error);
        });
    })
    .catch((error) => {
      return callback(error);
    });
}
async function updateOrder(params, callback) {
  var model = {
    orderStatus: params.status,
    transactionId: params.transaction_id,
  };
  order
    .findByIdAndUpdate(params.orderId, model, { useFindAndModify: false })
    .then((response) => {
      if (!response) {
        callback("Order Update Failed");
      } else {
        if (params.status == "success") {
        }
        return callback(null, response);
      }
    })
    .catch((err) => {
      return callback(err);
    });
}
async function getOrders(params, callback) {
  order
    .findOne({ userId: params.userId })
    .populate({
      path: "product",
      populate: {
        path: "product",
        model: "Product",
        populate: {
          path: "category",
          model: "Category",
          select: "CategoryName",
        },
      },
    })
    .then((response) => {
      return callback(null, response);
    })
    .catch((err) => {
      return callback(err);
    });
}

module.exports = {
  createOrder,
  updateOrder,
  getOrders,
};
