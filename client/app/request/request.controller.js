'use strict';

angular.module('paymentsApp')
  .controller('RequestCtrl', function ($scope, $http) {
    $scope.requests = [];

    $http.get('/api/requests').success(function(requests) {
      $scope.requests = requests;
      // socket.syncUpdates('request', $scope.requests);
    });

    $scope.addRequest = function() {
      if($scope.amount === '') {
        return;
      }

      $http.post('/api/requests', { 
        amount: $scope.amount,
        requestFor: $scope.requestFor,
        paid: false,
        created: new Date()
      });
    }

  });
