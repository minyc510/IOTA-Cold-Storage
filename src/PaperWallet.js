import React from 'react';
import './App.css';
import { Stage, Layer, Image, Text } from "react-konva";
import template from './images/plainTemplate.png';
import IOTA from '../node_modules/iota.lib.js/lib/iota.js';
import { FormGroup, FormControl, Button, Panel, Radio } from 'react-bootstrap';

class SeedForm extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = { value: '' };
  }

  getValidationState() {
    const seed = this.state.value;
    const length = this.state.value.length;

    if (length === 0) return '';
    if (seed.length !== 81) { return 'error'; }
    for (var i=0; i < 81; i++) {
      var currAscii = seed.charCodeAt(i);
      if ((currAscii < 65 && currAscii !== 57) || (currAscii > 90 && currAscii !== 57)) {
        return 'error';
      }
    }
    return 'success';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleClick(event) {
    this.props.submit(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div class="shortWidth">
      <form onSubmit={this.handleClick}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Seeds must be 81 characters long and may only consist of 'A'-'Z' and '9'."
            onChange={this.handleChange}
          />

          <FormControl.Feedback />
        </FormGroup>
        <Button type="submit" bsStyle="primary">Generate</Button>
      </form>
      </div>
    );
  }
}

class WalletTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null };
  }
  componentDidMount() {
    const image = new window.Image();
    image.src = template;
    image.onload = () => {
      this.setState({ image: image });
    };
  }
  render() { return <Image image={this.state.image} />; }
}

function WalletImage(props) {

    var pub = <Text
      text="Public Wallet Address:" fontSize="18" fontFamily="Courier New"
      x="15"
      y="35"
    />

    var priv = <Text
      text="Private Seed:" fontSize="18" fontFamily="Courier New"
      x="15"
      y="85"
    />

    var address = <Text
      text={props.a} fontSize="15" fontFamily="Courier New"
      x="14"
      y="55"
    />

    var seed = <Text
      text={props.s} fontSize="15" fontFamily="Courier New"
      x="14"
      y="105"
    />

    return (
        <div>
          <br></br>
          <h5 class="center">Wallet Address: {props.a}</h5>
          <div class="walletTemplate">
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                <WalletTemplate />
                {pub}
                {priv}
                {address}
                {seed}
              </Layer>
            </Stage>
          </div>
        </div>
    );
}

class AdvOptPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleSecurityChange = this.handleSecurityChange.bind(this);
    this.handleChecksumChange = this.handleChecksumChange.bind(this);
  }

  handleSecurityChange(event) {
    this.props.changeSecurity(parseInt(event.target.value, 10));
  }

  handleChecksumChange(event) {
    this.props.changeChecksum(event.target.checked === true ? true : false);
  }

  render() {
    return(
      <Panel bsStyle="primary" style={{width: '35%'}} id="collapsible-panel-example-2">
        <Panel.Heading>
          <Panel.Title toggle>Advanced Options</Panel.Title>
        </Panel.Heading>

        <Panel.Collapse>
          <Panel.Body>
            <span class="selectText">Security Level</span>

            <FormGroup style={{marginLeft: '2%'}} onChange={this.handleSecurityChange}>
              <Radio name="radioGroup" inline value='1'>
              1
              </Radio>{' '}
              <Radio name="radioGroup" inline value='2' defaultChecked>
              2
              </Radio>{' '}
              <Radio name="radioGroup" inline value='3'>
              3
              </Radio>
            </FormGroup>

            <FormGroup style={{marginLeft: '2%'}} onChange={this.handleChecksumChange}>
              <label>Append Checksum <input type="checkbox" defaultChecked/></label>
            </FormGroup>

          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export class PaperWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seed: '', address: '', security: 2, checksum: true };
    this.handleChange = this.handleChange.bind(this);
    this.changeSecurity = this.changeSecurity.bind(this);
    this.changeChecksum = this.changeChecksum.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({ seed: event.target.value }); }

  changeSecurity(secLevel) { this.setState({ security: secLevel }); }

  changeChecksum(checkSumBool) { this.setState({ checksum: checkSumBool }); }

  handleSubmit(seed) {
    this.setState({ seed: seed });
    // Validate seed-input
    //var seed = this.state.seed
    var valid = true;
    if (seed.length !== 81) { valid = false; }
    for (var i=0; i < 81; i++) {
      var currAscii = seed.charCodeAt(i);
      if ((currAscii < 65 && currAscii !== 57) || (currAscii > 90 && currAscii !== 57)) {
        valid = false;
        break;
      }
    }

    if (valid) {
      // Create IOTA instance with host and port as provider
      var iota = new IOTA({
      'host': 'http://localhost',
      'port': 14265
      });

      // Options is a parameter for getNewAddress()
      var options = {}
      options.security = this.state.security;
      options.deterministic = "off";
      options.checksum = this.state.checksum;
      options.total = 1;

      // Generate Address
      iota.api.getNewAddress(seed, options, (e, add) => {
        var newAdd = add[0];
        this.setState({address: newAdd});
      });

    }
    else {
      alert('Seed Invalid!');
    }

  }

  render() {
    let image = null;
    if (this.state.address !== '') { image = <WalletImage a={this.state.address} s={this.state.seed} />; }

    return (
      <div>
        <h1 class="centerHeader">Paper Wallet Generator</h1>

        <div style={{paddingLeft:'7px'}}>
          <AdvOptPanel changeSecurity={this.changeSecurity} changeChecksum={this.changeChecksum}/>
          <SeedForm submit={this.handleSubmit}/>
        </div>

        {image}
      </div>
    );
  }
}
