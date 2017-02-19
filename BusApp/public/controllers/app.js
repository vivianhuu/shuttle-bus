'use strict';

var myApp = angular.module('myApp', ['admin', 'ui.router', 'ngMap']);
myApp.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider){
	$stateProvider.state('main', {
		url: '/',
		templateUrl: 'view/main.html',
		controller: 'mainCtrl'
	})
	.state('searchResults', {
		url: '/searchResults/:start/:end',
		templateUrl: 'view/searchResults.html',
		controller: 'searchResultsCtrl'
	});
}])
.run(['$state', function ($state){
	$state.go('main');
}]);