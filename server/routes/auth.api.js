var express = require("express");
var router = express.Router();

const passport = require("passport");

const authController = require("../controllers/auth.controller");

router.post(
  "/facebook-login",
  passport.authenticate("facebook-token", { session: false }),
  authController.login,
);

router.post(
  "/google-login",
  passport.authenticate("google-token", { session: false }),
  authController.login,
);

module.exports = router;
