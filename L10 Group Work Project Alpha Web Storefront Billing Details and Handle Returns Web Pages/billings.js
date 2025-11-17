const app = angular.module('billingApp', []);

app.controller('BillingController', function($scope, $http) {
  $scope.billing = {};
  $scope.submitted = false;

  //default shipping address
  $scope.shippingAddress = "123 Example St, Philadelphia, PA 19104";

  $scope.copyShipping = function () {
    if ($scope.billing.sameAsShipping) {
      $scope.billing.address = $scope.shippingAddress;
    } else {
      $scope.billing.address = "";
    }
  };

  $scope.calculateTotal = function () {
      if ($scope.billing.subtotal) {
          const taxRate = 0.06; // 6% example
          $scope.billing.tax = $scope.billing.subtotal * taxRate;
          $scope.billing.total = parseFloat($scope.billing.subtotal) + $scope.billing.tax;
      }
  };

  
  $scope.submitBilling = function() {
    if (validateBilling($scope.billing)) {
      $http.post('/api/billing', $scope.billing)
        .then(() => {
          alert("Billing submitted successfully!");
          $scope.submitted = true;
        })
        .catch(err => console.error(err));
    } else {
      alert("Please correct your input.");
    }
  };
});

function validateBilling(data) {
  const cardRegex = /^[0-9]{16}$/;
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  const cvvRegex = /^[0-9]{3}$/;
  return (
    data.fullname &&
    data.address &&
    cardRegex.test(data.cardNumber) &&
    expiryRegex.test(data.expiry) &&
    cvvRegex.test(data.cvv)
  );
}

