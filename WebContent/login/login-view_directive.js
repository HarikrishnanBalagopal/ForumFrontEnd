angular.module("login").directive("loginView", ["$location", function($location){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "user", function forumCtrl($scope, user){
	    	$scope.showError = false;
	    	$scope.error = "";
	    	$scope.login = function()
	    	{
	    		var loadData = function()
	    		{
	    			user.getByUsername($scope.username).then(function(data){
	    				$scope.commonData.user = data;
	    				$scope.commonData.isLoggedIn = true;
	    				if(data.role == 'A')
	    				{
	    					$scope.commonData.isAdmin = true;
	    					$location.path("/AdminHome");
	    				}else $location.path("/Home");
	    			});
	    		}
	    		
	    		if(!$scope.username || !$scope.password)
	    			return;
	    		user.login($scope.username, $scope.password).then(function(data){
	    			if(data == "success")
	    				loadData();
	    			else
	    			{
	    				$scope.showError = true;
	    				$scope.error = data;
	    			}
	    		});
	    	}
	    }],
	    templateUrl: 'login/login-view_template.html'
	};
}]);