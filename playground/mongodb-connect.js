//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//connect to database and run a callback function
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to MondoDb server');
  };
  console.log('connected to MongoDb server');
  const db = client.db('TodoApp'); //updated from V3+



  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err){
  //     return console.log('Unable to insert Todo', err);
  //   };
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  //insert new doc into Users collection (name, age, location)
  // db.collection('Users').insertOne({
  //   name: 'bob',
  //   age: 30,
  //   location: 'Northampton'
  // }, (err, result) => {
  //   if (err){
  //     return console.log('Unable to insert User', err);
  //   };
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  client.close(); //closes connection/client
  console.log('mongodb client closed');
});
