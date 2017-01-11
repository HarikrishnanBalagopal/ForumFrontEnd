angular.module("blog").directive("blogGridView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "blog", "user", "$location", "$filter", function forumCtrl($scope, blog, user, $location, $filter){
	    	$scope.go = function(path){$location.path(path);};
	    	$scope.createBlog = function()
	    	{
	    		blog.createBlog($scope.title, $scope.content).then(function(data){$scope.refresh();});
	    	};
	    	$scope.deleteBlog = function(event, id)
	    	{
    			event.stopPropagation();
    			event.preventDefault();
	    		if(confirm("Confirm Delete Blog:" + id))
	    			blog.deleteBlogAdmin(id).then(function(data){$scope.refresh();});
	    	};
	    	$scope.acceptRejectBlog = function(event, id, accepted)
	    	{
    			event.stopPropagation();
    			event.preventDefault();
	    		var reason = "";
	    		if(!accepted)reason = prompt("Reason for rejection:") || "No Reason";
	    		blog.acceptRejectBlogAdmin(id, accepted, reason).then(function(data){$scope.refresh();});
	    	};
    		$scope.changePage = function(newPage)
    		{
    			$scope.currPage = newPage;
    		};
    		$scope.nextPage = function()
    		{
    			if($scope.currPage < ($scope.pages.length - 1))
    				$scope.currPage++;
    		};
    		$scope.prevPage = function()
    		{
    			if($scope.currPage > 0)
    				$scope.currPage--;
    		};
	    	$scope.refresh = function()
	    	{
	    		var userMap = new Map();
	    		var asyncDetails = function(id){return function(data){userMap.set(id, data);};};
		    	$scope.dateCust = new Date();
	    		$scope.pages = [];
				$scope.showNewBlog = false;
	    		$scope.currPage = 0;
		    	blog.getAll().then(function(data){	
		    		var msToD = function(d)
		    		{
		    			var days = Math.floor(d/(24 * 3600 * 1000));
		    			if(days > 0)
		    				return days + "d";
		    			
		    			var hours = Math.floor(d/(3600 * 1000));
		    			if(hours > 0)
		    				return hours + "h";
		    			
		    			var mins = Math.floor(d/(60 * 1000));
		    			if(mins > 0)
		    				return mins + "m";
		    			
		    			var seconds = Math.floor(d/1000);
		    			return seconds + "s";
		    		}
		    		
					$scope.pages.push({id: 0, blogsList: []});
		    		for(var i = 0, n = 0, p = 0; i < data.length; i++, n++)
		    		{
		    			if(n > 15)
		    			{
		    				$scope.pages.push({id: ++p, blogsList: []});
		    				n = 0;
		    			}
		    			var blog = data[i];
	    				if(!userMap.get(blog.userID))
	    				{
	    					userMap.set(blog.userID, {requested: true});	
	    					user.getByID(blog.userID).then(asyncDetails(blog.userID));
	    				}
	    				blog.createdOn = new Date(blog.createdOn);
	    				blog.diff = Math.abs($scope.dateCust - blog.createdOn);
	    				blog.diffStr = msToD(blog.diff);
	    				blog.createdOn = $filter("date")(blog.createdOn, "MMM d");
		    			
		    			$scope.pages[p].blogsList.push(blog);
		    		}
	    			$scope.blogUsers = userMap;
		    	});
	    	};
	    	
	    	$scope.refresh();
	    }],
	    templateUrl: "blog/blog-grid-view_template.html"
	};
});