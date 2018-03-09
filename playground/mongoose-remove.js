const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {Users} = require('./../server/models/user.js');

// //Todo.remove({criteria: criteria}) remove({}) - removes all
// Todo.remove({}).then((result) => {
//   console.log(result);
// })

//remove first doc found
Todo.findOneAndRemove({text: 'something to do'}).then((result) => {
    console.log(result);
});


//remove doc by ID
// Todo.findByIdAndRemove('5aa242ffe75f0e550a9c1317').then((todo) => {
//   console.log(todo);
// })
