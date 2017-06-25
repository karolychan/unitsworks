var mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
    trim: true,
    minlength: 1,
    uppercase: true
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    trim:true
  },
  registered: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['PERSON', 'COMPANY'],
    required: true,
    uppercase: true
  }

});

module.exports = {User}
