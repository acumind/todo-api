var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {Todo} = require('./models/todo.js');
var {User} = require('./models/user.js');


var app = express();
app.use(bodyParser.json());

app.post('/todos', (req,res) => {
  console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });
  todo.save().then((doc) => {
    console.log('Save new todo');
    res.send(doc);
  },(err) => {
    console.log('Error in saveing new todo', err);
    res.status(400).send(err);
  })
});



app.listen(3000,() => {
  console.log('Started on port 3000')
});