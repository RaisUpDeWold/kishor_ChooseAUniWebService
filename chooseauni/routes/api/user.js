var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var UserController = require('../../controllers/UserController');

/* Login Action */
router.post('/login', urlencodedParser, [UserController.login]);

module.exports = router;