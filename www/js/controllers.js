angular.module('starter.controllers', ['services'])

.controller('LoginCtrl', function($scope, $state, Auth) {

	//input model
	$scope.user = { name: '', password: '', email: '' };

	$scope.login = function login(user) {
		Auth.login(user.email, user.password ).then(function(data) {
			console.log('auth passed.');
			if(data.local) {
				console.log('auth was successful.');

				$state.go('listings');
			} else {
				alert('Username / Password not valid. Try again');
			}
		});
	};
})
.controller('TaskCtrl', function($scope) {
	$scope.close = function() {
		$scope.modal.hide();
	};
})
.controller('BuyCtrl', function($scope) {
	console.log("Buy");
})
.controller('SellCtrl', function($scope) {
	console.log("Sell");
});
