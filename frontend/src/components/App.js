import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import WelcomePage from './WelcomePage';
import CreateMissonPage from './CreateMissionPage';
import JoinMissionPage from './JoinMissionPage';
import MissionPage from './MissionPage';
import * as actions from '../actions';
import history from '../utils/history';

class App extends Component {
  componentDidMount() {
    // do data fetching
    this.props.fetchUser();
  }

  onlyWhenNoMission = component => {
    return this.props.auth.mission ? <Redirect to="/mission" /> : component;
  };

  render() {
    if (!this.props.auth) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Router history={history}>
          <Route
            path="/"
            exact
            render={() => this.onlyWhenNoMission(<WelcomePage />)}
          />
          <Route
            path="/createMission"
            render={() => this.onlyWhenNoMission(<CreateMissonPage />)}
          />
          <Route
            path="/joinMission"
            render={() => this.onlyWhenNoMission(<JoinMissionPage />)}
          />
          <Route path="/mission" component={MissionPage} />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(App);
