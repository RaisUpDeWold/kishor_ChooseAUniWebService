var express = require('express');
var router = express.Router();

/* Main HomePage */
router.get('/', function(req, res, next) {
    res.render('index', {});
});

/* Search Page */
router.get('/search', function(req, res, next) {
    res.render('search', {});
});

module.exports = router;