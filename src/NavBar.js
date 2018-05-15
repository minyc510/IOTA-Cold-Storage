import React from 'react';
import './App.css';
import { Glyphicon } from 'react-bootstrap';

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
        <ul className='navUl'>
          <li className='navLi'><a className={(this.props.currPage === 'Home' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Home')}><Glyphicon glyph="lock" /> Home</a></li>
          <li className='navLi'><a className={(this.props.currPage === 'Paper Wallet' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Paper Wallet')}>Paper Wallet</a></li>
          <li className='navLi'><a className={(this.props.currPage === 'Generate Seed' ? 'active' : '')} onClick={this.handleClick.bind(this, 'Generate Seed')}>Generate Seed</a></li>
          <li className='github'><a href="https://github.com/minyc510/IOTA-Cold-Storage" target="_blank" rel="noopener noreferrer"><Glyphicon glyph="link" /> Github</a></li>
        </ul>
      </div>
    );
  }
}
