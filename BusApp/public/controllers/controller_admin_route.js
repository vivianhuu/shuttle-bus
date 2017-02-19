'use strict';

angular.module('admin').controller('allRoutesCtrl',['$scope','$http', '$state', '$stateParams', 'popupSevice', function ($scope, $http, $state, $stateParams, popupSevice){
	console.log("hello world");

	//"get" request to the server
	$http.get('/admin/allRoutes').then(function (response){
		if (response.status == 200) {
			$scope.routes = response.data;
		} else {
			alert('Something wrong with server, please try again.');
			$state.transitionTo($state.current, $stateParams, {
				reload: true,
				inherit: false,
				notify: true
			});
		};
	});

	$scope.deleteRoute = function(route){
		if (popupSevice.showPopup('Really delete this route?')) {
			$http.post('/admin/allRoutes', {id: route._id}).then(function (response){
				console.log("hahaha");
				if (response.status == 200) {
					alert('Successfully delete the seleted route.');
					$state.transitionTo($state.current, $stateParams, {
						reload: true,
						inherit: false,
						notify: true
					});
				} else {
					alert('Something wrong with the server, please try again.');
					$state.transitionTo($state.current, $stateParams, {
						reload: true,
						inherit: false,
						notify: true
					});
				};
			});
		};
	};
}])
.controller('newPostCtrl', function ($state, $scope, $http, $stateParams, popupSevice){
	$scope.t1s = {periods: [], intervals: []};
	$scope.t2s = {periods: [], intervals: []};
	$scope.t11 = [], $scope.t22 = [];
	$scope.addt1 = function (){
		var t1 = {period: $scope.period, interval: $scope.interval};
		$scope.t1s.periods.push($scope.period);
		$scope.t1s.intervals.push($scope.interval);
		$scope.t11.push(t1);
		$scope.period = "";
		$scope.interval = "";
	};
	$scope.addt2 = function (){
		var t2 = {period: $scope.period2, interval: $scope.interval2};
		$scope.t2s.periods.push($scope.period2);
		$scope.t2s.intervals.push($scope.interval2);
		$scope.t22.push(t2);
		$scope.period2 = "";
		$scope.interval2 = "";
	};
	$scope.remove = function(item){
		if (popupSevice.showPopup('Are you sure to remove it?')) {
			for (var i = 0; i< $scope.t1s.periods.length; i++){
				if ($scope.t1s.periods[i] == item.period) {
					$scope.t1s.periods.splice(i,1);
					$scope.t1s.intervals.splice(i,1);
					$scope.t11.splice(i, 1);
				};
			};
		};
	};
	$scope.remove1 = function(item){
		if (popupSevice.showPopup('Are you sure to remove it?')) {
			for (var j = 0; j< $scope.t2s.periods.length; j++){
				if ($scope.t2s.periods[j] == item.period) {
					$scope.t2s.periods.splice(j,1);
					$scope.t2s.intervals.splice(j,1);
					$scope.t22.splice(j,1);
				};
			};
		};
	};
	$scope.saveRoute = function(){
		var route = {
			busno: $scope.title,
			start: $scope.start,
			end: $scope.end,
			timetables: [{
				title: "Every Monday to Friday",
				periods: $scope.t1s.periods,
				intervals: $scope.t1s.intervals
			},
			{
				title: "Every Weekend and Public Holidays",
				periods: $scope.t2s.periods,
				intervals: $scope.t2s.intervals
			}]
		};
		$http.post('/admin/new', {busno: route.busno, start: route.start, end: route.end, timetables: route.timetables}).then(function (response){
			if (response.status == 201) {
				alert('Successfully create new route!');
				$state.go('admin.postViewAll');
			} else {
				alert('Something wrong with the server, please try again.');
			};
		});
	};
	$scope.back = function (){
		if (popupSevice.showPopup('Are you sure to leave this page?')) {
			$state.go('admin.postViewAll');
		};
	};
})
.controller('postUpdateCtrl', function ($state, $stateParams, $http, $scope, popupSevice){
	$scope.id = $stateParams.id;
	$http.get('/admin/allRoutes/' + $scope.id).then(function (response){
		if (response.status == 200) {
			$scope.route = response.data;
			console.log($scope.route);
			$scope.t1s = [];
			$scope.t2s = [];
			for (var i = 0; i< $scope.route.timetables[0].periods.length; i++) {
				$scope.t1s[i] = {
					period: $scope.route.timetables[0].periods[i],
					interval: $scope.route.timetables[0].intervals[i]
				};
			};
			for (var j = 0; j <$scope.route.timetables[1].periods.length; j++) {
				$scope.t2s[j] = {
					period: $scope.route.timetables[1].periods[j],
					interval: $scope.route.timetables[1].intervals[j]
				};
			};
		} else {
			alert('Something wrong with server, please try again.');
			$state.transitionTo($state.current, $stateParams, {
				reload: true,
				inherit: false,
				notify: true
			});
		};
	});
	$scope.remove = function (item){
		if (popupSevice.showPopup('Are you sure to remove it?')) {
			for (var n = 0; n<$scope.t1s.length; n++) {
				if ($scope.t1s[n].period == item.period) {
					$scope.t1s.splice(n,1);
				};
			};
		};
	};
	$scope.remove1 = function(item){
		if (popupSevice.showPopup('Are you sure to remove it?')) {
			for (var m = 0; m<$scope.t2s.length; m++) {
				if ($scope.t2s[m].period == item.period) {
					$scope.t2s.splice(m,1);
				};
			};
			// var period2 = [];
			// var interval2 = [];
		 //    for (var b = 0; b<$scope.t2s.length; b++){
		 //    	period2[b] = $scope.t2s[b].period;
		 //    	interval2[b] = $scope.t2s[b].interval;
		 //    };
		};
	};
	$scope.updateRoute = function(){
		var period1 = [], period2 =[], interval1 = [], interval2 = [];
		for (var a = 0; a < $scope.t1s.length; a++){
			period1[a] = $scope.t1s[a].period;
			interval1[a] = $scope.t1s[a].interval;
		};
		for(var b = 0; b < $scope.t2s.length; b++){
			period2[b] = $scope.t2s[b].period;
			interval2[b] = $scope.t2s[b].interval;
		};
		$scope.route.timetables[0].periods = period1;
		$scope.route.timetables[0].intervals = interval1;
		$scope.route.timetables[1].periods = period2;
		$scope.route.timetables[1].intervals = interval2;
		$http.post('/admin/allRoutes/' + $scope.route._id, $scope.route).then(function (response){
			if (response.status == 201) {
				alert('Update route successfully.');
				$state.transitionTo($state.current, $stateParams, {
					reload: true,
					inherit: false,
					notify: true
				});
			} else {
				alert('Something wrong with server, please try again');
				$state.transitionTo($state.current, $stateParams, {
					reload: true,
					inherit: false,
					notify: true
				});
			};
		});
	};
	$scope.back = function(){
		$state.go('admin.postViewAll');
	};
});
		
