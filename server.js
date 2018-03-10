var express = require('express');
const hbs = require('hbs');

const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
var {mongoose} = require('./db/mongoose');
var {User} = require('./models/user');
var {Person} = require('./models/person');
var {Company} = require('./models/company');

var app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded());
hbs.registerPartials(__dirname +'/views/partials' )
app.set('viewengine','hbs');
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/', (req,res) => {
  res.render('home.hbs', {
    pageTitle: 'About Page'
  });
});

app.post('/', (req,res) => {
  User.findOne({email: req.body.email, password: req.body.password}).then((user) => {
    if(!user){
      return res.redirect('/erro');
    }
    return res.redirect('/painel');
  }, (e) => {
    console.log('ERROR');
  });
});

app.get('/registro', (req,res) => {
  res.render('registro.hbs');
});
app.get('/registro/pessoa-juridica', (req,res) => {
  res.render('registro-pessoa-juridica.hbs');
});

app.get('/registro/pessoa-fisica', (req,res) => {
  res.render('registro-pessoa-fisica.hbs');
});
app.post('/registro/pessoa-fisica', (req,res) => {
  var user = new User({
    email: req.body.email,
    registered: new Date().toLocaleDateString(),
    password: req.body.password,
    type: req.body.type
  });
  user.save().then((userDoc) => {
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
       User.findByIdAndRemove(userDoc._id).then( res.redirect('/registro/pessoa-fisica') );
      });
  });
});
app.get('/mongo', (req,res) => {
  console.log('/ mongo - teste do db');
  User.find().then((users) => {
    res.send({users});
  }, (e) => {
    res.status(400).send(e);
  });
});

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


app.post('/companys', (req, res) => {
  var company = new Company({
  user: req.body.user,
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
    res.send({company: CompanyDoc});
  }, (e) => {
    console.log(e);
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