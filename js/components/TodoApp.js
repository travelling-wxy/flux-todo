// TodoApp

var React = require('react');
var Header = require('./Header');
var Footer = require('./Footer');
var Main = require('./Main');
var TodoStore = require('../stores/TodoStore');


// init data
function getTodoState() {
	var todos = TodoStore.getAll();
	return {
		allTodos: todos,
		areAllComplete: TodoStore.areAllComplete()
	};
}


var TodoApp = React.createClass({

	// 初始化 state
	getInitialState: function () {
		return getTodoState();
	},

	// 完成装载, 监听 view 变化
	componentDidMount: function () {
		TodoStore.addChangeListener(this._onChange);
	},

	// 卸载之前, 移除 view 监听
	componentWillUnmount: function () {
		TodoStore.removeChangeListener(this._onChange);
	},

	/* <Footer allTodos={this.state.allTodos} /> */
	render: function () {
		return (
			<div>
				<Header allTodos={this.state.allTodos} />
				<Main allTodos={this.state.allTodos} areAllComplete={this.state.areAllComplete} />
				<Footer allTodos={this.state.allTodos} />
			</div>
		);
	},

	// 调用 setState, 会自动调用 render 重新渲染 UI
	_onChange: function () {
		this.setState(getTodoState());
	}
});

module.exports = TodoApp;