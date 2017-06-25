var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.get('/', (req,res) => {
  console.log('/ GET Realizado com sucesso');
  res.send('Em breve');
});

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};
