angular.module("forum").directive("forumListView", function(){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    controller: ["$scope", "forum", "$location", "$filter", function forumCtrl($scope, forum, $location, $filter){
	    	$scope.go = function(path){$location.path(path);};
	    	$scope.createThread = function()
	    	{
	    		forum.createThread($scope.title, $scope.content).then(function(data){$scope.refresh();});
	    	}
    		$scope.showNew = function()
    		{
    			$scope.showNewTopic = true;
    		}
    		$scope.changePage = function(newPage)
    		{
    			$scope.currPage = newPage;
    		}
    		$scope.nextPage = function()
    		{
    			if($scope.currPage < ($scope.pages.length - 1))
    				$scope.currPage++;
    		}
    		$scope.prevPage = function()
    		{
    			if($scope.currPage > 0)
    				$scope.currPage--;
    		}
	    	$scope.refresh = function()
	    	{
		    	$scope.dateCust = new Date();
	    		$scope.pages = [];
				$scope.showNewTopic = false;
	    		$scope.currPage = 0;
		    	forum.getAll().then(function(data){	
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
					$scope.pages.push({id: 0, topicsList: []});
		    		for(var i = 0, n = 0, p = 0; i < data.length; i++, n++)
		    		{
		    			if(n > 15)
		    			{
		    				$scope.pages.push({id: ++p, topicsList: []});
		    				n = 0;
		    			}
		    			var topic = data[i][0];
		    			topic.username = data[i][1];
	
		    			topic.lastComment = new Date(topic.lastComment);
		    			topic.diff = Math.abs($scope.dateCust - topic.lastComment);
		    			topic.diffStr = msToD(topic.diff);
		    			topic.lastComment = $filter("date")(topic.lastComment, "MMM d");
		    			
		    			$scope.pages[p].topicsList.push(topic);
		    		}
		    	});
	    	};
	    	
	    	$scope.refresh();
	    }],
	    templateUrl: "forum/forum-list-view_template.html"
	};
});