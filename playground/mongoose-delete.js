const {mongoose} = require('./../server/db/mongoose');
const {ObjectId} = require('mongodb');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remove({}).then((result) => {

});

var removedTodo = Todo.findOneAndRemove({

});

 Todo.findByIdAndRemove('5884f8ecf806a27de82776d2').then((doc) => {
   console.log(`Removed Todo: ${doc}`);
 });
