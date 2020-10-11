import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import './App.css';
// Pages
import Login from './pages/Login';

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
                    <Route exact path="/login" render={() => <Login />} />
                </Switch>
            </Router>
        </ThemeProvider>
    );
}

export default App;
