// TodoItem

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoAction');
var TodoTextInput = require('./TodoTextInput');

var classNames = require('classnames');


var TodoItem = React.createClass({

	propTypes: {
		todo: ReactPropTypes.object.isRequired
	},

	getInitialState: function () {
		return {
			isEditing: false
		};
	},

	render: function () {
		var todo = this.props.todo;
		var input;
		if (this.state.isEditing) {
		 	input = <TodoTextInput id="todo-text" className="new-task" placeholder="New task" onSave={this._onSave} />;
		}
		
		return (
			<li
			    className={classNames({
					'done': todo.complete,
		 			'editing': this.state.isEditing,
		 			'row': 'row'
		 		})}
				key={todo.id}>
				<a className="remove" href="#" onClick={this._onClearOneClick}>
					x<i className="fa fa-trash-o"></i>
				</a>
				<a className="completed" href="#" onClick={this._onToggleComplete}>
					✔️<i className="fa fa-check"></i>
				</a>
				<div className="view"></div>
				<label>{todo.text}</label>
				{input}
			</li>
		);
	},

	// _onDoubleClick: function () {
	// 	this.setState({
	// 		isEditing: true
	// 	})
	// },

	_onToggleComplete: function () {
		TodoActions.toggleComplete(this.props.todo)
	},

	_onClearOneClick: function () {
		TodoActions.destroy(this.props.todo.id);
	}
});

module.exports = TodoItem;