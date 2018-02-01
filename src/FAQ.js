import React from 'react';
import './App.css';

export class FAQ extends React.Component {

  render() {
    return (
      <div>
      <h2>Whats an IOTA seed?</h2>
      <p class="infoBox"><b>An IOTA seed is like a master password required to spend your funds</b>.
       It can be used to generate an IOTA address,
       where all funds sent to that address can be spent using that seed.
       A seed is exactly 81 characters long, and can only consist of ('A'-'Z') and '9'.
       Note all alphanumeric characters must be upper-case.
      </p>

      <h2>How do I get my own seed?</h2>
      <p class="infoBox"><b>You just need to come up with 81 characters of 'A'-'Z' and '9'.</b>
      There are many ways to do this, the most secure way is to do it manually, choosing characters at random.
      You should not use online seed generators! Developers in the past have been known to create malicious seed generator
      sites designed to steal your seeds, and in turn steal your funds! If you use an online seed generator, like this one,
      you should be sure to change a good handful of the characters yourself before using the seed.
       </p>

      <h2>I understand I shouldnt use online seed-generators, but I want to use this one!</h2>
      <p class="infoBox">This website was created using javascript,
      and javascript can only create what is called a pseudo-random seed.
      Skipping the technical-details, pseudo-random seeds are less secure than truly random seeds because
      they are more likely to be brute-forced by a hacker. This seed-generator uses a javascript pseudo-random seed
      and then uses input (entropy, true-randomness) from the user (you) to further randomize the seed.
      </p>

      <p class="infoBox">
      To get started, hover your mouse around in the box under the "Generate Seed" page until youve collected enough randomness.
      The coordinates of your cursor-position will be used to further randomize a seed created through javascript.
      <b>Be sure to change a handful of characters from your generated-seed!</b> I promise Im not, but I could be
      a developer with the malicious intent of stealing your seeds. This website could be designed to only give you
      a certain set of seeds to which another user knows.
      </p>
      </div>

    );
  }

}
