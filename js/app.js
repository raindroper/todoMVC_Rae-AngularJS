(function (angular) {
  'use strict';
  //初始化angular
  //todoApp		模块
  //con			控制器
  //todoList	任务列表
  var app = angular.module("todoApp", ["serviceMOD"]);
  app.controller("con", ["$scope",
	"$log",
	"$location",
	"ser",
	"$window",
	function ($scope, $log, $location, ser, $window) {
	  $scope.todolists = ser.getLists();

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
		ser.back();
	  }


	  //清除已完成
	  $scope.clearCompleted = function () {
		ser.clearCompleted();
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

	  //显示状态
	  $scope.loac = $location;
	  $scope.$watch("loac.url()", function (n, o) {
		switch (n) {
			//未完成
		  case "/active":
			$scope.isCompleted = {complete: false};
			break;
			//已完成
		  case "/completed":
			$scope.isCompleted = {complete: true};
			break;
			//默认
		  default:
			$scope.isCompleted = {complete: undefined};
		}
	  })

	  //状态更改
	  $scope.saveChange = function () {
		ser.save();
	  }

	  //监听
	  var hasRem = $window.localStorage.getItem("hasRemove");
	  $scope.$watch(hasRem, function (newVal) {
		ser.clearRemoveList();
	  })
	}])


  // Your starting point. Enjoy the ride!

})(angular);
