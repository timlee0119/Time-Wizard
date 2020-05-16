import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';

import WelcomePage from './WelcomePage';
import CreateMissonPage from './CreateMissionPage';
import JoinMissionPage from './JoinMissionPage';

class App extends Component {
  componentDidMount() {
    // do data fetching
  }

  render() {
    return (
      // <div id="wrapper" className="ui middle aligned center aligned grid">
      //   <div className="column">
      //     <HashRouter>
      //       <Route path="/" exact component={Landing} />
      //     </HashRouter>
      //   </div>
      // </div>
      <div>
        <HashRouter>
          <Route path="/" exact component={WelcomePage} />
          <Route path="/createMission" component={CreateMissonPage} />
          <Route path="/joinMission" component={JoinMissionPage} />
        </HashRouter>
      </div>
    );
  }
}

export default App;
