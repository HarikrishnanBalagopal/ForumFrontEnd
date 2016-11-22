angular.module("register").directive("registerView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "user", "$location", function forumCtrl($scope, user, $location){
	    	$scope.checkUsername = function()
	    	{
	    		user.checkUsername($scope.registerForm.username.$modelValue).then(function(data){
	    			console.log(data);
	    			if(data)
	    				$scope.checkUser = "Username is available";
	    			else
	    				$scope.checkUser = "Username is not available";	    				
	    		});
	    	}
	    	$scope.validate = function()
	    	{
	    		var p = $scope.newUser.password;
	    		if(p == "" || p != $scope.confirmPassword)return false;
	    		else return true;
	    	};
	    	$scope.regexValid = function() {
	    		var p = $scope.newUser.password;
	    		if (p == "") {
	    			$scope.regexCheck = "Password cannot be empty";
	    		} else if (!/[a-zA-Z]/.test(p)) {
	    			$scope.regexCheck = "Password must contain letters";
	    		} else if (!/[0-9]/.test(p)) {
	    			$scope.regexCheck = "Password must contain numbers";
	    		} else if (!/.{8,}/.test(p)) {
	    			$scope.regexCheck = "Password must be atleast 8 characeters long";
	    		} else {
	    			$scope.regexCheck = "Password is Valid";
	    		}
	    	};
	    	$scope.register = function()
	    	{
	    		if(!$scope.validate() || !$scope.registerForm.$valid)return;
	    		user.checkUsername($scope.registerForm.username.$modelValue).then(function(data){
	    			if(data)
	    			{
	    				user.checkEmail($scope.registerForm.email.$modelValue).then(function(data){
	    					if(data)
		    				{
	    						user.register($scope.newUser).then(function(data){
		    								if(data.error)
		    								{
		    		    						$scope.error = data.error;
		    		    						$scope.showError = true;
		    								}
		    								else $location.path("/Login");
	    								});
		    				}
	    					else
	    					{
	    						$scope.error = "Email is already in use";
	    						$scope.showError = true;
	    					}
	    				});
	    			}
	    		});
	    	};
	    	$scope.newUser = {};
	    	$scope.newUser.role = 'S';
			$scope.checkUser = "Username is not available";	    				
			$scope.regexCheck = "Password cannot be empty";
			$scope.showError = false;
	    }],
	    templateUrl: "register/register-view_template.html"
	};
});