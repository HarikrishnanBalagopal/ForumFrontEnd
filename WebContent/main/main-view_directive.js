angular.module("main").directive("mainView", ["$location", function($location){
	return {
	    restrict: 'A',
	    scope: {commonData: "="},
	    templateUrl: "main/main-view_template.html",
	    controller: ["$scope", "user", "forum", "chat", function forumCtrl($scope, user, forum, chat){
	    	$scope.messages = [];
	    	$scope.max = 160;
	    	$scope.sendMessage = function(){chat.send($scope.commonData.user.id || -1, $scope.message); $scope.message = "";};
	    	$scope.go = function(path){$location.path(path);};

	    	chat.receive().then(null, null, function(message){
	    		user.getByID(message.senderID).then(function(data){
	    			message.username = data.username;
	    			$scope.messages.push(message);
	    		});
	    	});
	    	forum.getAll().then(function(data){
	    		$scope.topicsList = [];
	    		
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