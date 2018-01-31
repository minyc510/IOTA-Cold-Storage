import React from 'react';
import './App.css';

export class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(page) {
    this.props.onClick(page);
  }

  render() {
    return (
      <div>
        <ul>
          <li><a className={(this.props.currPage === 'Paper Wallet' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Paper Wallet')}>Paper Wallet</a></li>
          <li><a className={(this.props.currPage === 'Generate Seed' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Generate Seed')}>Generate Seed</a></li>
          <li><a href="https://github.com/minyc510/IOTA-Cold-Storage" target="_blank">Github</a></li>
          <li><a className={(this.props.currPage === 'About' ? 'active' : '')} onClick={this.handleClick.bind(this, 'About')}>About</a></li>
        </ul>
        <h1>IOTA Cold Storage: {this.props.currPage}</h1>
      </div>
    );
  }
}
