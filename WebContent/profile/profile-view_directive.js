angular.module("profile").directive("profileView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "user", "$location", function forumCtrl($scope, user, $location){
	    	$scope.go = function(path){$location.path(path);};
	    	$scope.sortOrder = "username";
	    	$scope.toggling = false;
	    	$scope.toggleStatus = function(u)
	    	{
	    		if($scope.toggling)return;
	    		$scope.toggling = true;
	    		
	    		if(u.currStatus)
	    		{
	    			user.approve(u.id).
	    			then(function(data){u.status = 'Y'; $scope.toggling = false;});
	    		}
	    		else
	    		{
	    			user.reject(u.id, prompt("Reason for rejection:") || "No Reason").
	    			then(function(data){u.status = 'R'; $scope.toggling = false;});
	    		}
	    	};
	    	if($scope.commonData.isAdmin)
	    	{
	    		user.getAllAdmin().then(function(data){
	    			$scope.users = [];
	    			for(var i = 0; i < data.length; i++)
	    			{
	    				var user = data[i];
	    				user.currStatus = user.status == 'Y';
	    				$scope.users.push(user);
	    			}
	    		});
	    	}
	    }],
	    templateUrl: "profile/profile-view_template.html"
	};
});