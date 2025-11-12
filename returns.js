const app = angular.module('returnsApp', []);

app.controller('ReturnsController', function($scope, $http) {
  $scope.returnItems = [
    { productName: "Wireless Mouse", price: "$29.99", reason: "" },
    { productName: "Bluetooth Headphones", price: "$59.99", reason: "" }
  ];

  // Submit returns
  $scope.submitReturn = function() {
    const valid = $scope.returnItems.every(i => i.reason.trim() !== "");
    if (valid) {
      $http.post('/api/returns', $scope.returnItems)
        .then(() => alert("Return submitted successfully!"))
        .catch(err => console.error(err));
    } else {
      alert("Please provide a reason for each product.");
    }
  };
});

// jQuery Search
$(document).ready(function() {
  $('#searchProduct').on('input', function() {
    const value = $(this).val().toLowerCase();
    $('.card').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
});
