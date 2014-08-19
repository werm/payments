'use strict';

angular.module('paymentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('request', {
        url: '/request',
        templateUrl: 'app/request/request.html',
        controller: 'RequestCtrl'
      })
      .state('showRequest', {
        url: '/request/:id',
        templateUrl: 'app/request/show.html',
        controller: 'ShowRequestCtrl'
      });
  });