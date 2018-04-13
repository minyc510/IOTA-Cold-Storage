import React from 'react';
import './App.css';
import { Stage, Layer, Image, Text } from "react-konva";
import greyNetworkTemplate from './images/greyTemplate.png';
import plainWhiteTemplate from './images/plainTemplate.png';

import ReactTooltip from '../node_modules/react-tooltip';

import IOTA from '../node_modules/iota.lib.js/lib/iota.js';
import { FormGroup, FormControl, Button, Panel, Radio, Table } from 'react-bootstrap';

//Form for seed input, uses React-Bootstrap forms
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
      <div className="shortWidth">
      <form onSubmit={this.handleClick}>
        <FormGroup
          controlId="formBasicText"
          validationState={this.getValidationState()}
        >
          <FormControl
            type="text"
            value={this.state.value}
            placeholder="Input seed. Must be 81 characters long and may only consist of 'A'-'Z' and '9'."
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

//Paper Wallet Art here
class WalletTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = { image: null, theme: this.props.theme };
  }

  componentDidMount() {
    const image = new window.Image();
    if (this.state.theme === 'greyNetwork') { image.src = greyNetworkTemplate; }
    if (this.state.theme === 'plainWhite') { image.src = plainWhiteTemplate; }

    image.onload = () => {
      this.setState({ image: image });
    };
  }
  render() {
    return <Image image={this.state.image} />; }
}

class WalletImage extends React.Component {
    render() {

    var pub = <Text
      text="Public Wallet Address:" fontSize="18" fontFamily="Courier New"
      x="18"
      y="35"
    />

    var priv = <Text
      text="Private Seed:" fontColor="white" fontSize="18" fontFamily="Courier New"
      x="18"
      y="85"
    />

    var address = <Text
      text={this.props.a} fontSize="15" fontFamily="Courier New"
      x="17"
      y="55"
    />

    var seed = <Text
      text={this.props.s} fontSize="15" fontFamily="Courier New"
      x="17"
      y="105"
    />

    return (
        <div>
          <br></br>
          <h5>Wallet Address: {this.props.a}</h5>
          <div className="walletTemplate">
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                <WalletTemplate theme={this.props.theme}/>
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
}

//Advanced Options
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
      <Panel bsStyle="primary" style={{width: '85%'}} id="collapsible-panel-example-2">
        <Panel.Heading>
          <Panel.Title toggle>Advanced Options</Panel.Title>
        </Panel.Heading>

        <Panel.Collapse>
          <Panel.Body style={{paddingBottom: '0px'}}>
          <p>Default values are reccommended.</p>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th data-tip data-for='securityTip'>Security Level</th>
                <th data-tip data-for='checksumTip'>Append Checksum</th>

                <ReactTooltip id='securityTip' place="right" type="dark" effect="float">
                  <div style={{fontSize: '110%'}}>A higher security level makes it harder to brute-force a key-signature. <br></br>
                  However, more PoW is required for transactions.</div>
                </ReactTooltip>

                <ReactTooltip id='checksumTip' place="right" type="dark" effect="float">
                  <div style={{fontSize: '110%', }}>Adds a 9-character 'checksum' to your address. When sending tokens to an address with a checksum,
                  if the checksum does not match the address, the network will reject the transaction.
                  A checksum helps to ensure a user is sending to the correct address.</div>
                </ReactTooltip>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
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
                </td>
                <td>
                  <FormGroup style={{marginLeft: '1%'}} onChange={this.handleChecksumChange}>
                    <input type="checkbox" defaultChecked/>
                  </FormGroup>
                </td>
              </tr>
            </tbody>
          </Table>
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}
/*
class ThemeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleThemeChange = this.handleThemeChange.bind(this);
  }

  handleThemeChange(event) { this.props.changeTheme(event.target.value); }

  render() {
    return (
      <div>
        <b style={{marginRight:'4px'}}>Wallet Theme</b>

        <select onChange={this.handleThemeChange}>
          <option value='greyNetwork'>Grey Network</option>
          <option value='plainWhite'>Plain White</option>
          <option value='blue'>Blue</option>
          <option value='grid'>Grid</option>
        </select>
      </div>
    );
  }
}
*/

//Main PaperWallet Body
export class PaperWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seed: '', address: '', security: 2, checksum: true, theme: 'greyNetwork' };
    this.handleChange = this.handleChange.bind(this);
    this.changeSecurity = this.changeSecurity.bind(this);
    this.changeChecksum = this.changeChecksum.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({ seed: event.target.value }); }

  changeSecurity(secLevel) { this.setState({ security: secLevel }); }

  changeChecksum(checkSumBool) { this.setState({ checksum: checkSumBool }); }

  changeTheme(newTheme) { this.setState({ theme: newTheme }); }

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
    if (this.state.address !== '') { image = <WalletImage a={this.state.address} s={this.state.seed} theme={this.state.theme}/>; }

    return (
      <div>
        <h1 className="center">Paper Wallet Generator</h1>

        <div style={{paddingLeft:'7px'}}>
          <AdvOptPanel changeSecurity={this.changeSecurity} changeChecksum={this.changeChecksum}/>
          {/*<ThemeSelect changeTheme={this.changeTheme}/>*/}

          <SeedForm submit={this.handleSubmit} changeSecurity={this.changeSecurity} changeChecksum={this.changeChecksum}/>
        </div>

        {image}
      </div>
    );
  }
}
