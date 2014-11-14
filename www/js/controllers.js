angular.module('starter.controllers', ['services'])

.controller('LoginCtrl', function($scope, $state, Auth) {

	//input model
	$scope.user = {password: '', email: '' };

	$scope.login = function login(user) {
		Auth.login(user.email, user.password, user.name, user. bio).then(function(data) {
			if(data.local) {
				console.log('auth was successful.');

				$state.go('listings');
			} else {
				alert('Username / Password not valid. Try again');
			}
		});
	};
})
.controller('UserCtrl', function($scope, $state, $q, $http, $timeout, $ionicModal, $ionicActionSheet, Request, Auth ) {
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
				tags: task.tags,
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

		$scope.logout = function logout() {
			user = null;
			Auth.logout();
			window.localStorage.removeItem('user');
			$state.go('login');
			return;
		};

		$scope.items = [];
		getListings();



			function getListings(){
				$http.get(baseUrl+'api/products').success(function(response) {
				if(response) {
					$scope.items = [];
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
		}

})
.controller('HomeCtrl', function($q, $scope, $timeout, $ionicModal, $ionicActionSheet, $http) {
	$scope.items = [];
	var deferred = $q.defer();
	getListings();


		function getListings(){$http.get(baseUrl+'api/products').success(function(response) {
			if(response) {
				$scope.items = [];
				console.log(response);
				// Create the items
				for (var i = 0; i < response.length; i++) {
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
	}
});
