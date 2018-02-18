import React from 'react';
import './App.css';
import { Button, Glyphicon } from 'react-bootstrap';

export class Opener extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page) {
    this.props.onClick(page);
  }

  render() {
    return (
      <div class="centerDiv">
        <h1>IOTA Paper Wallet Generator</h1>
        <h4>Use your web browser to generate a paper wallet for IOTA. </h4>
        <br></br>
        <Button bsStyle="primary" onClick={this.handleClick.bind(this, 'Paper Wallet')}><Glyphicon glyph="send" /> Start</Button>

      </div>
    );
  }

}
