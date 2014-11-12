angular.module('services', [])
//removed funtion signature
.factory('socket', function ($rootScope) {
  var socket = io.connect(baseUrl);
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };
})

.factory('Auth', function Auth($q, $http,$location) {
  var user = null;

  try {
    window.localStorage.clear();
    user = JSON.parse(window.localStorage.getItem('user'));
  } catch(ex) { /* Silently fail, no user */ }

  var login = function login(email, password, name, bio) {
    var deferred = $q.defer();
    var url;
    // Use same service for URL
    console.log("location path", $location.path());
    if ($location.path() === '/login'){
       url = baseUrl + 'login';
    }
    else {
       url = baseUrl + 'signup';
    }
    var postData = { email: email, password: password, name:name, bio:bio };

    $http.post(url, postData).success(function(response) {
      if(response.local !== []) {
        console.log("inside");
        user = { name: response.local.email, id: response.id, email: response.local.email };
        console.log(user);
        window.localStorage.setItem('user', JSON.stringify(user));
        return deferred.resolve(response);
      } else {
        return deferred.resolve('No user found');
      }
    }).error(function(error) {
      //Fail our promise.
      deferred.reject(error);
    });

    return deferred.promise;
  };

  var currentUser = function currentUser() {
    return user;
  };

  var logout = function logout() {
    user = null;
    window.localStorage.removeItem('user');
  };

  return {
    login: login,
    logout: logout,
    currentUser: currentUser
  };
})
.factory('Request', function Request($q, $http, $location) {


  var post = function post(route, obj) {
    var deferred = $q.defer();
    console.log(obj);

    $http({
       withCredentials: false,
       method: 'post',
       url: baseUrl+route,
       data: obj,
    }).
    success(function(response) {
        console.log(response);
        return deferred.resolve(response);
    })
    .error(function(error) {
      //Fail our promise.
      deferred.reject(error);
    });

    return deferred.promise;
  };

  return {
    post: post
  };
})
// nice modal notifications.
.factory('Prompt', function ($scope, $ionicPopup, $timeout) {
  // body...
  var alert = function () {
    console.log("alert");
  };
  return {
    alert:alert
  };
})
.factory('Listings', function Listings($q, $http, $location) {

});
