import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import history from '../utils/history';

import WelcomePage from './WelcomePage';
import CreateMissonPage from './CreateMissionPage';
import JoinMissionPage from './JoinMissionPage';
import MissionPage from './MissionPage';
import ReportPage from './ReportPage';
import Loading from './widgets/Loading';

class App extends Component {
  componentDidMount() {
    // do data fetching
    this.props.fetchUser();
  }

  onlyWhenMission = (needMission, component) => {
    if (needMission) {
      if (this.props.auth.mission) {
        if (this.props.auth.mission.ended) {
          return <Redirect to="/report" />;
        } else {
          return component;
        }
      } else {
        return <Redirect to="/" />;
      }
    } else {
      return this.props.auth.mission ? <Redirect to="/mission" /> : component;
    }
  };

  onlyWhenMissionEnded = component => {
    if (this.props.auth.mission && this.props.auth.mission.ended) {
      return component;
    } else {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div className="app-background">
        <div className="card main">
          {!this.props.auth ? (
            <Loading />
          ) : (
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
              <Route
                path="/report"
                render={() => this.onlyWhenMissionEnded(<ReportPage />)}
              />
            </Router>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps, actions)(App);
