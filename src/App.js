import React from 'react';
import './App.css';
import { NavBar } from './NavBar.js'
import { Home } from './Home.js'
import { PaperWallet } from './PaperWallet.js'
import { GenerateSeedMain } from './GenerateSeed.js'

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
    if (this.state.currPage === 'Generate Seed') { main = <GenerateSeedMain />}
    return (
      <div>
        <NavBar currPage={this.state.currPage} onClick={this.changePage}/>
        <div className="main">
          <br></br>
          {main}
        </div>
        <br></br><br></br><br></br><br></br>
        <h5 className="center">Donations</h5>
        <h6 className="center">IOTA: YSDSRPVBTHVCISWLBCLQRAFDKPNZPDXKHEEGFUNFCSDQYVYXGIYNRHBEIYPLWXUGAQDSCXPHNNIMZZMBCQQO9LZVJY</h6>
        <h6 className="center">BTC: 18cx6rPftt1tqX736CewAp84X5bsceBAQL</h6>
        <h6 className="center">ETH: 0x60d2080d9494134a537ab3f987d3c343a309b489c</h6>
      </div>
    );
  }
}

export default App;
