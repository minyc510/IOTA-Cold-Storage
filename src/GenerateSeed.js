import React from 'react';
import './App.css';
import ReactTooltip from '../node_modules/react-tooltip';
import tipIcon from './images/toolTipIcon.png';
import { Button } from 'react-bootstrap';


var collectionPoints = 300; //Number of mouse-coordinates required

//Warning about Seed Generators
class WarningPage extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.onClick(2);
  }

  render() {
    return (
      <div>
        <div class="cautionStripes"></div>
        <div class="well" style={{height: '330px'}}>
          <h3>A Warning About Seed Generators</h3>
          <p style={{textAlign: 'left', marginLeft: '8px', fontSize: '120%'}}>
          <ul>
            <li>Seed Generators have been known in the past to be malicious and designed to steal your seeds (and in turn steal your IOTA tokens). </li>
            <li>This tool should only be used for testing purposes. However, if you do decide to use this to generate your seed (or any other generator) you should be sure to change a handful of characters manually.</li>
            <li>The most secure way to generate seeds is to manually come up with the 81 characters, making sure they are completely random.</li>
          </ul>
          </p>
        </div>
        <div class="cautionStripes"></div>

        <br></br>
        <Button bsStyle="danger" onClick={this.handleClick.bind(this)}>Continue</Button>
      </div>
    );
  }
}
//Collects entropy from mouse movements
class MouseBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { str: '' }
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  //Entropy Collection
  handleMouseMove(e) {
    if (this.props.collected < collectionPoints) {
      let mouseEntropy = (e.screenX + e.screenY);
      let tempStr = this.state.str + String.fromCharCode((e.screenX*e.screenY % 26)+65) + (e.screenX*e.screenY % 999);
      this.setState({str: tempStr});
      this.props.onMouseMove(this.props.collected+1, mouseEntropy);
    }
  }

  render() {
    return(
      <div>
        <h3 class="centerHeader">Entropy {Math.floor((this.props.collected / collectionPoints)*100)}%&nbsp;
          <a data-tip data-for='entropyTip'><img src={tipIcon} alt='?'width="20px"/></a>
        </h3>

        <ReactTooltip id='entropyTip' place="right" type="dark" effect="float">
          <p>Your mouse movements inside the box are recorded, and <br></br>
          used to help randomize your seed.</p>
        </ReactTooltip>

        <div class="mouseBox" onMouseMove={this.handleMouseMove.bind(this)}>
          <div class="mouseBoxText">{ this.state.str }</div>

        </div>
      </div>
    );
  }
}

class GenerateSeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 1,
      randArr: [],
      collected: 0,
    };
    this.mouseMove = this.mouseMove.bind(this);
    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage) {
    this.setState({ currPage: newPage });
  }

  generateSeed() {
    //Use plain javascript to create pseudo-random seed
    let psuedoRandSeed = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
    for (let i = 0; i < 81; i++) {
      psuedoRandSeed += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    let seed = '';
    //Use mouse-entropy to further randomize seed
    for (let i = 0; i < psuedoRandSeed.length; i++) {
      let randIndex = Math.floor(Math.random()*collectionPoints);
      let rollValue = this.state.randArr[randIndex];
      let asciiVal = psuedoRandSeed.charCodeAt(i) - 65;
      if (seed[i] === '9') { asciiVal = 91; }
      asciiVal = ((asciiVal + rollValue) % 27)+65;
      if (asciiVal === 91) { seed += '9' }
      else { seed += String.fromCharCode(asciiVal); }
    }
    return seed;
  }

  mouseMove(newCollected, newRandElt) {
    this.setState({ collected: newCollected, randArr: this.state.randArr.concat([newRandElt]) });
  }

  render() {
    let seed = '';
    if (this.state.collected === collectionPoints) { seed = this.generateSeed(); }
    return (
      <div>
          <p style={{fontSize: '120%'}}>
          Move your mouse around the box below, once enough entropy has been collected, your seed will be generated.
          </p>
        <MouseBox randArr={this.state.randArr} collected={this.state.collected} onMouseMove={this.mouseMove} />
        <br></br><br></br>
        <div class="seedBox">
          {seed}
        </div>
      </div>
    );
  }
}

export class GenerateSeedMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currPage: 1,
    };
    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage) {
    this.setState({ currPage: newPage });
  }

  render() {
    let page = null;
    if (this.state.currPage === 1) { page = <WarningPage onClick={this.changePage}/>; }
    else { page = <GenerateSeed />; }

    return (
      <div class="center">
        <h1>Generate Seed</h1>

        {page}
      </div>
    );
  }

}
