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
.controller('mainCtrl', ['$state', '$scope', function ($state, $scope){
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
}])
.controller('searchResultsCtrl', ['$state', '$scope', '$stateParams', '$http', '$location', function ($state, $scope, $stateParams, $http, $location){
	var start = $stateParams.start;
	var end = $stateParams.end;
	$scope.table = true;
	$http.get('/searchResults/'+start+'/'+end).then(function (response){
		if (response.status == 200 && response.data != null) {
			// var route = {};
			// route = response.data;
			//console.log(route);
			$scope.route = response.data;
			console.log($scope.route);
			// $scope.route.busno = route.busno;
			// $scope.route.start = route.start;
			// $scope.route.end = route.end;
			// $scope.route.timetables = route.timetables;
			$scope.message = "";
			var items = [];
			var j = $scope.route.timetables[0].periods.length;
			items[0] = {
				title: $scope.route.timetables[0].title,
				period: $scope.route.timetables[0].periods[0],
				interval: $scope.route.timetables[0].intervals[0]
			};
			// items[0].title = $scope.route.timetables[0].title;
			// items[0].period = $scope.route.timetables[0].periods[0];
			// items[0].interval = $scope.route.timetables[0].intervals[0];
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
}]);