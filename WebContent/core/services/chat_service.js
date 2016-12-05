angular.module("services").factory("chat", ["$http", "$q", "$timeout", function($http, $q, $timeout){
	var baseURL = "http://localhost:8081/ForumBackEnd";
	var service = {};
	var listener = $q.defer();
	var socket = {client: null, stomp: null};
	
	service.RECONNET_TIMEOUT = 30000;
	service.SOCKET_URL = "/ForumBackEnd/chat_group";
	service.CHAT_TOPIC = "/topic/message";
	service.CHAT_BROKER = "/app/chat_group";
	
	service.receive = function(){return listener.promise;};
	service.send = function(id, message)
	{
		socket.stomp.send(service.CHAT_BROKER,
				{priority: 9},
				JSON.stringify({senderID: id, content : message}));
	};
	var getMessage = function(data)
	{
		var message = JSON.parse(data);
		message.time = new Date(message.time);
		return message;
	}
	var startListener = function()
	{
		socket.stomp.subscribe(service.CHAT_TOPIC,
				function(data){listener.notify(getMessage(data.body));});
	};
	var reconnect = function(){$timeout(function(){initialize();}, this.RECONNECT_TIMEOUT);};
	var initialize = function()
	{
		socket.client = new SockJS(service.SOCKET_URL);
		socket.stomp = Stomp.over(socket.client);
		socket.stomp.connect({}, startListener);
		socket.stomp.onclose = reconnect;
	};
	initialize();
	return service;
}]);