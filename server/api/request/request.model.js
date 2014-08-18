'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var RequestSchema = new Schema({
  amount: Number,
  requestFor: String,
  paid: Boolean,
  created: Date
});

module.exports = mongoose.model('Request', RequestSchema);