
//local modules
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {Users} = require('./models/user.js');

//3rd party modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var app = express();

//middleware
app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (e) => {
    res.status(400).send(e);
  });
});

//GET /todos/12241453
app.get('/todos/:id', (req, res) => {
  var id = req.params.id
  //validate ID using isvalid
  if (!ObjectID.isValid(id)){
    return res.status(404).send('invalid ID input');  //respond with 404
  } else {
    //findById
    Todo.findById(id).then((todo) => {
      if(!todo){
        //send back 404 if null
        res.status(404).send('Todo not found')
      }else {
        //success case - send back
        res.status(200).send({todo});
      }
    }).catch((e) => res.status(400).send()); //catch error case - 400
  };
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = {
  app
};
