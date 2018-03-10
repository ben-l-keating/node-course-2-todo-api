//3rd party modules
const mongoose = require('mongoose');

//use global promises
mongoose.Promise = global.Promise;

//connect to database
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
  mongoose
}
