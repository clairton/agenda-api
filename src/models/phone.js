'use strict';
var mongoose   = require('mongoose')

var schema = mongoose.Schema({
  prefix: Number,
  number: {
    type: Number,
    required: true
  },
  person: {ref:'Person', type: mongoose.Schema.Types.ObjectId},
});

module.exports = mongoose.model('Phone', schema);
