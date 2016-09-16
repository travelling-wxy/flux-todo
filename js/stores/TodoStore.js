// TodoStore

var React = require('react');
var assign = require('object-assign');
var EventEmitter = require('events').EventEmitter;
var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoConstants = require('../actions/TodoConstants');

// mock data
var _todos = {
	1: {id: 1, complete: false, text: 'test 1'},
	2: {id: 2, complete: false, text: 'test 2'}
};

var CHANGE_EVENT = 'change';


function create(text) {
	// Using the current timestamp + random number in place of a real id.
    var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
    _todos[id] = {
    	id: id,
    	complete: false,
    	text: text
    };
}

function update(id, updates) {
	_todos[id] = assign({}, _todos[id], updates);
}

function updateAll(updates) {
	for (var id in _todos) {
		update(id, updates);
	}
}

function destroy(id) {
	delete _todos[id];
}

function destroyCompleted() {
	for (var id in _todos) {
		if (_todos[id].complete) {
			destroy(id);
		}
	}
}


AppDispatcher.register(function(action) {
	var text;

	switch(action.actionType) {
		case TodoConstants.TODO_CREATE:
			text = action.text.trim();
			if (text !== '') {
				create(text);
				TodoStore.emitChange();
			}
			break;

		// 待实现
		case TodoConstants.TODO_TOGGLE_COMPLETE:
			if (TodoStore.areAllComplete()) {
				updateAll({ complete: false });
			} else {
				updateAll({ complete: true });
			}
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_UNDO_COMPLETE:
			update(action.id, { complete: false });
			TodoStore.emitChange();
			break;

		case TodoConstants.TODO_COMPLETE:
			update(action.id, { complete: true });
			TodoStore.emitChange();
			break;

		// 待实现
		case TodoConstants.TODO_UPDATE_TEXT:
			text = action.text.trim();
			if (text !== '') {
				update(action.id, { text: text });
				TodoStore.emitChange();
			}
			break;

		case TodoConstants.TODO_DESTROY:
      		destroy(action.id);
      		TodoStore.emitChange();
      		break;

    	case TodoConstants.TODO_DESTROY_COMPLETED:
      		destroyCompleted();
      		TodoStore.emitChange();
      		break;

    	default: console.log('default');
	}
});


var TodoStore = assign({}, EventEmitter.prototype, {

	getAll: function () {
		return _todos;
	},

	areAllComplete: function () {
		for (var id in _todos) {
			if (!_todos[id].complete) {
				return false;
			}
		}
		return true;
	},

	emitChange: function (callback) {
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function (callback) {
		this.on(CHANGE_EVENT, callback);
	},

	removeChangeListener: function (callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}
});

module.exports = TodoStore;