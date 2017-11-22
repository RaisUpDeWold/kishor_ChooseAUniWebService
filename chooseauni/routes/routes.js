var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});
const logger = require('../modules/logger.js');

/* Main HomePage */
router.get("/", urlencodedParser, function(req, res, next) {
    var login_failed = "";
    if (req.query.login_failed) login_failed = req.query.login_failed;
    res.render("index", {login_failed: login_failed});
});

/* Search Page */
router.get("/search", function(req, res, next) {
    res.render("search", {});
});

module.exports = router;