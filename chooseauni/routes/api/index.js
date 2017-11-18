var express = require('express');
var router = express.Router();

/* Main Page */
router.get('/', function(req, res, next) {
    res.render('index', {title: 'ChooseAuni'});
});

module.exports = router;