'use strict';

angular.module('paymentsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('request', {
        url: '/request',
        templateUrl: 'app/request/request.html',
        controller: 'RequestCtrl'
      })
      .state('request.show', {
        url: '/show/:id',
        templateUrl: 'app/request/show.html',
        controller: 'ShowRequestCtrl'
      });
  });