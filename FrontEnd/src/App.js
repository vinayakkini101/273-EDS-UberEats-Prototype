import React, {Component} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

import {BrowserRouter} from 'react-router-dom';
import RoutesMapping from './components/RoutesMapping';

class App extends Component {
  render(){
    return (
      <BrowserRouter>
      <div>
          <RoutesMapping/>
      </div>
      </BrowserRouter>

    )
  }
}

export default App;