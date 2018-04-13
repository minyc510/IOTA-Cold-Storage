import React from 'react';
import './App.css';

export class FAQ extends React.Component {

  render() {
    return (
      <div>
        <div className="infoBox">
          <h2>Whats an IOTA seed?</h2>

          <b>An IOTA seed is like a master password required to spend your funds</b>.
           It can be used to generate an IOTA address,
           where all funds sent to that address can be spent using that seed.
           A seed is exactly 81 characters long, and can only consist of ('A'-'Z') and '9'.
           Note all alphanumeric characters must be upper-case.
        </div>

        <h2>How do I get my own seed?</h2>
        <div className="infoBox"><b>You just need to come up with 81 characters that consist of 'A'-'Z' and '9'.</b>
        There are many ways to do this, the most secure way is to do it manually, choosing characters at random.
        However, you should be very cautious when using online seed generators! Developers in the past have been known to create malicious seed generator
        sites designed to steal your seeds, and in turn steal your funds! If you use an online seed generator, like this one,
        you should be sure to change a good handful of the characters yourself before using the seed.
        </div>
      </div>
    );
  }

}
