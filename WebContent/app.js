var app = angular.module("forumApp", ["ngRoute", "main", "login", "forum"]);
app.config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when("/Home", {template: "<div data-main-view data-common-data=\"data\"></div>"}).
      when("/Forum", {template: "<div data-forum-list></div>"}).
      when("/Login", {template: "<div data-login-view data-common-data=\"data\"></div>"}).
      otherwise('/Home');
  }
]);
app.controller("mainController", ["$scope", "$http", function($scope, $http){
	var baseURL = "http://localhost:8081/ForumBackEnd";
	$scope.data = {user: {}, isLoggedIn: false, isAdmin: false};
	$scope.logout = function()
	{
    	$http.get(baseURL + "/Logout").then(function(response){
    		$scope.data.isLoggedIn = false;
    		$scope.data.isAdmin = false;
    		$scope.data.user = {};
    	});
	}
}]);