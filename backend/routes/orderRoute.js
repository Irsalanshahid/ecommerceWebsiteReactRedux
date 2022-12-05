const express = require("express");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");

router.route("/orders/new").post(isAuthenticated, newOrder);

module.exports = router;
