(function (angular) {
  var app = angular.module("serviceMOD", []);
  app.service("ser", ["$window", function ($win) {
	//获取数据
	var str = $win.localStorage.getItem("myTodo") || "[]";
	//初始化已移除列表
	var removeStr = $win.localStorage.getItem("removeList") || "[]";
	var hasRemove = JSON.parse(removeStr);
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

	//保存已删除缓存列表
	this.saveRemoveList = function () {
	  var removeStr = JSON.stringify(hasRemove);
	  $win.localStorage.setItem("hasRemove",removeStr)
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


	//删除数据
	this.remove = function (item) {
	  todoLists[todoLists.length-item.id].if = false;
	  // item.if = false;
	  this.save();
	  hasRemove.push(item.id);
	  this.saveRemoveList();
	}

	//清除已完成
	this.clearCompleted = function () {
	  for (var i = 0; i < todoLists.length; i++) {
		if (todoLists[i].complete && todoLists[i].if) {
		  todoLists[i].if = false;
		  hasRemove.push(todoLists[i].id)
		  this.saveRemoveList();
		}
	  }
	  this.save();
	}


	//撤销功能
	this.back = function () {
	  if(hasRemove.length === 0){
	    return
	  }
	  todoLists[(todoLists.length - hasRemove[hasRemove.length - 1])].if = true;
	  this.save();
	  hasRemove.pop();
	  this.saveRemoveList();
	}


	//撤销缓存最大10条
	//   if(hasRemove.length >= 10){
	//     hasRemove.shift();
	// 	this.saveRemoveList();
	//   }
  }])
})(angular)
