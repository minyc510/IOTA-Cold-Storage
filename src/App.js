import React from 'react';
import './App.css';
import { NavBar } from './NavBar.js'
import { Home } from './Home.js'
import { PaperWallet } from './PaperWallet.js'
import { GenerateSeed } from './GenerateSeed.js'
import { FAQ } from './FAQ.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currPage: 'Home' }
    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage) {
    this.setState({ currPage: newPage });
  }

  render() {
    let main = null;
    if (this.state.currPage === 'Home') {main = <Home currPage={this.state.currPage} onClick={this.changePage}/>}
    if (this.state.currPage === 'Paper Wallet') { main = <PaperWallet />}
    if (this.state.currPage === 'Generate Seed') { main = <GenerateSeed />}
    if (this.state.currPage === 'FAQ') { main = <FAQ />}
    return (
      <div>
        <NavBar currPage={this.state.currPage} onClick={this.changePage}/>
        <div class="main">
          <br></br>
          {main}
        </div>

      </div>
    );
  }
}

export default App;
