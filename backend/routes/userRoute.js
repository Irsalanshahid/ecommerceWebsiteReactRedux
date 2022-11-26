const express = require("express")
const { createUser, loginUser, logoutUser, forgotPassword, resetPassword,getUserDetails, updateUserPassword, updateUserProfile, getAllUsers, getSingleUser, updateUser, deleteUser } = require("../controllers/userController");
const { isAuthenticated, authorizeRoles } = require("../middleware/auth");
const router = express.Router()


router.route("/register").post(createUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenticated,getUserDetails);
router.route("/password/update").put(isAuthenticated,updateUserPassword);
router.route("/me/update").put(isAuthenticated,updateUserProfile);

router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers);
router.route("/admin/user/:id").get(isAuthenticated,authorizeRoles("admin"), getSingleUser).put(isAuthenticated,authorizeRoles("admin"), updateUser).delete(isAuthenticated,authorizeRoles("admin"), deleteUser);

module.exports = router;