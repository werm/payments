'use strict';

angular.module('paymentsApp')
  .controller('ShowRequestCtrl', function ($scope, $http, $stateParams) {
    $scope.request = [];

    console.log($stateParams);

    $http.get('/api/requests/' + $stateParams.id, {})
    .success(function (request,status) {
      $scope.request = request;
      console.log($scope.request)
    });

  });
