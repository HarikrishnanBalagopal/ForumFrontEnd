var app = angular.module("forumApp", ["ngRoute", "main", "login", "register", "profile", "forum", "listing", "services"]);
app.config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when("/Home", {template: "<div data-main-view data-common-data=\"data\"></div>"}).
      when("/Forum", {template: "<div data-forum-list-view data-common-data=\"data\"></div>"}).
      when("/Listing", {template: "<div data-listing-view data-common-data=\"data\"></div>"}).
      when("/Forum/:threadID", {template: "<div data-forum-thread-view data-common-data=\"data\"></div>"}).
      when("/Login", {template: "<div data-login-view data-common-data=\"data\"></div>"}).
      when("/Register", {template: "<div data-register-view data-common-data=\"data\"></div>"}).
      when("/Account", {template: "<div data-profile-view data-common-data=\"data\"></div>"}).
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
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});