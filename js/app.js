(function (angular) {
  'use strict';
  //初始化angular
  //todoApp		模块
  //con			控制器
  //todoList	任务列表
  var app = angular.module("todoApp", ["serviceMOD"]);
  app.controller("con", ["$scope", "$log", "$location","ser", function ($scope, $log, $location,ser) {
	$scope.todolists = ser.getLists();

	$scope.hasrem = [];

	//添加任务
	//newItem	新添加的任务
	$scope.newItem = "";
	$scope.add = function () {
	  //newItem是否为空
	  if (!$scope.newItem) {
		return
	  }
	  ser.add($scope.newItem);
	  //置空newItem
	  $scope.newItem = "";
	}
	//删除任务
	$scope.remove = function (item) {
	  ser.remove(item);
	  $scope.hasrem.push(item.id);
	}


	//编辑任务
	$scope.edit = function (id) {
	  $scope.editId = id;
	}


	//保存任务
	$scope.save = function () {
	  $scope.editId = undefined;
	}

	//批量切换任务状态
	$scope.toggleAll = function () {
	  for (var i = 0; i < $scope.todolists.length; i++) {
		$scope.todolists[i].complete = $scope.selectAll;
	  }
	}


	//撤销
	$scope.cancel = function () {
	  if ($scope.hasrem.length === 0) {
		return
	  }
	  $scope.todolists[($scope.todolists.length - $scope.hasrem[$scope.hasrem.length - 1])].if = true;
	  $scope.hasrem.pop();
	}


	//清除已完成
	$scope.clearCompleted = function () {
	  for (var i = 0; i < $scope.todolists.length; i++) {
		if ($scope.todolists[i].complete) {
		  $scope.todolists[i].if = false;
		}
	  }
	}

	//剩余条目
	$scope.getActive = function () {
	  var count = 0;
	  for (var i = 0; i < $scope.todolists.length; i++) {
		var item = $scope.todolists[i]
		if (!item.complete && item.if) {
		  count++
		}
	  }
	  return count
	}


	// //显示已完成
	// $scope.showCompleted = function () {
	//   $scope.isCompleted = {complete : true}
	// }
	//
	// //显示未完成
	// $scope.showActive = function () {
	//   $scope.isCompleted = {complete : false}
	// }
	//
	// //显示全部
	//
	// $scope.showAll = function () {
	//   $scope.isCompleted = {}
	// }


	$scope.loac = $location;
	$scope.$watch("loac.url()", function (n, o) {
	  switch (n) {
		case "/active":
		  $scope.isCompleted = {complete: false};
		  break;
		case "/completed":
		  $scope.isCompleted = {complete: true};
		  break;
		default:
		  $scope.isCompleted = {complete: undefined};
	  }
	})
  }])


  // Your starting point. Enjoy the ride!

})(angular);
