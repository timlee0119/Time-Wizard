import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Landing from './Landing';

class App extends Component {
  componentDidMount() {
    // do data fetching
  }

  render() {
    return (
      <div id="wrapper" className="ui middle aligned center aligned grid">
        <div className="column">
          <HashRouter>
            <Route path="/" exact component={Landing} />
          </HashRouter>
        </div>
      </div>
    );
  }
}

export default App;
