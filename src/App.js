import React from 'react';
import './App.css';
import { NavBar } from './NavBar.js'
import { SeedForm } from './SeedForm.js'
import { GenerateSeed } from './GenerateSeed.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currPage: 'Paper Wallet' }
    this.changePage = this.changePage.bind(this);
  }

  changePage(newPage) {
    this.setState({ currPage: newPage });
  }

  render() {
    let main = null;
    if (this.state.currPage === 'Paper Wallet') { main = <SeedForm />}
    if (this.state.currPage === 'Generate Seed') { main = <GenerateSeed />}

    return (
      <div>
        <NavBar currPage={this.state.currPage} onClick={this.changePage}/>
        {main}
      </div>
    );
  }
}

export default App;
