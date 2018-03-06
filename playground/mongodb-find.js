//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//connect to database and run a callback function
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to MondoDb server');
  };
  console.log('connected to MongoDb server');
  const db = client.db('TodoApp'); //updated from V3+

  // db.collection('Todos').find({
  //   _id: new ObjectID('5a9f0b9473ef89cc357282a8')
  //   }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fetch todos', err);
  // });

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  //
  // }, (err) => {
  //   console.log('unable to fetch todos', err);
  // });

  db.collection('Users').find({name: 'Ben'}).toArray().then((docs) => {
    //console.log(`Todos count: ${count}`);
    console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
    console.log('unable to fetch todos', err);
  });


  //client.close(); //closes connection/client
  console.log('mongodb client closed');
});
