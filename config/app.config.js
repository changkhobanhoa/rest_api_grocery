const MONGO_DB_CONFIG = {
  DB: "mongodb://0.0.0.0:27017/grocery",
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
