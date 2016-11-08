angular.module("mainView").directive("mainView", ["$location", function($location){
	return {
	    restrict: 'A',
	    templateUrl: "main-view/main-view_template.html",
	    link: function(scope)
	    {
	    	scope.go = function(path){$location.path(path);};
	    }
	};
}]);