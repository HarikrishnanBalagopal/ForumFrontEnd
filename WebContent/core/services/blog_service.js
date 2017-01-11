angular.module("services").factory("blog", ["$http", function($http){
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
			return $http.get(baseURL + "/Blog/" + id).then(success, error);
		},
		getAll: function()
		{
			return $http.get(baseURL + "/Blog").then(success, error);
		},
		getAllComments: function(id)
		{
			return $http.get(baseURL + "/BlogComments/" + id).then(success, error);
		},
		createBlog: function(title, content)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/CreateBlog",
    		    headers: {'Content-Type': 'application/json'},
    		    transformResponse: function(data)
    		    {
    		    	return data;
    		    },
    		    data: {title: title, content: content}
    		}).then(success, error);
		},
		deleteBlogAdmin: function(id)
		{
			return $http.delete(baseURL + "/DeleteBlogAdmin/" + id).then(success, error);
		},
		acceptRejectBlogAdmin: function(id, accepted, reason)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/AcceptRejectBlogAdmin",
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		    transformRequest: function(obj)
    		    {
    		        var str = [];
    		        for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		        return str.join("&");
    		    },
    		    data: {id: id, accepted: accepted, reason: reason}
    		}).then(success, error);
		},
		createComment: function(threadID, content)
		{
			return $http.post(baseURL + "/CreateBlogComment/", {threadID: threadID, content: content}).then(success, error);
		},
		deleteCommentAdmin: function(id)
		{
			return $http.delete(baseURL + "/DeleteBlogCommentAdmin/" + id).then(success, error);
		}
	};
}]);