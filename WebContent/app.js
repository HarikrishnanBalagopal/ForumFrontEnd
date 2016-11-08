var app = angular.module("forumApp", ["ngRoute", "mainView", "forum"]);
app.config(['$locationProvider', '$routeProvider',
            function config($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!');

    $routeProvider.
      when("/Home", {template: "<div data-main-view></div>"}).
      when("/Forum", {template: "<div data-forum-list></div>"}).
      otherwise('/Home');
  }
]);