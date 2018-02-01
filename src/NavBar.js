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
          <li><a className={(this.props.currPage === 'FAQ' ? 'active' : '')} onClick={this.handleClick.bind(this, 'FAQ')}>FAQ</a></li>
        </ul>
      </div>
    );
  }
}
