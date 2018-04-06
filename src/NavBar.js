import React from 'react';
import './App.css';
import github from './images/githubIcon.png';
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
        <ul class='navUl'>
          <li class='navLi'><a className={(this.props.currPage === 'Home' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Home')}>Home</a></li>
          <li class='navLi'><a className={(this.props.currPage === 'Paper Wallet' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Paper Wallet')}>Paper Wallet</a></li>
          <li class='navLi'><a className={(this.props.currPage === 'Generate Seed' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Generate Seed')}>Generate Seed</a></li>
          <li class='navLi'><a className={(this.props.currPage === 'FAQ' ? 'active' : '')} onClick={this.handleClick.bind(this, 'FAQ')}>FAQ</a></li>
          <li class='github'><a href="https://github.com/minyc510/IOTA-Cold-Storage" target="_blank" rel="noopener noreferrer"><img src={github} alt='github'/></a></li>
        </ul>
      </div>
    );
  }
}
