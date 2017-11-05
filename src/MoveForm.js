import React, { Component } from 'react';

class MoveForm extends Component {
  constructor(props) {
    super(props);

    this.state = { value: '' };

    this.onInputChange = this.onInputChange.bind(this);
    this.handleMove = this.handleMove.bind(this);
  }

  onInputChange(event) {
    this.setState({ value: event.target.value});
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleMove}>
          <input value={this.state.value} onChange={this.onInputChange} />
          <button>Move</button>
        </form>
      </div>
    );
  }

  handleMove(event) {
    event.preventDefault();
    this.props.handleMove(this.state.value);
  }
}

export default MoveForm;
