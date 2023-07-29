const MONGO_DB_CONFIG = {
  DB: "mongodb+srv://tien:toilaso1@cluster0.inww0ej.mongodb.net/?retryWrites=true&w=majority",
  PAGE_SIZE: 10,
};
const STRIPE_CONFIG = {
  STRIPE_KEY:
    "sk_test_51MfrXREloCBQ1gam70iIgVmGO2I0MKcCo0isQ9fOVleImORN9tbtGxiN6TAuTJzdkCl9IPzmWZc6GtJHUQBFb1YK002WRwlces",
  CURRENCY: "inr",
};

module.exports = {
  MONGO_DB_CONFIG,
  STRIPE_CONFIG,
};
