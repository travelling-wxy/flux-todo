// Main

var React = require('react');
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoAction');
var TodoItem = require('./TodoItem');


var Main = React.createClass({

	propTypes: {
		allTodos: ReactPropTypes.object.isRequired,
		areAllComplete: ReactPropTypes.bool.isRequired
	},

	render: function () {
		if (Object.keys(this.props.allTodos).length < 1) {
			return null;
		}

		var allTodos = this.props.allTodos;
		var todos = [];

		for (var key in allTodos) {
			todos.push(<TodoItem key={key} todo={allTodos[key]} />);
		}

		return (
			<ul>
				{todos}
			</ul>
		);
	}
});

module.exports = Main;