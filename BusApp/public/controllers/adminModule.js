'use strict';

var admin = angular.module('admin', ['ui.router']);

admin.service('popupSevice', function ($window){
	this.showPopup = function (message){
		return $window.confirm(message);
	};
})
.config(['$stateProvider', '$locationProvider', function ($stateProvider, $locationProvider){
	$stateProvider.state('admin', {
		url: '/admin',
		abstract: true,
		templateUrl: 'view/admin-home.html'
	})
	.state('admin.postViewAll', {
		url: '/allRoutes',
		templateUrl: 'view/admin-all-posts.html',
		controller: 'allRoutesCtrl'
	})
	.state('admin.postNew', {
		url: '/new',
		templateUrl: 'view/admin-new-post.html',
		controller: 'newPostCtrl'
	})
	.state('admin.postUpdate', {
		url: '/allRoutes/:id',
		templateUrl: 'view/admin-update-post.html',
		controller: 'postUpdateCtrl'
	});
}]);