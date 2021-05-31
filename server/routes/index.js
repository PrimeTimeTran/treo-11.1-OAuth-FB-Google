var express = require('express');
var router = express.Router();

const authApi = require("./auth.api");

router.use("/auth", authApi);

module.exports = router;
