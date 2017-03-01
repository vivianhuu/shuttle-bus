'use strict';

angular.module('myApp').controller('loginCtrl', function ($scope, $http, $state, $location, $stateParams){
	$scope.show = true;
	$scope.login = function (name, password){
		if (name === null || password === null) {
			alert('please enter username and password.');
		} else {
			$http.get('/login/'+name+'/'+ password).then(function (response){
				if (response.status == 200) {
					$scope.show = false
					// location.href = 'view/admin-home.html';
					$state.go('admin.postViewAll');
				} else {
					alert('Invalid admin name or password!');
				};
			});
		};
	};
})
.controller('mainCtrl', ['$state', '$scope', 'NgMap', '$stateParams', function ($state, $scope, NgMap, $stateParams){
	$scope.give = function (){
		if ($scope.stop.s === $scope.stop.e) {
			alert("Please select different stations!");
		} else {
			$state.go('searchResults', {
				start: $scope.stop.s,
				end: $scope.stop.e
			});
		};
	};
	$scope.back = function(){
		$state.go('main');
	};
	NgMap.getMap().then(function (map){
		$scope.map = map;
	});
	$scope.positions = [{name: 'Siu Ching Mansion', lat: 22.3290164, lng: 114.1601938}, {name: 'Chun Fook Mansion', lat: 22.3028393, lng: 114.1701048}, {name: 'Hung Kwan House', lat: 22.3178049, lng: 114.1700263}];
	$scope.clickMarker = function(event, position){
		$state.go('showAll', {
			station: position.name
		});
	};
}])
.controller('searchResultsCtrl', ['$state', '$scope', '$stateParams', '$http', '$location', function ($state, $scope, $stateParams, $http, $location){
	var start = $stateParams.start;
	var end = $stateParams.end;
	$scope.table = true;
	$http.get('/searchResults/'+start+'/'+end).then(function (response){
		if (response.status == 200 && response.data != null) {
			$scope.route = response.data;
			console.log($scope.route);
			$scope.message = "";
			var items = [];
			var j = $scope.route.timetables[0].periods.length;
			items[0] = {
				title: $scope.route.timetables[0].title,
				period: $scope.route.timetables[0].periods[0],
				interval: $scope.route.timetables[0].intervals[0]
			};
			for(var i = 1; i<j; i++){
				items[i] = {
					title: "",
					period: $scope.route.timetables[0].periods[i],
					interval: $scope.route.timetables[0].intervals[i]
				};
			};
			items[j] = {
				title: $scope.route.timetables[1].title,
				period: $scope.route.timetables[1].periods[0],
				interval: $scope.route.timetables[1].intervals[0]
			};
			for (var d=1; d< $scope.route.timetables[1].periods.length; d++) {
				items[d+j] = {
					title: "",
					period: $scope.route.timetables[1].periods[d],
					interval: $scope.route.timetables[1].intervals[d]
				};
			};
			$scope.items = items;
		} else {
			$scope.table = false;
			$scope.message = "Sorry, no routes are found.";
		};
	});
}])
.controller('showAllCtrl', ['$state', '$scope', '$stateParams', '$http', '$location', function ($state, $scope, $stateParams, $http, $location){
	var station = $stateParams.station;
	$scope.findone = true;
	$http.get('/relativeRoutes/' + station).then(function (response){
		if (response.status == 200 && response.data != null) {
			$scope.findone = true;
			$scope.showDetail = false;
			$scope.routes = response.data;
			$scope.message = "";
			$scope.items = [];
			for(var i = 0; i < $scope.routes.length; i++){
				$scope.routes[i].num = i + 1;
				var items = [];
				var j = $scope.routes[i].timetables[0].periods.length;
				items[0] = {
					title: $scope.routes[i].timetables[0].title,
					period: $scope.routes[i].timetables[0].periods[0],
					interval: $scope.routes[i].timetables[0].intervals[0]
				};
				for(var a = 1; a<j; a++){
					items[a] = {
						title: "",
						period: $scope.routes[i].timetables[0].periods[i],
						interval: $scope.routes[i].timetables[0].intervals[i]
					};
				};
				items[j] = {
					title: $scope.routes[i].timetables[1].title,
					period: $scope.routes[i].timetables[1].periods[0],
					interval: $scope.routes[i].timetables[1].intervals[0]
				};
				for (var d=1; d< $scope.routes[i].timetables[1].periods.length; d++) {
					items[d+j] = {
						title: "",
						period: $scope.routes[i].timetables[1].periods[d],
						interval: $scope.routes[i].timetables[1].intervals[d]
					};
				};
				$scope.items.push(items);
			};
		} else {
			$scope.findone = false;
			$scope.message = "Sorry, no routes contains " + station + "!";
		};
	});
}]);