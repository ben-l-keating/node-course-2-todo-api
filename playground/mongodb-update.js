//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//connect to database and run a callback function
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to MondoDb server');
  };
  console.log('connected to MongoDb server');
  const db = client.db('TodoApp'); //updated from V3+

  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5a9f126673ef89cc357283fa')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // });
  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5a9f91b949fb1428cf808dc8')
  }, {
    $set: {
      name: 'Ben'
    }, $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(result);
  });

  //client.close(); //closes connection/client
  //console.log('mongodb client closed');
});
