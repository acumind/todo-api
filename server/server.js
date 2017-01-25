var express = require('express');
var bodyParser = require('body-parser');
const {ObjectId} = require('mongodb');

const port = process.env.PORT || 3000;

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

app.get('/todos', (req,res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  },(err) => {
    res.status(400).send(e);
  })
})

app.get('/todos/:id', (req,res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    console.log("ToDo ID is not valid",id);
    return res.status(404).send();
  }
  Todo.findOne({_id:id}).then((todo) => {
    if(!todo || todo.length === 0 ){
      console.log(`No Todo found for id:${id}`)
      return res.status(404).send({});
    }
    console.log(`Found Todo with id: ${id}:`,todo);
    res.status(200).send({todo});
  },(e) => {
    console.log(`Error in findin todo with id: ${id}`);
    return res.status(400).send();
  })
})

app.listen(port,() => {
  console.log(`Started on port ${port}`)
});
