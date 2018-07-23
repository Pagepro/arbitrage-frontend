import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import History from './components/History';

class App extends React.Component {

  public render() {
    return (
      <Router>
        <div className="container">
          <Route exact={true} path="/" component={Dashboard} />
          <Route exact={true} path="/dashboard" component={Dashboard} />
          <Route path="/history" component={History} />
        </div>
      </Router>
    );
  }

}

export default App;
