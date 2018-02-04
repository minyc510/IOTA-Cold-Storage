import React from 'react';
import './App.css';
import { Stage, Layer, Image } from "react-konva";
import template from './template.png'

var IOTA = require('../node_modules/iota.lib.js/lib/iota.js');

class WalletTemplate extends React.Component {
  state = { image: null };

  componentDidMount() {
    const image = new window.Image();
    image.src = template;
    image.onload = () => {
      this.setState({ image: image });
    };
  }

  render() {
    return <Image image={this.state.image} />;
  }
}



function WalletImage(props) {
  return (

      <div>
        <h3>Wallet Address: {props.a}</h3>
        <h3>Private Seed: {props.s}</h3>
        <div class="walletTemplate">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <WalletTemplate />
            </Layer>
          </Stage>
        </div>
      </div>

  );
}



export class PaperWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {seed: '', address: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) { this.setState({seed: event.target.value}); }

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
      options.security = 2;
      options.deterministic = "off";
      options.checksum = true;
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
    if (this.state.address !== '') {
      image = <WalletImage a={this.state.address} s={this.state.seed} />;
    }
    return (
      <div>
        <h2>Input a private seed to generate the corresponding address.</h2 >
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" value={this.state.seed} placeholder="Seeds must be 81 characters long and may consist only of A-Z and 9." onChange={this.handleChange} />
          </label>

          <input class="blueButton" type="submit" value="Get Address" />
          {image}
        </form>
      </div>
    );
  }
}
