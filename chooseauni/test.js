var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://ec2-54-171-242-116.eu-west-1.compute.amazonaws.com:27017/chooseauni";

console.log("hello");

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.collection("kiscourse").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result.uniName);
    db.close();
  });
});