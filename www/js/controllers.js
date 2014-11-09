//DEPLOYED
var baseUrl = 'http://104.236.42.109:8080/';

//DEVELOPMENT
var baseUrl = 'http://localhost:8080/';

angular.module('starter.controllers', ['services'])

.controller('LoginCtrl', function($scope, $state, Auth) {

	//input model
	$scope.user = {password: '', email: '' };

	$scope.login = function login(user) {
		Auth.login(user.email, user.password ).then(function(data) {
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
})
.controller('HomeCtrl', function($q, $scope, $timeout, $ionicModal, $ionicActionSheet, $http) {
	$scope.items = [];
	var deferred = $q.defer();

	$ionicModal.fromTemplateUrl('newTask.html', function(modal) {
		$scope.settingsModal = modal;
	});

	$scope.onRefresh = function() {
		console.log('Refreshing');

		$timeout(function() {
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
	};
	$http.get(baseUrl+'api/products').success(function(response) {
		if(response) {
			console.log(response);
			return deferred.resolve(response);
		} else {
			return deferred.resolve('No user found');
		}
		}).error(function(error) {
		//Fail our promise.
		deferred.reject(error);
	});

	// Create the items
	for(var i = 0; i < 10; i++) {
		$scope.items.push({
			id: i,
			title: 'Task ' + (i + 1),
			buttons: [{
				text: 'Done',
				type: 'button-success',
			}, {
				text: 'Delete',
				type: 'button-danger',
			}]
		});
	}
});
