'use strict';
var mongoose   = require('mongoose')

var schema = mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: String,
  birthdate: Date,
  phones: {ref:'Phone', type: mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('Person', schema);
