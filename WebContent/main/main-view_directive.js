angular.module("main").directive("mainView", ["$location", function($location){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    templateUrl: "main/main-view_template.html",
	    controller: ["$scope", "$http", function forumCtrl($scope, $http){
	    	var baseURL = "http://localhost:8081/ForumBackEnd";
	    	$http.get(baseURL + "/Forum").then(function(response){
	    		var data = response.data;
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