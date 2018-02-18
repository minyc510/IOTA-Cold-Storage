import React from 'react';
import './App.css';
import { Stage, Layer, Image, Text } from "react-konva";
import ToggleButton from 'react-toggle-button';
import template from './images/plainTemplate.png';//
import IOTA from '../node_modules/iota.lib.js/lib/iota.js'

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
          <h5>Wallet Address: {props.a}</h5>
          <br></br>
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

class AdvancedOptions extends React.Component {
  constructor(props) {
    super(props);
    this.handleSecurityChange = this.handleSecurityChange.bind(this);
    this.handleChecksumChange = this.handleChecksumChange.bind(this);
  }

  handleSecurityChange(event) {
    this.props.changeSecurity( parseInt(event.target.value, 10) );
  }

  handleChecksumChange(event) {
    this.props.changeChecksum( event.target.value === 'true' ? true : false );
  }

  render() {
    return (
      <div class="advancedOptions">
        <label>
          <span class="selectText">Security Level</span>
          <select onChange={this.handleSecurityChange}>
            <option value='1'>1</option>
            <option value='2' selected="selected">2</option>
            <option value='3'>3</option>
          </select>
        </label>
        <br></br><br></br>

        <label>
          <span class="selectText">Checksum</span>
          <select onChange={this.handleChecksumChange}>
            <option value='true'>true</option>
            <option value='false'>false</option>
          </select>
        </label>
        <br></br>
      </div>
    );
  }
}

export class PaperWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seed: '', address: '', advanced: false, security: 2, checksum: true };
    this.handleChange = this.handleChange.bind(this);
    this.changeSecurity = this.changeSecurity.bind(this);
    this.changeChecksum = this.changeChecksum.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({ seed: event.target.value }); }

  changeSecurity(secLevel) { this.setState({ security: secLevel }); }

  changeChecksum(checkSumBool) { this.setState({ checksum: checkSumBool }); }

  handleSubmit(event) {
    // Validate seed-input
    var seed = this.state.seed
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

    event.preventDefault();
  }

  render() {
    let image = null;
    let advOpt = null;
    if (this.state.address !== '') { image = <WalletImage a={this.state.address} s={this.state.seed} />; }
    if (this.state.advanced) { advOpt = <AdvancedOptions changeSecurity={this.changeSecurity} changeChecksum={this.changeChecksum}/>; }

    return (
      <div>
        <h1 class="centerHeader">Paper Wallet Generator</h1>
        <div class="inline">
          <h3>Advanced Options</h3>
        </div>

        <ToggleButton
          value={ this.state.advanced }
          activeLabel="ON"
          inactiveLabel="OFF"
          onToggle={(value) => {
            this.setState({
              advanced: !this.state.advanced,
            })
          }}
           />

        <br></br>
        {/*Advanced Options*/}
        {advOpt}
        {/*Seed Submit*/}
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.seed} placeholder=" Seeds must be 81 characters long and may consist only of A-Z and 9." onChange={this.handleChange} />
          </label>
          <br></br>
          <input class="blueButton" type="submit" value="Get Address" />
          {image}
        </form>
      </div>
    );
  }
}
