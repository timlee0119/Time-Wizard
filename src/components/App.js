import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
import Landing from './Landing';
import '../styles/App.css';

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

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <h1>Intervention</h1>
//         <img src={logo} className="App-logo" alt="logo" />
//         <h2>Stop, or Lose.</h2>
//         <a className="App-link" href="https://reactjs.org">
//           Login with Google
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
