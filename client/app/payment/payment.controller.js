'use strict';

angular.module('paymentsApp')
  .controller('PaymentCtrl', function ($scope, $http) {

    $scope.payments = [];

    $http.get('/api/payments').success(function(payments) {
      $scope.payments = payments;
      // socket.syncUpdates('payment', $scope.payments);
    });

    function stripeResponseHandler(status, response) {
      var $form = $('#payment-form');

      if (response.error) {
        // Show the errors on the form
        $form.find('.payment-errors').text(response.error.message);
        $form.find('button').prop('disabled', false);
      } else {
        // response contains id and card, which contains additional card details
        var token = response.id;
        // Insert the token into the form so it gets submitted to the server
        $form.append($('<input type="hidden" name="stripeToken" />').val(token));
        // and submit
        $form.get(0).submit(function(e){
          e.preventDefault()
        });
      }
    }

    $scope.addPayment = function() {
      if($scope.amount === '') {
        return;
      }

      console.log($scope.amount)
      console.log($scope.paymentFor)

      Stripe.card.createToken({
        number: $scope.number,
        cvc: $scope.cvc,
        exp_month: $('.cc-exp').val().split(' / ')[0],
        exp_year: $('.cc-exp').val().split(' / ')[1]
      }, stripeResponseHandler);

      $http.post('/api/payments', { 
        amount: $scope.amount,
        paymentFor: $scope.paymentFor,
        created: new Date()
      });
      $scope.amount = '';
      $scope.paymentFor = '';
    };

    $scope.deletePayment = function(payment) {
      $http.delete('/api/payments/' + payment._id);
    };

    $(document).on('keyup', '.cc-num', function(){
      console.log($.payment.cardType($(this).val()));
    })

    $('input.cc-num').payment('formatCardNumber');
    $('input.cc-exp').payment('formatCardExpiry');
  });
