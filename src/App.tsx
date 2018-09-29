import * as React from 'react';
// import { Has } from 'react-router'
import {Link, HashRouter, Route} from 'react-router-dom';
import coms from './components';

import './App.css';
import logo from './logo.svg';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
      <HashRouter>
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <ul className="link">
            {Object.keys(coms).map(key => {
              return (
                <li key={key}><Link to={`/${key}`}>{key}</Link></li>
              )
            })}
          </ul>
          <div className="componentContainer">
          {Object.keys(coms).map(key => {
              return (
                <Route key={key} path={`/${key}`} exact={true} component={coms[key]} />
              )
            })}
          </div>
        </div>
      </HashRouter> 
      </div>
    );
  }
}

export default App;
