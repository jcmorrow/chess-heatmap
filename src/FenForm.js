import React, { Component } from 'react';

class FenForm extends Component {
  constructor(props) {
    super(props);

    this.state = { value: props.value };

    this.onInputChange = this.onInputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  render() {
    return (
      <div>
        <form className="pure-form" onSubmit={this.onSubmit} >
          <label htmlFor="fen">FEN
            <input name="fen" value={this.state.value} onChange={this.onInputChange} />
          </label>
        </form>
      </div>
    );
  }

  onInputChange(event) {
    this.setState({ value: event.target.value});
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.handleFenChange(this.state.value);
  }
}

export default FenForm;
