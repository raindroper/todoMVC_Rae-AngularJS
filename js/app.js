(function (angular) {
  'use strict';
  //初始化angular
  //todoApp		模块
  //con			控制器
  //todoList	任务列表
  var app = angular.module("todoApp", []);
  app.controller("con", function ($scope, $log) {
	$scope.todolists = [
	  {id: 5, name: "吃饭", complete: true, if: true},
	  {id: 4, name: "运动", complete: true, if: true},
	  {id: 3, name: "游戏", complete: false, if: true},
	  {id: 2, name: "喝水", complete: true, if: true},
	  {id: 1, name: "睡觉", complete: true, if: true},
	];

	$scope.hasrem = [];

	//添加任务
	//newItem	新添加的任务
	$scope.newItem = "";
	$scope.add = function () {
	  //newItem是否为空
	  if (!$scope.newItem) {
		return
	  }
	  //在前面添加newItem
	  $scope.todolists.unshift({
		id: $scope.todolists[$scope.todolists.length - 1].id - 0 + 1,
		name: $scope.newItem,
		complete: true
	  })
	  //置空newItem
	  $scope.newItem = "";
	}
	//删除任务
	$scope.isif = true;
	$scope.remove = function (item) {
	  item.if = false;
	  $scope.hasrem.push(item.id)
	  $log.log($scope.hasrem)
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
	  if($scope.hasrem.length === 0){
	    return
	  }
	  $scope.todolists[($scope.todolists.length - $scope.hasrem[$scope.hasrem.length-1])].if = true;
	  $scope.hasrem.pop();
	}
  })


  // Your starting point. Enjoy the ride!

})(angular);
