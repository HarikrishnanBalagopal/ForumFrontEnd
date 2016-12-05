angular.module("services").factory("friend", ["$http", function($http){
	var baseURL = "http://localhost:8081/ForumBackEnd";
	var success = function(response)
	{
		return response.data;
	}
	var error = function(reason)
	{
		console.log("Error reason:" + reason);
		return {};
	}
	return {
		getFriendList: function()
		{
			return $http.get(baseURL + "/GetFriendList").then(success, error);
		},
		requestFriend: function(id)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/RequestFriend",
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		    transformRequest: function(obj)
    		    {
    		        var str = [];
    		        for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		        return str.join("&");
    		    },
    		    data: {id: id}
    		}).then(success, error);
		},
		updateFriendRequest: function(id, accept)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/UpdateFriendRequest",
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		    transformRequest: function(obj)
    		    {
    		        var str = [];
    		        for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		        return str.join("&");
    		    },
    		    data: {id: id, accepted: accept}
    		}).then(success, error);
		}
	};
}]);