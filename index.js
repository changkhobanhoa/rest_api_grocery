const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const { MONGO_DB_CONFIG } = require("./config/app.config");
const errors = require("./middleware/error.js");
const swaggerUi = require("swagger-ui-express"),
  swaggerDocument = require("./swagger.json");

const app = express();
mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_DB_CONFIG.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: ", error);
    }
  );

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/api", require("./routes/app.routes"));

app.use(errors.errorHandler);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.static(path.join(__dirname, "public")));

app.use(expressLayouts);
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  res.render("pages/login");
});

app.get("/users/login", function (req, res) {
  res.render("pages/dashboard");
});
app.listen(process.env.port || 4000, () => {
  console.log("Ready to GO! http://localhost:4000");
});