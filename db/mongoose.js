var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/unitscoworks');
mongoose.connect('mongodb://defaultuser2:senhaboa@ds139082.mlab.com:39082/unitscoworks');
module.exports = {mongoose};
