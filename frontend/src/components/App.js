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

  onlyWhenMission = (hasMission, component) => {
    if (hasMission) {
      return this.props.auth.mission ? component : <Redirect to="/" />;
    } else {
      return this.props.auth.mission ? <Redirect to="/mission" /> : component;
    }
  };

  // onlyWhenNoMission = component => {
  //   return this.props.auth.mission ? <Redirect to="/mission" /> : component;
  // };

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
            render={() => this.onlyWhenMission(false, <WelcomePage />)}
          />
          <Route
            path="/createMission"
            render={() => this.onlyWhenMission(false, <CreateMissonPage />)}
          />
          <Route
            path="/joinMission"
            render={() => this.onlyWhenMission(false, <JoinMissionPage />)}
          />
          <Route
            path="/mission"
            render={() => this.onlyWhenMission(true, <MissionPage />)}
          />
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(App);
