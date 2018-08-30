import * as React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import History from './components/History';

class App extends React.Component {

  public render() {
    document.body.style.overflowX = 'hidden';
    return (
      <Router>
        <div>
          <Switch>
            <Route exact={true} path="/dashboard" component={Dashboard} />
            <Route exact={true} path="/history" component={History} />
            <Redirect from="*" to="/dashboard" />
          </Switch>
        </div>
      </Router>
    );
  }

}

export default App;
