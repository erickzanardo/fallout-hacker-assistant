(function() {
  require("angular");
  var FHA = require("./fha");

  angular.module("fhaApp", [])
  .controller("FhaController", function($scope) {
    $scope.fha = new FHA();
    $scope.logs = [];

    $scope.verify = function() {
      if ($scope.fha.errors.length == 0 || !$scope.password) {
        $scope.unlikely = false;
      } else {
        $scope.unlikely = !$scope.fha.isAProbablyMatch($scope.password);
      }
    }

    $scope.addError = function() {
      if ($scope.password) {
        $scope.likenessInput = true;
      } else {
        // play some noise
      }
    };

    $scope.confirmInsertion = function() {
      if (isNaN($scope.likeness)) {
        // play some noise
      } else {
        try {
          $scope.fha.addWrongPassword($scope.password, $scope.likeness);
          $scope.password = "";
          $scope.likeness = null;
          $scope.likenessInput = false;
        } catch (e) {
          $scope.logs.push(e);
        }
      }
    }
  });
})();
