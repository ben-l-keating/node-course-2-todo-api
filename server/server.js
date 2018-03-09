
//local modules
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {Users} = require('./models/user.js');

//3rd party modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

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

app.delete('/todos/:id', (req, res) => {
  var id = req.params.id

  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID input');
  }

  Todo.findByIdAndRemove(id).then((doc) => {
    if(!doc){
      return res.status(404).send('Todo not found');
    }else {
      return res.status(200).send({
        msg: 'Todo deleted!',
        doc
      });
    }
  }).catch((e) => res.status(404).send());
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});


module.exports = {
  app
};
