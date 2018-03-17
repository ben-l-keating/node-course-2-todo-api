const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todo} = require('./../../models/todo.js');
const {Users} = require('./../../models/user.js');

const user1Id = new ObjectID();
const user2Id = new ObjectID();

const users =[{
  _id: user1Id,
  email: 'ben@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user1Id, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: user2Id,
  email: 'jen@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: user2Id, access: 'auth'}, 'abc123').toString()
  }]
}];

const todos = [{
  _id: new ObjectID(),
  text: 'first test todo',
  _creator: user1Id
}, {
  _id: new ObjectID(),
  text: 'second test todo',
  completed: true,
  completedAt: 333,
  _creator: user2Id
}];

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos, (error, docs) => {
      if (error){
        return done(error);
      }
    });
  }).then(() => done());
};

const populateUsers = (done) => {
  Users.remove({}).then(() => {
  var userOne = new Users(users[0]).save();

  var userTwo = new Users(users[1]).save();

  return Promise.all([userOne, userTwo]);
}).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
