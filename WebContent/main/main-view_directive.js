angular.module("main").directive("mainView", ["$location", function($location){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    templateUrl: "main/main-view_template.html",
	    controller: ["$scope", "forum", function forumCtrl($scope, forum){
	    	forum.getAll().then(function(data){
	    		$scope.topicsList = [];
		    	$scope.go = function(path){$location.path(path);};
	    		
		    	for(var i = 0; i < data.length && i < 16; i++)
	    		{
	    			var topic = data[i][0];
	    			topic.username = data[i][1];
	    			$scope.topicsList.push(topic);
	    		}
	    	});	
	    }]
	};
}]);