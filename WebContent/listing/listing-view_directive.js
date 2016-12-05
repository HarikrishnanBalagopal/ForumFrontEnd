angular.module("listing").directive("listingView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "forum", "$location", "$filter", function forumCtrl($scope, forum, $location, $filter){
	    	$scope.go = function(path){$location.path(path);};
	    }],
	    templateUrl: "listing/listing-view_template.html"
	};
});