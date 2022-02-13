//jshint esversion:6

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

//conection URL
const url = 'mongodb://localhost:27017';

//database Name
const dbName = 'fruitsDB'; //name our DB

//create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

//use connect method to connect to the Server
client.connect(function(err){
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

findDocuments(db, function(){
  client.close();
});
});

const insertDocuments = function(db, callback) {
//get the documents collection
const collection = db.collection('fruits');
//insert some documents
collection.insertMany(
  [
  {
    name: "Apple",
    score: 8,
    review: "Great fruit"
  },
  {
    name: "Orange",
    score: 6,
    review: "Kinda sourt"
  },
  {  name: "Apple",
    score: 9,
    review: "Great stuff"
  }
], function(err, result) {
  assert.equal(err, null);
  assert.equal(3, result.result.n); //'n' error
  assert.equal(3, result.ops.length);
  console.log("Insert 3 documents into the collection");
  callback(result);
});
};

const findDocuments = function(db, callback) {
  //get the documents collection
  const collection = db.collection('fruits');
  //find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  });
}
