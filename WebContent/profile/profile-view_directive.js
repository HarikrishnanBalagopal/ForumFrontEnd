angular.module("profile").directive("profileView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "user", "$location", function forumCtrl($scope, user, $location){
	    	$scope.go = function(path){$location.path(path);};
	    }],
	    templateUrl: "profile/profile-view_template.html"
	};
});