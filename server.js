var express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Person} = require('./models/person');
var {Company} = require('./models/company');


var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

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

// User
// app.post('/users', (req, res) => {
//   var user = new User({
//     email: req.body.email,
//     registered: new Date().toLocaleDateString(),
//     password: req.body.password,
//     type: req.body.type
//   });
//   user.save().then((doc) => {
//     res.send(doc);
//   }, (e) => {
//     res.status(400).send(e);
//   });
// });

app.get('/users', (req, res) => {
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/persons', (req, res) => {
  Person.find().then((persons) => {
    res.send({persons});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.get('/companys', (req, res) => {
  Company.find().then((companys) => {
    res.send({companys});
  }, (e) => {
    res.status(400).send(e);
  });
});

app.post('/users', (req, res) => {
  var user = new User({
    email: req.body.email,
    registered: new Date().toLocaleDateString(),
    password: req.body.password,
    type: req.body.type
  });
  user.save().then((userDoc) => {
    if(user.type === 'PERSON'){
        var person = new Person({
        user: userDoc._id,
        name: req.body.name,
        sex: req.body.sex,
        cep: req.body.cep,
        street: req.body.street,
        neighborhood: req.body.neighborhood,
        placeNumber: req.body.placeNumber,
        city: req.body.city,
        state: req.body.state
        });
        person.save().then((personDoc) => {
        res.send({user: userDoc, person: personDoc});
      }, (e) => {
       User.findByIdAndRemove(userDoc._id).then( res.status(400).send(e) );
      });
    } else {
        var company = new Company({
        user: userDoc._id,
        socialName: req.body.socialName,
        fantasyName: req.body.fantasyName,
        site: req.body.site,
        cnpj: req.body.cnpj,
        cep: req.body.cep,
        street: req.body.street,
        neighborhood: req.body.neighborhood,
        placeNumber: req.body.placeNumber,
        city: req.body.city,
        state: req.body.state
        });
        company.save().then((CompanyDoc) => {
        res.send({user: userDoc, company: CompanyDoc});
      }, (e) => {
       User.findByIdAndRemove(userDoc._id).then( res.status(400).send(e) );
      });
    }
  }, (e) => {
    res.status(400).send(e);
  });
});


app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
