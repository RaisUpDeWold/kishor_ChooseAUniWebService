var express = require('express');
var router = express.Router();

var SearchController = require('../../controllers/SearchController');

/* GET users listing. */
router.get('/', [SearchController.getAllByPage]);
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

module.exports = router;