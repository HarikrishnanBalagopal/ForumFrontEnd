angular.module("services").factory("user", ["$http", function($http){
	var baseURL = "http://localhost:8081/ForumBackEnd";
	var success = function(response)
	{
		return response.data;
	}
	var error = function(reason)
	{
		console.log("Error reason:" + reason);
		return {error: reason};
	}
	return {
		checkEmail: function(email)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/CheckEmail",
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		    transformRequest: function(obj)
    		    {
    		        var str = [];
    		        for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		        return str.join("&");
    		    },
    		    data: {email: email}
    		}).then(success, error);
		},
		checkUsername: function(username)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/CheckUsername",
    		    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		    transformRequest: function(obj)
    		    {
    		        var str = [];
    		        for(var p in obj)str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    		        return str.join("&");
    		    },
    		    data: {username: username}
    		}).then(success, error);
		},
		getByID: function(id)
		{
			return $http.get(baseURL + "/UserDetailsID/" + id).then(success, error);
		},
		getByIDAdmin: function(id)
		{
			return $http.get(baseURL + "/UserDetailsIDAdmin/" + id).then(success, error);
		},
		getByUsername: function(username)
		{
			return $http.get(baseURL + "/UserDetails/" + username).then(success, error);
		},
		getAll: function()
		{
			return $http.get(baseURL + "/UserDetailsAll").then(success, error);
		},
		login: function(username, password)
		{
			return $http({
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
    		    data: {username: username, password: password}
    		}).then(success, error);
		},
		logout: function()
		{
			return $http.get(baseURL + "/Logout").then(success, error);
		},
		register: function(userDetails)
		{
			return $http({
    		    method: 'POST',
    		    url: baseURL + "/Register",
    		    headers: {'Content-Type': 'application/json'},
    		    transformResponse: function(data)
    		    {
    		    	return data;
    		    },
    		    data: userDetails
    		}).then(success, error);
		}
	};
}]);