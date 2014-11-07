angular.module('chat.controllers', ['services'])

.controller('ChatCtrl', function($scope, $stateParams, Auth) {
  $scope.test = $stateParams.id;
  console.log($stateParams.id);
  $scope.sayHello = function () {
    console.log("hello!");
  };
});
