angular.module("blog").directive("blogView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "blog", "user", "$location", "$routeParams", "$anchorScroll", function forumCtrl($scope, blog, user, $location, $routeParams, $anchorScroll){
	    	$scope.currPage = 0;
	    	$scope.go = function(path){$location.path(path);};
	    	$scope.gotoReply = function(){$location.hash('reply'); $anchorScroll();};
	    	$scope.reply = function()
	    	{
	    		blog.createComment($routeParams.blogID, $scope.content).
	    		then(function(data){$scope.refresh();});
	    	};
	    	$scope.deleteComment = function(id)
	    	{
	    		if(confirm("Confirm Delete Comment:" + id))
	    			blog.deleteCommentAdmin(id).then(function(data){$scope.refresh();});
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
	    		blog.getByID($routeParams.blogID).then(function(data){
					$scope.blog = data;
					userMap.set(data.userID, {requested: true});	
					user.getByID(data.userID).then(asyncDetails(data.userID));
				});
				$scope.pages = [];
	    		$scope.pages.push({id: 0, commentsList: []});
	    		blog.getAllComments($routeParams.blogID).then(function(data){
	    			for(var i = 0, n = 0, p = 0; i < data.length; i++, n++)
	    			{
	    				if(n > 15)
	    				{
	    					$scope.pages.push({id: ++p, commentsList: []});
	    					n = 0;
	    				}
	    				var comment = data[i];
	    				if(!userMap.get(comment.userID))
	    				{
	    					userMap.set(comment.userID, {requested: true});	
	    					user.getByID(comment.userID).then(asyncDetails(comment.userID));
	    				}
	    				$scope.pages[p].commentsList.push(comment);
	    			}
	    			$scope.blogUsers = userMap;
	    		});
	    	};
	    	
	    	$scope.refresh();
	    }],
	    templateUrl: "blog/blog-view_template.html"
	};
});