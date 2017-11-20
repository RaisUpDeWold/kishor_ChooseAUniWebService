var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({extended: false});

/* Main HomePage */
router.get("/", urlencodedParser, function(req, res, next) {
    res.render("index", {login_failed: "Invalidasdfasdf User Credential"});
});

/* Search Page */
router.get("/search", function(req, res, next) {
    res.render("search", {});
});

module.exports = router;