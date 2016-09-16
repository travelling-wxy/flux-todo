// TodoAction

var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('./TodoConstants');


var TodoActions = {

	create: function (text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_CREATE,
			text: text
		});
	},

	// 待实现：双击修改 TDOO
	updateText: function (id, text) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_UPDATE_TEXT,
			id: id,
			text: text
		});
	},

	destroyCompleted: function () {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY_COMPLETED
		});
	},

	destroy: function (id) {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_DESTROY,
			id: id
		});
	},

	toggleComplete: function (todo) {
		var id = todo.id;
		var actionType = todo.complete ? 
			TodoConstants.TODO_UNDO_COMPLETE :
			TodoConstants.TODO_COMPLETE;

		AppDispatcher.dispatch({
			actionType: actionType,
			id: id
		});
	},

	// 待实现：一次性转换所有 TODO 为 completed
	toggleCompleteAll: function () {
		AppDispatcher.dispatch({
			actionType: TodoConstants.TODO_TOGGLE_COMPLETE_ALL
		});
	}
};

module.exports = TodoActions;