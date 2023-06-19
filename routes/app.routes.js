const categoryController = require("../controllers/categories.controller");
const productController = require("../controllers/products.controller");
const userController = require("../controllers/users.controller");
const sliderController = require("../controllers/slider.controller");
const relatedProductController = require("../controllers/related-product.controller");
const cartController = require("../controllers/cart.controller");
const { authenticationToken } = require("../middleware/auth");
const express = require("express");
const router = express.Router();
router.post("/category", categoryController.create);
router.get("/category", categoryController.findAll);
router.get("/category/:id", categoryController.findOne);
router.put("/category/:id", categoryController.update);
router.delete("/category/:id", categoryController.delete);

router.post("/product", productController.create);
router.get("/product", productController.findALL);
router.get("/product/:id", productController.findOne);
router.put("/product/:id", productController.update);
router.delete("/product/:id", productController.delete);

router.post("/slider", sliderController.create);
router.get("/slider", sliderController.findAll);
router.get("/slider/:id", sliderController.findOne);
router.put("/slider/:id", sliderController.update);
router.delete("/slider/:id", sliderController.delete);

router.post("/register", userController.register);
router.post("/login", userController.login);

router.post("/relatedProduct", relatedProductController.create);
router.delete("/relatedProduct/:id", relatedProductController.delete);

router.post("/cart", [authenticationToken], cartController.create);
router.get("/cart", [authenticationToken], cartController.findAll);
router.delete("/cart", [authenticationToken], cartController.delete);

module.exports = router;
