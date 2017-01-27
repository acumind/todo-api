const {MongoClient, ObjectId} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',( err, db) =>{
  if(err){
    return console.log("Unable to connet to MongoDB server");
  }
  console.log("Connected to MongoDB server");

  // db.collection('ToDos').insertOne({
  //   text: 'Go to TommorrowLan',
  //   completed: false
  //
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to inser todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // db.collection('Users').insertOne({
  //   name: 'Gagan',
  //   age: 19,
  //   location: 'India'
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert user',err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2))
  // });


  db.collection('ToDos').find({_id:new ObjectId('587fbf53b0beb561c0a71404')}).toArray().then((docs) => {
    console.log('ToDos');
    console.log(JSON.stringify(docs, undefined,2))
  }, (err) => {
    console.log('Unable to fetch todos',err);
  });

  db.collection('ToDos').count().then((count) => {
    console.log(`ToDos count ${count}`);
  }, (err) => {
    console.log('Unable to fetch todos',err);
  });

  db.collection('ToDos').deleteMany({completed:true}).then((res) => {
    console.log(res);
  },(err) => {
    console.log('error in deleting');
  })



  db.close();
});
