angular.module('history.controllers', ['services', 'angularPayments'])

.controller('HistoryCtrl', function($scope, $stateParams, Auth) {
  console.log($stateParams.id);
  console.log(hi);
});
