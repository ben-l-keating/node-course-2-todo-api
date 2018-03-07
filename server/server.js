
//local modules
const {mongoose} = require('./db/mongoose.js');
const {Todo} = require('./models/todo.js');
const {Users} = require('./models/user.js');

//3rd party modules
const express = require('express');
const bodyParser = require('body-parser');

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



app.listen(3000, () => {
  console.log('Started on port 3000');
});


module.exports = {
  app
};
