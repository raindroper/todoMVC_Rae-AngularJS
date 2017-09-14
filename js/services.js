(function (angular) {
  var app = angular.module("serviceMOD", []);
  app.service("ser", ["$window", function ($win) {
	//获取数据
	var str = $win.localStorage.getItem("myTodo") || "[]";
	//格式化字符串
	var todoLists = JSON.parse(str);
	this.getLists = function () {
	  return todoLists;
	}

	//保存数据
	this.save = function () {
	  var str = JSON.stringify(todoLists);
	  $win.localStorage.setItem("myTodo",str);
	}


	//添加数据
	this.add = function (newItem) {
	  console.log(todoLists);
	  //在前面添加newItem
	  todoLists.unshift({
		id: (todoLists.length === 0 ? 1 : (todoLists[0].id - 0 + 1)),
		name: newItem,
		complete: false,
		if:true
	  })
	  this.save()
	}
  }])
})(angular)
