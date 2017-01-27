const {mongoose} = require('./../server/db/mongoose');
const {ObjectId} = require('mongodb');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5884fde06894db76c41db295';

// Todo.find({
//   _id:id,
// }).then((todos) => {
//
//   console.log('Todos', todos);
// },(err) => {
//   console.log('Error in get todo with id', id);
// });
//
// Todo.findOne({
//   _id:id,
// }).then((todo) => {
//
//   console.log('Todo', todo);
// },(err) => {
//   console.log('Error in get todo with id', id);
// });
//
// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('id not found');
//   }
//   console.log('TodoById', todo);
// }).catch((e) => console.log(e));


User.findById(id).then((user) => {
  if(!user){
    return console.log('User id not found');
  }
  console.log('User id', user);
}).catch((e) => console.log(e));
