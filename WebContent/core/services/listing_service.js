angular.module("services").factory("listing", ["$http", function($http){
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
		getListingByID: function(id)
		{
			return $http.get(baseURL + "/GetListing/" + id).then(success, error);
		},
		getAllListing: function()
		{
			return $http.get(baseURL + "/ListingAll").then(success, error);
		},
		getApplicationByID: function(id)
		{
			return $http.get(baseURL + "/GetApplication/" + id).then(success, error);
		},
		getAllUserApplication: function()
		{
			return $http.get(baseURL + "/ApplicationAllUser").then(success, error);
		},
		getAllApplicationAdmin: function()
		{
			return $http.get(baseURL + "/ApplicationAllAdmin").then(success, error);
		},
		createListingAdmin: function(title, content)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/CreateListingAdmin",
    		    headers: {'Content-Type': 'application/json'},
    		    transformResponse: function(data)
    		    {
    		    	return data;
    		    },
    		    data: {title: title, content: content}
    		}).then(success, error);
		},
		createApplication: function(id)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/CreateApplication",
    		    headers: {'Content-Type': 'application/json'},
    		    transformResponse: function(data)
    		    {
    		    	return data;
    		    },
    		    data: {jobID: id}
    		}).then(success, error);
		},
		updateListingAdmin: function(title, content)
		{
			return $http.put(baseURL + "/UpdateListingAdmin", {title: title, content: content}).then(success, error);
		},
		deleteListingAdmin: function(id)
		{
			return $http.delete(baseURL + "/DeleteListingAdmin/" + id).then(success, error);
		},
		updateApplicationAdmin: function(id, jobID, userID, status, reason)
		{
			return $http.put(baseURL + "/UpdateApplicationAdmin", {id: id, jobID: jobID, userID: userID, status: status, reason: reason}).then(success, error);
		},
		deleteApplicationAdmin: function(id)
		{
			return $http.delete(baseURL + "/DeleteApplicationAdmin/" + id).then(success, error);
		}
	};
}]);