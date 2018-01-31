import React from 'react';
import './App.css';

var collectionPoints = 300;

export class GenerateSeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, randArr: [], collected: 0, seed:'' };
    this.handleClick = this.handleClick.bind(this);
  }

  //Generate Seed Button
  handleClick() {
    if (this.state.collected < collectionPoints) { alert('Collect more entropy first!'); return; }
    //Use plain javascript to create pseudo-random seed
    let psuedoRandSeed = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ9";
    for (let i = 0; i < 81; i++) {
      psuedoRandSeed += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    let seed = '';
    //Use mouse-entropy to further randomize seed
    for (let i = 0; i < psuedoRandSeed.length; i++) {
      let randIndex = Math.floor(Math.random()*collectionPoints); //random number from 0 to 499
      let rollValue = this.state.randArr[randIndex];
      let asciiVal = psuedoRandSeed.charCodeAt(i) - 65;
      if (seed[i] === '9') { asciiVal = 91; }
      asciiVal += rollValue;
      asciiVal = asciiVal % 27;
      asciiVal += 65;
      if (asciiVal === 91) { seed += '9' }
      else { seed += String.fromCharCode(asciiVal); }
    }

    this.setState( { seed: seed } );
  }

  //Entropy Collection
  handleMouseMove(e) {
    if (this.state.collected < collectionPoints) {
      let mouseEntropy = e.screenX + e.screenY;
      this.setState({ x: e.screenX, y: e.screenY, randArr: this.state.randArr.concat([mouseEntropy]) , collected: this.state.collected+1});
    }
  }

  render() {
    return (
      <div style={{ height: 50 }}>
        <p class="infoBox"></p>
        <button onClick={this.handleClick} class="button"> Generate New Seed </button>
        <h3>Entropy Collected: {Math.floor((this.state.collected / collectionPoints)*100)}%</h3>

        <h3>Seed: {this.state.seed}</h3>
        <h2 class="mouseBoxHeader">Entropy Collection Box</h2>
        <div class="mouseBox" onMouseMove={this.handleMouseMove.bind(this)}>
          <p class="mouseBoxText">({ this.state.x },{ this.state.y })</p>
        </div>
      </div>
    );
  }
}
