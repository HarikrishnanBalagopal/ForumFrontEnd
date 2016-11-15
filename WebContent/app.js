var app = angular.module("forumApp", ["ngRoute", "main", "login", "forum", "services"]);
app.config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when("/Home", {template: "<div data-main-view data-common-data=\"data\"></div>"}).
      when("/Forum", {template: "<div data-forum-list-view></div>"}).
      when("/Forum/:threadID", {template: "<div data-forum-thread-view data-common-data=\"data\"></div>"}).
      when("/Login", {template: "<div data-login-view data-common-data=\"data\"></div>"}).
      otherwise('/Home');
  }
]);
app.controller("mainController", ["$scope", "user", function($scope, user){
	$scope.data = {user: {}, isLoggedIn: false, isAdmin: false};
	$scope.logout = function()
	{
    	user.logout().then(function(){
    		$scope.data.isLoggedIn = false;
    		$scope.data.isAdmin = false;
    		$scope.data.user = {};
    	});
	}
}]);