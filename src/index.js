import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Background from './blueback2.jpg';

let imgUrl = './blueback2.jpg'
let styles = {
    root: {
       backgroundImage: `url(${ imgUrl })`,
       backgroundRepeat  : 'no-repeat',
       backgroundPosition: 'center',
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
