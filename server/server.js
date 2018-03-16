require('./config/config.js');

//local modules
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {Users} = require('./models/user.js');
const {authenticate} = require('./middleware/authenticate.js');

//3rd party modules
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var app = express();
const port = process.env.PORT;

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
  var id = req.params.id;

  if(!ObjectID.isValid(id)){
    return res.status(404).send('Invalid ID input');
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if(!todo){
      return res.status(404).send('Todo not found');
    }else {
      return res.status(200).send({
        msg: 'Todo deleted!',
        todo
      });
    }
  }).catch((e) => res.status(404).send());
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectID.isValid(id)){
    return res.status(404).send('invalid ID input');  //respond with 404
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  };

  Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
    if(!todo) {
      return res.status(404).send('Todo not found');
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});

// POST /users
app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new Users(body);

  user.save().then(() => {
    return user.generateAuthToken();
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send('User already exists');
  });
});



app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);

  Users.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch((e) => {
    res.status(400).send();
  })
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }, () => {
    res.status(400).send();
  });
});

app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};
