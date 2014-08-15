'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PaymentSchema = new Schema({
  amount: Number,
  paymentFor: String,
  created: Date
});

module.exports = mongoose.model('Payment', PaymentSchema);