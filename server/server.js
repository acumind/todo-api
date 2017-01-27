var express = require('express');
var bodyParser = require('body-parser');
const _ = require('lodash');
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
});

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
  });
});

app.delete('/todos/:id',(req,res) => {
  var id = req.params.id;
  if(!ObjectId.isValid(id)){
    console.log("ToDo Id is not valid",id)
    return res.status(404).send();
  }
  Todo.findByIdAndRemove(id).then((doc) => {
    console.log(`Item ${doc} is removed`);
    res.status(200).send(`Item ${doc} is removed`);
  })
})

app.patch('/todos/:id',(req,res) => {
  var id = req.params.id;
  var body = _.pick(req.body,['text','completed']);

  if(!ObjectId.isValid(id)){
    console.log("ToDo Id is not valid",id)
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed = false;
    body.completedAt = null;
  }


  Todo.findByIdAndUpdate(id, {$set: body}, {new :true}).then((todo) => {
    if(!todo) {
      return res.status(404).send("bad req");
    }

    res.send({todo});

  }).catch((e) => {
    res.status(400).send("error in req");
  });


});


app.listen(port,() => {
  console.log(`Started on port ${port}`)
});
