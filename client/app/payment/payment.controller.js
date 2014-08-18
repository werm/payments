'use strict';

angular.module('paymentsApp')
  .controller('PaymentCtrl', function ($scope, $http) {

    $scope.payments = [];

    $http.get('/api/payments').success(function(payments) {
      $scope.payments = payments;
      // socket.syncUpdates('payment', $scope.payments);
    });

    function getExp(){
      $(document).on('blur', '.cc-exp', function(){
        var fullDate = $(this).val().split(' / ');
        $('#exp-mo').val(fullDate[0]);
        $('#exp-yr').val(fullDate[1]);
        console.log($('#exp-mo').val());
        console.log($('#exp-yr').val());
      });
    }

    Stripe.setPublishableKey('pk_test_v9J7b5KiPBtyF7nqv52ncqN7');

    $scope.handleStripe = function(status, response){
      var $form = $('form');
      if(response.error) {
        console.log(response.error)
        // there was an error. Fix it.
      } else {
        // got stripe token, now charge it or smt
        var token = response.id
        $http.post('/api/payments/charge', { 
          amount: $scope.amount,
          stripeToken: token,
          paymentFor: $scope.paymentFor,
          created: new Date()
        })
        .success(function(data){
          if(data.msg === "Success"){
            $(".payment-errors").html('<div class="alert alert-warning alert-dismissible" role="alert">' +
                                      '<button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>' +
                                      'Payment Successful!</div>');
            $form.find('button').prop('disabled', false);
          } else {
            // re-enable the submit button
            $form.find('button').prop('disabled', false);
            // show the errors on the form
            $(".payment-errors").html(data.msg);
          }
        })

      }
    }

    $scope.addPayment = function() {
      if($scope.amount === '') {
        return;
      }

      $http.post('/api/payments', { 
        amount: $scope.amount,
        paymentFor: $scope.paymentFor,
        created: new Date()
      });
    };

    $scope.deletePayment = function(payment) {
      $http.delete('/api/payments/' + payment._id);
    };

    getExp();

    $(document).on('keyup', '.cc-num', function(){
      console.log($.payment.cardType($(this).val()));
    })

    $('input.cc-num').payment('formatCardNumber');
    $('input.cc-exp').payment('formatCardExpiry');
  });
