'use strict';

var _ = require('lodash');
var Payment = require('./payment.model');

var stripe = require('stripe')('sk_test_w1StpAx6V6yDN6SohnpIQUDF');

// Get list of payments
exports.index = function(req, res) {
  Payment.find(function (err, payments) {
    if(err) { return handleError(res, err); }
    console.log(payments)
    return res.json(200, payments);
  });
};

// Get a single payment
exports.show = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    return res.json(payment);
  });
};

// Creates a new payment in the DB.
exports.create = function(req, res) {
  Payment.create(req.body, function(err, payment) {
    if(err) { return handleError(res, err); }
    console.log(payment)
    return res.json(201, payment);
  });
};

exports.charge = function(req, res){
  // console.log(JSON.stringify(req.body, null, 2));
  console.log(req.body)
  var stripeToken = req.body.stripeToken;
  var amount = req.body.amount;

  stripe.charges.create({
    amount: amount*100,
    currency: "usd",
    card: stripeToken,
    description: "Charge for test@example.com"
  }, function(err, charge) {
    if (err) {
      console.log("ERR\n")
      console.log(JSON.stringify(err, null, 2));
    } else {
      return res.json(201, {"msg": "Success"})
    }
  });

  // var charge = stripe.charges.create({
  //     amount: amount,
  //     currency: "usd",
  //     card: stripeToken,
  //     description: "payinguser@example.com"
  // }, function(err, charge) {
  //     if (err && err.type === 'StripeCardError') {
  //         console.log(JSON.stringify(err, null, 2));
  //     }
  //     res.send("completed payment!")
  // });
}

// Updates an existing payment in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Payment.findById(req.params.id, function (err, payment) {
    if (err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    var updated = _.merge(payment, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, payment);
    });
  });
};

// Deletes a payment from the DB.
exports.destroy = function(req, res) {
  Payment.findById(req.params.id, function (err, payment) {
    if(err) { return handleError(res, err); }
    if(!payment) { return res.send(404); }
    payment.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}