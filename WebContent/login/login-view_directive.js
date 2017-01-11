angular.module("login").directive("loginView", ["$location", function($location){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "$cookies", "user", function forumCtrl($scope, $cookies, user){
	    	$scope.showError = false;
	    	$scope.error = "";
	    	$scope.login = function()
	    	{
	    		var loadData = function()
	    		{
	    			user.getByUsername($scope.username).then(function(data){
	    				var u = {};
	    				u.user = $scope.commonData.user = data;
	    				u.isLoggedIn = $scope.commonData.isLoggedIn = true;
	    				if(data.role == 'A')
	    					u.isAdmin = $scope.commonData.isAdmin = true;
	    				$cookies.putObject("userData", u);
	    				$location.path("/Home");
	    			});
	    		};
	    		
	    		if(!$scope.username || !$scope.password)
	    			return;
	    		user.login($scope.username, $scope.password).then(function(data){
	    			if(data == "success")
	    				loadData();
	    			else
	    			{
	    				$scope.showError = true;
	    				if(data.error) $scope.error = data.error;
	    				else $scope.error = data;
	    			}
	    		});
	    	}
	    }],
	    templateUrl: 'login/login-view_template.html'
	};
}]);