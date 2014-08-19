'use strict';

angular.module('paymentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('payment', {
        url: '/payment',
        templateUrl: 'app/payment/payment.html',
        controller: 'PaymentCtrl'
      })
      .state('payRequest', {
        url: '/payment/:requestId/:amount',
        templateUrl: 'app/payment/payRequest.html',
        controller: 'PayRequestCtrl'
      });
  });