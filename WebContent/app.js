var app = angular.module("forumApp", ["ngRoute", "ngCookies", "ngAnimate", "lr.upload", "luegg.directives", "main", "login", "register", "profile", "forum", "blog", "listing", "services"]);
app.config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when("/Home", {template: "<div data-main-view data-common-data=\"data\"></div>"}).
      when("/Forum", {template: "<div data-forum-list-view data-common-data=\"data\"></div>"}).
      when("/Blog", {template: "<div data-blog-grid-view data-common-data=\"data\"></div>"}).
      when("/Listing", {template: "<div data-listing-view data-common-data=\"data\"></div>"}).
      when("/Forum/:threadID", {template: "<div data-forum-thread-view data-common-data=\"data\"></div>"}).
      when("/Blog/:blogID", {template: "<div data-blog-view data-common-data=\"data\"></div>"}).
      when("/Login", {template: "<div data-login-view data-common-data=\"data\"></div>"}).
      when("/Register", {template: "<div data-register-view data-common-data=\"data\"></div>"}).
      when("/Account", {template: "<div data-profile-view data-common-data=\"data\"></div>"}).
      otherwise('/Home');
  }
]);
app.controller("mainController", ["$scope", "$cookies", "user", function($scope, $cookies, user){
	$scope.data = {user: {}, isLoggedIn: false, isAdmin: false};
	var u = $cookies.getObject("userData");
	if(u)
	{
		$scope.data.user = u.user;
		$scope.data.isLoggedIn = u.isLoggedIn;
		$scope.data.isAdmin = u.isAdmin;
	}
	$scope.logout = function()
	{
    	user.logout().then(function(){
    		$scope.data.isLoggedIn = false;
    		$scope.data.isAdmin = false;
    		$scope.data.user = {};
    		$cookies.remove("userData");
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