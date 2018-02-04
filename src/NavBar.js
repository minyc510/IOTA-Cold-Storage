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
          <li><a href="https://github.com/minyc510/IOTA-Cold-Storage" target="_blank" rel="noopener noreferrer">Github</a></li>
          <li><a className={(this.props.currPage === 'FAQ' ? 'active' : '')} onClick={this.handleClick.bind(this, 'FAQ')}>FAQ</a></li>
        </ul>
      </div>
    );
  }
}

export function Footer() {
  return (
      <div class="footer">
        <p>GitHub: minyc510</p>
        <p>IOTA: VJRAJSNBWRJIUIBDXQZVESSTZJJFPYJYWRBIJNJKARBVJ9XYPNRKFLXKDU9KFATMNATLRVKYIUUJLNBVDRQNWMFERX</p>
        <p>BTC: 18cx6rPftt1tqX736CewAp84X5bsceBAQL</p>
        <p>ETH: 0x60d2080d9494134a537ab3f987d3c34a309b489c</p>
      </div>

  );
}
