'use strict';

angular.module('paymentsApp')
  .controller('ShowRequestCtrl', function ($scope, $http, $stateParams) {
    $scope.request = [];

    $http.get('/api/requests/:id', {
      params: { id: id }
    })
    .success(function (request,status) {
      $scope.request = request;
    });

  });
