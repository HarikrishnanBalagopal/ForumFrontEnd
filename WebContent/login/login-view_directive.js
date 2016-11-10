angular.module("login").directive("loginView", ["$location", function($location){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "$http", function forumCtrl($scope, $http){
	    	var baseURL = "http://localhost:8081/ForumBackEnd";
	    	$scope.showError = false;
	    	$scope.error = "";
	    	$scope.login = function()
	    	{
	    		if(!$scope.username || !$scope.password)
	    			return;
	    		$http({
	    		    method: 'POST',
	    		    url: baseURL + "/Login",
	    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	    		    transformRequest: function(obj)
	    		    {
	    		        var str = [];
	    		        for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	    		        return str.join("&");
	    		    },
	    		    transformResponse: function(data)
	    		    {
	    		    	return data;
	    		    },
	    		    data: {username: $scope.username, password: $scope.password}
	    		}).success(function(response){
	    			if(response == "success")
	    			{
	    				$http.get(baseURL + "/UserDetails/" + $scope.username).then(function(response){
	    					$scope.commonData.user = response.data;
	    					$scope.commonData.isLoggedIn = true;
	    					if($scope.commonData.user.role == 'A')
	    					{
	    						$scope.commonData.isAdmin = true;
	    						console.log("Admin Login:" + $scope.commonData);
	    	    				$location.path("/AdminHome");
	    	    				return;
	    					}
    						console.log("User Login:" + $scope.commonData);
	    				});
	    				$location.path("/Home");
	    			}else
	    			{
	    				$scope.showError = true;
	    				$scope.error = response;
	    			}
	    			});
	    	}
	    }],
	    templateUrl: 'login/login-view_template.html'
	};
}]);