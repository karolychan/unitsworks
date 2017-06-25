var express = require('express');
var app = express();
const port = process.env.PORT || 3000;
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/users');

app.get('/', (req,res) => {
  console.log('/ GET Realizado com sucesso');
  res.send('Em breve');
});
app.get('/mongo', (req,res) => {
  console.log('/ mongo - teste do db');
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});
app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
