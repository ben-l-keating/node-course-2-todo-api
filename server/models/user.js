const mongoose = require('mongoose');

//create user model
//store email - require and trim, set string and min length 1
var Users = mongoose.model('Users', {
  email: {
    type: String,
    required: true,
    minLength: 1,
    trim: true
  }
});

module.exports = {
  Users
};
