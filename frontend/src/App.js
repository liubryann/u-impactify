import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Courses from './pages/Courses';
import CourseCreation from './pages/CourseCreation';
import GivingGarden from './pages/GivingGarden';
//Redux
import { isLoggedIn } from './redux/actions/authActions'

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
    text: {
      primary: 'rgba(0, 0, 0, 0.70)'
    },
  },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Switch>
                    <Route exact path="/login" render={() => <Login />} />
                    <Route exact path="/" render={() => <Landing />} />
                    <Route exact path="/signup" component={Signup} />
                    <Route exact path="/home" render={() => isLoggedIn() ? <Dashboard /> : <Redirect to='/login'/>} />
                    <Route exact path="/courses" render={() => isLoggedIn() ? <Courses /> : <Redirect to='/login'/>} />
                    <Route exact path="/course-creation" render={() => isLoggedIn() ? <CourseCreation /> : <Redirect to='/login'/> }/>
                    <Route exact path="/profile" render={() => <Profile />} />
                    <Route exact path="/giving-garden" render={() => isLoggedIn() ? <GivingGarden/> : <Redirect to='/login'/>}/>
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
