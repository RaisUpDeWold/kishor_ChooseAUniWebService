var express = require("express");
var router = express.Router();

var SearchController = require("../../controllers/SearchController");

/* Get All Information from KisCourse By Page */
router.get("/", [SearchController.getSearchResultWithParams]);
router.get("/count", [SearchController.getSearchResultCounts]);

module.exports = router;