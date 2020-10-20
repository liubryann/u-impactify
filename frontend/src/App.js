import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
// Pages
import Login from './pages/Login';
//Redux
import { Provider } from 'react-redux';
import store from './redux/store';

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
    },
});

function App() {
    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <Router>
                    <Switch>
                        <Route exact path="/login" render={() => <Login />} />
                    </Switch>
                </Router>
            </ThemeProvider>
        </Provider>
    );
}

export default App;
