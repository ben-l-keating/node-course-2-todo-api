//3rd party modules
const mongoose = require('mongoose');

//use global promises
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect('mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
