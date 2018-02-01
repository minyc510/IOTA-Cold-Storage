import React from 'react';
import './App.css';
import ReactTooltip from '../node_modules/react-tooltip';
import tipIcon from './toolTipIcon.png';

var collectionPoints = 300; //Number of mouse-coordinates required



export class GenerateSeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      randArr: [],
      collected: 0,
      seed:''
    };
    this.handleClick = this.handleClick.bind(this);
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

  //Entropy Collection
  handleMouseMove(e) {
    if (this.state.collected < collectionPoints) {
      let mouseEntropy = (e.screenX + e.screenY);
      this.setState({ x: '('+e.screenX+')', y: '('+e.screenY+')', randArr: this.state.randArr.concat([mouseEntropy]) , collected: this.state.collected+1});
    }
    else {
      this.setState({ x: '', y: '' });
    }
  }

  render() {
    let seedImage = null;
    if (this.state.seed !== '') {
      seedImage = <h3>Seed: {this.state.seed}</h3>
    }

    return (
      <div>
        <h2 class="mouseBoxHeader">Entropy Collection Box [{Math.floor((this.state.collected / collectionPoints)*100)}%]&nbsp;
          <a data-tip data-for='entropyTip'><img src={tipIcon} width="20px"/></a>
        </h2>

        <ReactTooltip id='entropyTip' place="right" type="dark" effect="float">
          <p>Your mouse movements inside the box are recorded, and </p>
          <p>used to help randomize your seed.</p>
        </ReactTooltip>

        <div class="mouseBox" onMouseMove={this.handleMouseMove.bind(this)}>
          <div class="mouseBoxText1">{ this.state.x }</div>
          <div class="mouseBoxText2">{ this.state.y }</div>
        </div>

        <button onClick={this.handleClick} class="button"> Generate New Seed </button>
        {seedImage}

      </div>
    );
  }
}
