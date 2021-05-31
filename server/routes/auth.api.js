var express = require("express");
var router = express.Router();

const passport = require("passport");

const authController = require("../controllers/auth.controller");

router.post(
  "/login/facebook",
  passport.authenticate("facebook-token", { session: false }),
  authController.login,
);

module.exports = router;
