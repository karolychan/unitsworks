var mongoose = require('mongoose');
var Person = mongoose.model('Person', {
  user: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    uppercase: true
  },
  sex: {
    type: String,
    enum: ['MALE', 'FEMALE'],
    uppercase: true
  },
  cep: {
    type:Number,
    minlength: 8,
    maxlength: 8,
    trim: true,
    required: true,
  },
  street: {
      type:String,
      trim:true,
      uppercase: true
  },
  city: {
      type:String,
      trim:true,
      required: true,
      minlength:1,
      uppercase: true
  },
  state: {
      type:String,
      enum: ['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'],
      required: true,
      minlength: 2,
      maxlength: 2,
      trim:true,
      uppercase: true
  },
  neighborhood: {
    type:String,
    trim:true,
    uppercase: true
  },
  placeNumber: {
    type: Number,
    trim: true,
    required: true
  }
}, 'persons');

module.exports = {Person}
