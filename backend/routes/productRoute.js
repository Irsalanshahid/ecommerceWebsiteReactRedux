const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  productDelete,
  getProductDetails,
} = require("../controllers/productController");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(isAuthenticated, getAllProducts);
router.route("/product/new").post(createProduct);
router.route("/product/:id").put(updateProduct).delete(productDelete).get(getProductDetails);

module.exports = router;
