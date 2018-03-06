//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


//connect to database and run a callback function
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err){
    return console.log('Unable to connect to MondoDb server');
  };
  console.log('connected to MongoDb server');
  const db = client.db('TodoApp'); //updated from V3+

  // deleteMany
  // db.collection('Todos').deleteMany({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  // db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) => {
  //   console.log(result);
  // });

  //findOneAndDelete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
  //   console.log(result);
  // });

  //deleteMany name: Ben
  // db.collection('Users').deleteMany({name: 'Ben'}).then((result) => {
  //     console.log(result);
  // });

  //findOneAndDelete by ID
  db.collection('Users').findOneAndDelete({
    _id: new ObjectID('5a9e50cca466ba32fc749fd7')
  }).then((result) => {
    console.log(result);
  });


  //client.close(); //closes connection/client
  //console.log('mongodb client closed');
});
