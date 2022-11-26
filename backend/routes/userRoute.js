const express = require("express")
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword,getUserDetails } = require("../controllers/userController");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router()


router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated,getUserDetails)

module.exports = router;