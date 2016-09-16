// TodoTextInput

var React = require('react');
var ReactPropTypes = React.PropTypes;

var ENTER_KEY_CODE = 13;


var TodoTextInput = React.createClass({

	propTypes: {
		className: ReactPropTypes.string,
		id: ReactPropTypes.string,
		placeholder: ReactPropTypes.string,
		onSave: ReactPropTypes.func.isRequired,
		value: ReactPropTypes.string
	},

	// 初始化 state, state 为 input value
	getInitialState: function () {
		return {
			value: this.props.value || ''
		};
	},

	render: function () {
		return (
			<div className={this.props.className}>
				<a className="add-new" href="#">
					+<i className="fa fa-plus"></i>
				</a>
				<input 
					id={this.props.id}
					placeholder={this.props.placeholder}
					onBlur={this._save}
					onChange={this._onChange}
					onKeyDown={this._onKeyDown}
					value={this.state.value}
					autoFocus={true}
				/>
			</div>
		);
	},

	_save: function () {
		this.props.onSave(this.state.value);
		this.setState({
			value: ''
		});
	},

	_onChange: function (event) {
		this.setState({
			value: event.target.value
		})
	},

	_onKeyDown: function (event) {
		if (event.keyCode == ENTER_KEY_CODE) {
			this._save();
		}
	}
});

module.exports = TodoTextInput;