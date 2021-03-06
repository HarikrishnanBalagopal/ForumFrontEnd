angular.module("services").factory("forum", ["$http", function($http){
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
		getByID: function(id)
		{
			return $http.get(baseURL + "/Forum/" + id).then(success, error);
		},
		getAll: function()
		{
			return $http.get(baseURL + "/Forum").then(success, error);
		},
		getAllComments: function(id)
		{
			return $http.get(baseURL + "/ForumComments/" + id).then(success, error);
		},
		createThread: function(title, content)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/CreateThread",
    		    headers: {'Content-Type': 'application/json'},
    		    transformResponse: function(data)
    		    {
    		    	return data;
    		    },
    		    data: {title: title, content: content}
    		}).then(success, error);
		},
		deleteThreadAdmin: function(id)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/DeleteThreadAdmin",
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
		createComment: function(threadID, content)
		{
			return $http.post(baseURL + "/CreateThreadComment/", {threadID: threadID, content: content}).then(success, error);
		},
		deleteCommentAdmin: function(id)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/DeleteThreadCommentAdmin",
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		    transformRequest: function(obj)
    		    {
    		        var str = [];
    		        for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		        return str.join("&");
    		    },
    		    data: {id: id}
    		}).then(success, error);
		}
	};
}]);