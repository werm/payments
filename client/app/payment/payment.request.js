'use strict';

angular.module('paymentsApp')
  .controller('PayRequestCtrl', function ($scope, $http, $stateParams) {
    $scope.request = [];

    console.log($stateParams);

    $http.get('/api/requests/' + $stateParams.requestId, {})
    .success(function (request,status) {
      $scope.request = request;
      console.log($scope.request)
    });

    $(document).on('keyup', '.cc-num', function(){
      var cardType = $.payment.cardType($(this).val());
      $('.cardImg').empty();
      $('.cardImg').html('<div class="' + cardType + '">&nbsp;</div>')
    })

    $(document).on('keyup', 'input[ng-class="cc-name"]', function(){
      var name = $(this).val();
      $('.signature').text(name)
    })

  });
