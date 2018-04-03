import React from 'react';
import './App.css';
import { Button, Glyphicon } from 'react-bootstrap';

class Page1 extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);

  }

  handleClick() {
    this.props.onClick(2);
  }

  render() {
    return (
      <div class="center">
        <h1>IOTA Paper Wallet Generator</h1>
        <h4>Use your web browser to generate a paper wallet for IOTA. </h4>
        <h5>Please take caution to ensure your IOTA tokens will be safe when using this tool.</h5>
        <br></br>
        <Button bsStyle="primary" onClick={this.handleClick.bind(this)}><Glyphicon glyph="send" /> Start</Button>
        <br></br><br></br>
      </div>
    );
  }
}

class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.inPage = this.inPage.bind(this);
    this.exPage = this.exPage.bind(this);

  }

  inPage(page) {
    this.props.inPage(page);
  }

  exPage(page) {
    this.props.exPage(page);
  }

  render() {
    return (
      <div>
        <h1 class="center">First, You Need a Seed</h1>
        <h3 class="bold">Whats an IOTA seed?</h3>
        <p class="infoBox"><b>An IOTA seed is like a master password required to spend your funds</b>.
         We use them to generate IOTA addresses,
         where all funds sent to those addresses can be spent using that seed.
         A seed is exactly 81 characters long, and can only consist of ('A'-'Z') and '9'.
         Note all alphanumeric characters must be upper-case.
        </p>
        <p class="infoBox">You should keep your IOTA seed safe! Anyone who has your seed can use it to steal your funds.
        It is analagous to a Bitcoin, Ether, or any other traditional block-chain cryptocurrency private key.
        </p>

        <br></br><br></br>
        <div class="center">
          <Button bsStyle="primary" onClick={this.exPage.bind(this, 'Paper Wallet')}><Glyphicon glyph="ok" /> I have my own seed</Button>{' '}
          <Button bsStyle="primary"><Glyphicon glyph="leaf" /> I need a seed</Button>
          <br></br><br></br>
          <div class="back">
            <Button bsStyle="success" onClick={this.inPage.bind(this, 1)}><Glyphicon glyph="chevron-left" /> Back</Button>
          </div>
        </div>
      </div>
    );
  }
}

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currPage: 1 };
    this.changeInternalPage = this.changeInternalPage.bind(this);
    this.changeExternalPage = this.changeExternalPage.bind(this);
  }

  //Internal page refers to the page within the Home class
  changeInternalPage(newPage) {
    this.setState({ currPage: newPage });
  }

  //External page refers to the page within the entire App
  changeExternalPage(page) {
    this.props.onClick(page);
  }

  render() {
    let page = null;
    if (this.state.currPage === 1) {
      page = <Page1 onClick={this.changeInternalPage} />;
    }
    if (this.state.currPage === 2) {
      page = <Page2 inPage={this.changeInternalPage} exPage={this.changeExternalPage}/>;
    }

    return (
      <div>
        {page}
      </div>
    );
  }

}
