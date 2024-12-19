const express = require("express");
const router = express.Router();
const {
  verifyToken,
  authorizeRoles,
} = require("../middlewares/authMiddleware");

const userController = require("../Controllers/user-controller");

router
  .route("/profile")
  .get(verifyToken, userController.getUserProfile)
  .put(verifyToken, userController.updateUserProfile);

router
  .route("/deleteAccount")
  .delete(
    verifyToken,
    authorizeRoles("admin"),
    userController.deleteUserAccount
  );
module.exports = router;
