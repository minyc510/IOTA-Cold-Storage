import React from 'react';
import './App.css';
import { Stage, Layer, Image, Text } from "react-konva";
import greyNetworkTemplate from './images/greyTemplate.png';
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

    if (length === 0) return null;
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
    this.state = { image: null };
  }

  componentDidMount() {
    const image = new window.Image();
    image.src = greyNetworkTemplate;

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
      text="Public Wallet Address:" fontSize="18" fontFamily="Courier New" fontStyle="bold"
      x="18"
      y="15"
    />

    var add0 = <Text
      text={this.props.add0} fontSize="13" fontFamily="Courier New"
      x="17"
      y="35"
    />

    var add1 = <Text
      text={this.props.add1} fontSize="13" fontFamily="Courier New"
      x="17"
      y="55"
    />

    var priv = <Text
      text="Private Seed:" fontColor="white" fontSize="18" fontFamily="Courier New" fontStyle="bold"
      x="18"
      y="75"
    />

    var seed0 = <Text
      text={this.props.seed0} fontSize="13" fontFamily="Courier New"
      x="17"
      y="95"
    />

    var seed1 = <Text
      text={this.props.seed1} fontSize="13" fontFamily="Courier New"
      x="17"
      y="115"
    />

    return (
        <div>
          <br></br>
          <h5 style={{fontWeight: 'bold'}}>Wallet Address:</h5>
          <h6>{this.props.fullAddress}</h6>
          <div className="walletTemplate">
            <Stage width={window.innerWidth} height={window.innerHeight}>
              <Layer>
                <WalletTemplate/>
                {pub}
                {priv}
                {add0}
                {add1}
                {seed0}
                {seed1}
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

          {/*Tool tips for Advanced Options*/}
          <ReactTooltip id='securityTip' place="right" type="dark" effect="float" style={{fontSize: '110%', }}>
            A higher security level makes it harder to brute-force a key-signature. <br></br>
            However, more PoW is required for transactions.
          </ReactTooltip>

          <ReactTooltip id='checksumTip' place="right" type="dark" effect="float" style={{fontSize: '110%', }}>
            Appends a 9-character 'checksum' to your address, this helps to ensure a user is sending to the correct address.
            When sending tokens to an address with a checksum,
            if the checksum does not match the address, the network will reject the transaction.
          </ReactTooltip>

          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

//Main PaperWallet Body
export class PaperWallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = { seed: '', address: '', security: 2, checksum: true};
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
    if (this.state.address !== '') {
      //Split up address for easy reading
      let rawAddress = this.state.address
      let newAdd = '';
      for (let i = 0; i < this.state.address.length/9; i++) {
          newAdd += rawAddress.substring((9*i), (9*i)+9);
          newAdd += ' '
      }
      let add0 = newAdd.substring(0, 50);
      let add1 = newAdd.substring(50, 100);
      //Split up seed for easy reading
      let rawSeed = this.state.seed
      let newSeed = '';
      for (let i = 0; i < this.state.seed.length/9; i++) {
          newSeed += rawSeed.substring((9*i), (9*i)+9);
          newSeed += ' '
      }
      let seed0 = newSeed.substring(0, 50);
      let seed1 = newSeed.substring(50, 100);
      image = <WalletImage fullAddress={this.state.address} add0={add0} add1={add1} seed0={seed0} seed1={seed1}/>;
     }

    return (
      <div>
        <h1 className="center">Paper Wallet Generator</h1>

        <div style={{paddingLeft:'7px'}}>
          <AdvOptPanel changeSecurity={this.changeSecurity} changeChecksum={this.changeChecksum}/>

          <SeedForm submit={this.handleSubmit} changeSecurity={this.changeSecurity} changeChecksum={this.changeChecksum}/>
        </div>

        {image}
      </div>
    );
  }
}
