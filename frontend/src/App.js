import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
// Pages
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <Login/>}/>
      </Switch>
    </Router>
  );
}

export default App;
