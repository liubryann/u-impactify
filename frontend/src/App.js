import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
<<<<<<< HEAD
=======
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
>>>>>>> 3749beac54502dabe1e8968e6f55b4c979fc6e21
import './App.css';
// Pages
import Login from './pages/Login';

<<<<<<< HEAD
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" render={() => <Login/>}/>
      </Switch>
    </Router>
=======
const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#fafafa',
      paper: '#fff',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/login" render={() => <Login/>}/>
        </Switch>
      </Router>
    </ThemeProvider>
>>>>>>> 3749beac54502dabe1e8968e6f55b4c979fc6e21
  );
}

export default App;
