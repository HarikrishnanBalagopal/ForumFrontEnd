angular.module("profile").directive("profileView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "user", "friend", "listing", "$location", function forumCtrl($scope, user, friend, listing, $location){
	    	$scope.go = function(path){$location.path(path);};
    		var updateA = function(i){return function(data){$scope.applications[i].title = data.title;};};
	    	$scope.sortOrder = "username";
	    	$scope.sortOrder = "title";
	    	$scope.sortReverse = false;
	    	$scope.toggling = false;
	    	$scope.tab = "friends";
	    	$scope.onSuccess = function(response)
	    	{
	    		alert("Image uploaded");
	    		$scope.go("/Home");
	    	};
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
	    	$scope.toggleApplicationStatus = function(a)
	    	{
	    		if($scope.toggling)return;
	    		$scope.toggling = true;
	    		
	    		if(a.currStatus)
	    		{
	    			listing.updateApplicationAdmin(a.id, a.jobID, a.userID, 'Y', "").
	    			then(function(data){a.status = 'Y'; $scope.toggling = false;});
	    		}
	    		else
	    		{
	    			listing.updateApplicationAdmin(a.id, a.jobID, a.userID, 'R', prompt("Reason for rejection:") || "No Reason").
	    			then(function(data){a.status = 'R'; $scope.toggling = false;});
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
	    		listing.getAllUserApplication().then(function(data1){
	    			$scope.applications = data1;
    				for(var i = 0; i < data1.length; i++)
    					listing.getListingByID(data1[i].jobID).then(updateA(i));
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
	    	var searchUsers = function(id)
	    	{
	    		for(var i = 0; i < $scope.users.length; i++)
	    			if(id == $scope.users[i].id)
	    				return $scope.users[i];
	    		return null;
	    	};
	    	if($scope.commonData.isAdmin)
	    	{
	    		user.getAllAdmin().then(function(data){
	    			$scope.users = [];
	    			for(var i = 0; i < data.length; i++)
	    			{
	    				var u = data[i];
	    				u.currStatus = u.status == 'Y';
	    				$scope.users.push(u);
	    			}
	    		}).then(function(){
	    			listing.getAllApplicationAdmin().then(function(data1){
	    				$scope.applications = data1;
	    				for(var i = 0; i < data1.length; i++)
	    				{
	    					listing.getListingByID(data1[i].jobID).then(updateA(i));
	    					var u = searchUsers(data1[i].userID);
	    					if(u)
	    					{
	    						$scope.applications[i].username = u.username;
	    						$scope.applications[i].role = u.role;
	    					}
	    					$scope.applications[i].currStatus = data1[i].status == 'Y';
	    				}
	    				});
	    		});
	    	}
	    	else $scope.refresh();
	    }],
	    templateUrl: "profile/profile-view_template.html"
	};
});