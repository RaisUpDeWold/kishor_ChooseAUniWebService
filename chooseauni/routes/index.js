var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ec2-54-171-242-116.eu-west-1.compute.amazonaws.com:27017/chooseauni";

/* GET home page. */
router.get('/', function(req, res, next) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    db.collection("kiscourse").findOne({}, function(err, result) {
      if (err) throw err;
      console.log(result.uniName);
      res.render('index', { title: result.uniName });
      db.close();
    });
  });
});

module.exports = router;
