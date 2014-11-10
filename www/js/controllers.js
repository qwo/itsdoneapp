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
.controller('UserCtrl', function($scope, $q, $http, $timeout, $ionicModal, $ionicActionSheet, Request ) {
		var deferred = $q.defer();
		// No need for testing data anymore
		$scope.tasks = [];

		// Create and load the Modal
		$ionicModal.fromTemplateUrl('new-task.html', function(modal) {
			$scope.taskModal = modal;
		}, {
			scope: $scope,
			animation: 'slide-in-up'
		});

		// Called when the form is submitted
		$scope.createTask = function(task) {
			//post the data
			Request.post('api/products/', {
				title: task.title,
				description: task.description,
				price: task.price,
				provider: JSON.parse(window.localStorage.getItem('user'))
			});

			$scope.tasks.push({
				title: task.title,
				description: task.description,
				price: task.price,
				provider: JSON.parse(window.localStorage.getItem('user'))
			});
			$scope.taskModal.hide();
			task.title = "";
			task.description = "";
			task.price = "";
		};

		// Open our new task modal
		$scope.newTask = function() {
			$scope.taskModal.show();
		};

		// Close the new task modal
		$scope.closeNewTask = function() {
			$scope.taskModal.hide();
		};

			// Close the new task modal
		$scope.closeNewTask = function() {
			$scope.taskModal.hide();
		};
})
.controller('HomeCtrl', function($q, $scope, $timeout, $ionicModal, $ionicActionSheet, $http) {
	$scope.items = [];
	var deferred = $q.defer();

	$scope.onRefresh = function() {
		console.log('Refreshing');

		$timeout(function() {
			$scope.$broadcast('scroll.refreshComplete');
		}, 1000);
	};
	$http.get(baseUrl+'api/products').success(function(response) {
		if(response) {
			console.log(response);
			// Create the items
			for(var i = 0; i < response.length; i++) {
				$scope.items.push({
					id: response[i]._id,
					title: response[i].title,
					description: response[i].description,
					price: response[i].price,
					buttons: [{
						text: 'Done',
						type: 'button-success',
					}, {
						text: 'Delete',
						type: 'button-danger',
					}]
				});
			}
			return deferred.resolve(response);
		} else {
			return deferred.resolve('No user found');
		}
		}).error(function(error) {
		//Fail our promise.
		deferred.reject(error);
	});

});
