const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
let db;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(
  'mongodb+srv://asd3qwe1:antjs15915!@cluster0.sfj9t0l.mongodb.net/?retryWrites=true&w=majority',
  function (testerr, client) {
    if (testerr) return console.log(testerr);
    db = client.db('todolist');
    db.collection('lists').insertOne({ 이름: '김무선', _id: 2 }, function (
      testerr,
      response
    ) {
      console.log('저장완료');
    });
    app.listen('8080', function () {
      console.log('정상작동');
    });
  }
);

app.get('/', function (request, response) {
  response.sendFile(__dirname + '/index.html');
});

app.get('/sub1', function (request, response) {
  response.sendFile(__dirname + '/sub1.html');
});

app.get('/sub2', function (request, response) {
  response.sendFile(__dirname + '/sub2.html');
});

app.post('/add', function (request, response) {
  console.log(request.body);
  db.collection('post').insertOne(
    {
      이름: request.body.title,
      비밀번호: request.body.date,
      메세지: request.body.massage,
    },
    function () {
      response.redirect('/list');
    }
  );
});

app.get('/list', function (request, response) {
  db.collection('post')
    .find()
    .toArray(function (testerr, result) {
      console.log(result);
      response.render('list.ejs', { post: result });
    });
});
