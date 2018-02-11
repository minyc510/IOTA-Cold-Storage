import React from 'react';
import './App.css';
import ReactTooltip from '../node_modules/react-tooltip';
import tipIcon from './images/toolTipIcon.png';

var collectionPoints = 490; //Number of mouse-coordinates required

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
        <h2 class="mouseBoxHeader">Entropy Collection Box [{Math.floor((this.props.collected / collectionPoints)*100)}%]&nbsp;
          <a data-tip data-for='entropyTip'><img src={tipIcon} alt='?'width="20px"/></a>
        </h2>

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


export class GenerateSeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      randArr: [],
      collected: 0,
      seed:''
    };
    this.handleClick = this.handleClick.bind(this);
    this.mouseMove = this.mouseMove.bind(this);
  }

  //Generate Seed Button
  handleClick() {
    if (this.state.collected < collectionPoints) { alert('Collect more entropy first! Hover your mouse around in the box.'); return; }
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

    this.setState( { seed: seed } );
  }

  mouseMove(newCollected, newRandElt) {
    this.setState({ collected: newCollected, randArr: this.state.randArr.concat([newRandElt]) });
  }

  render() {
    return (
      <div>
        <MouseBox randArr={this.state.randArr} collected={this.state.collected} onMouseMove={this.mouseMove} />
        <button onClick={this.handleClick} class="gsButton"> Generate Seed </button>
        <br></br><br></br>
        <div class="seedBox">
          {this.state.seed}
        </div>
      </div>
    );
  }
}
