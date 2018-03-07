const {ObjectID} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose.js');
const {Todo} = require('./../server/models/todo.js');
const {Users} = require('./../server/models/user.js');

// //5aa059c3e8fcb307248c98d1
// var id = '5aa059c3e8fcb307248c98d11'
//
// if (!ObjectID.isValid(id)){
//   console.log('id not valid');
// }
// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('TOdos:', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo:', todo);
// });

//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('id not found');
//   };
//   console.log('Todo by iD:', todo);
// }).catch((e) => console.log(e));

// 5a9f9ad2b40f7c17f4cb3897

//User.findById
//handle null return - user not found
//print user to screen if not found
//print error message
var id = '5a9f9ad2b40f7c17f4cb3897';
Users.findById(id).then((user) => {
  if(!user){return console.log('user not found')};
  console.log('User found:', user);
}).catch((e) => {
  console.log('Error!', e);
});
