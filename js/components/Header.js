// Header

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoTextInput = require('./TodoTextInput');
var TodoActions = require('../actions/TodoAction');


var Header = React.createClass({

	propTypes: {
		allTodos: ReactPropTypes.object.isRequired
	},

	getInitialState: function () {
		return {
			isEditing: false
		};
	},

	render: function () {
		var allTodos = this.props.allTodos;
		var total = Object.keys(allTodos).length;

		var input;
		if (this.state.isEditing || !total) {
			input = <TodoTextInput id="todo-text" className="new-task" placeholder="New task" onSave={this._onSave} />;
		}

		return (
			<header className="container">
				<div className="add" onClick={this._onAdd}>
					+<i className="fa fa-plus"></i>
				</div>	
				<div className="title">
					<h1>Things to do</h1>
				</div>
				{input}
			</header>
		);
	},

	_onAdd: function () {
		this.setState({isEditing: true});
	},

	_onSave: function (text) {
		if (text.trim()) {
			TodoActions.create(text);
		}
	}
});

module.exports = Header;