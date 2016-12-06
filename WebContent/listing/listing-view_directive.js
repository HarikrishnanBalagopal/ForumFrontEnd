angular.module("listing").directive("listingView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "forum", "$location", "listing", function forumCtrl($scope, forum, $location, listing){
	    	$scope.go = function(path){$location.path(path);};
	    	$scope.showNewListing = false;
	    	$scope.createListing = function()
	    	{
	    		listing.createListingAdmin($scope.title, $scope.content).then(function(data){$scope.refresh();});
	    	};
	    	$scope.createApplication = function(id)
	    	{
	    		listing.createApplication(id).then(function(data){$scope.go("/Account");});
	    	};
	    	$scope.deleteListing = function(id)
	    	{
	    		listing.deleteListingAdmin(id).then(function(data){$scope.refresh();});
	    	};
	    	$scope.refresh = function()
	    	{
	    		listing.getAllListing().then(function(data1){
	    			$scope.listings = data1;
    				for(var i = 0; i < $scope.listings.length; i++)
    					$scope.listings[i].disabled = false;
	    			if($scope.commonData.isLoggedIn)
	    			{
		    			listing.getAllUserApplication().then(function(data2){
		    				for(var i = 0; i < data2.length; i++)
			    				for(var j = 0; j < $scope.listings.length; j++)
			    					if($scope.listings[j].id == data2[i].jobID)
			    					{
			    						$scope.listings[j].disabled = true;
			    						break;
			    					}
		    				});
	    			}
	    			});
	    	};
	    	$scope.refresh();
	    }],
	    templateUrl: "listing/listing-view_template.html"
	};
});