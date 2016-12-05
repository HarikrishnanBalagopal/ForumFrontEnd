angular.module("profile").directive("profileView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "user", "friend", "$location", function forumCtrl($scope, user, friend, $location){
	    	$scope.go = function(path){$location.path(path);};
	    	$scope.sortOrder = "username";
	    	$scope.sortReverse = false;
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
	    	$scope.refresh = function()
	    	{
	    		user.getAll().then(function(data1){
	    			$scope.users = [];
	    			friend.getFriendList().then(function(data2){
	    				for(var i = 0; i < data1.length; i++)
	    				{
	    					if(data1[i].id == $scope.commonData.user.id)
	    						continue;
    						data1[i].friendStatus = "2";
	    					for(var j = 0; j < data2.length; j++)
	    						if(data1[i].id == data2[j][0].id)
	    						{
	    							data1[i].friendStatus = data2[j][1];
	    							break;
	    						}
	    					$scope.users.push(data1[i]);
	    				}
	    			});
	    		});
	    	};
	    	$scope.sendRequest = function(id)
	    	{
	    		friend.requestFriend(id).then(function(data){$scope.refresh();});
	    	};
	    	$scope.acceptRequest = function(id)
	    	{
	    		friend.updateFriendRequest(id, true).then(function(data){$scope.refresh();});
	    	};
	    	$scope.rejectRequest = function(id)
	    	{
	    		friend.updateFriendRequest(id, false).then(function(data){$scope.refresh();});
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
	    	else $scope.refresh();
	    }],
	    templateUrl: "profile/profile-view_template.html"
	};
});