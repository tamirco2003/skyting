import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TopNavBar from './TopNavBar';
import Scouting from './Scouting';
import PitScouting from './PitScouting';
import TesterScouting from './TesterScouting';
import Summary from './Summary';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core';
import Leaderboard from './Leaderboard';
import TesterSummary from './TesterSummary';

const theme = createMuiTheme({
    direction: 'rtl',
});

const styles = {
    mostContent: {
        padding: 24
    }
}

class App extends Component {
    render() {
        const { classes } = this.props;
        return (
            <Router>
                <MuiThemeProvider theme={theme}>
                    <TopNavBar barTitle="סקיינט" />
                    <div className={classes.mostContent}>
                        <Paper elevation={1}>
                            <Switch>
                                <Route path="/scouting" component={Scouting} />
                                <Route path="/pit" component={PitScouting} />
                                <Route path="/testers" component={TesterScouting} />
                                <Route path="/summary" component={Summary} />
                                <Route path="/testersummary" component={TesterSummary} />
                                <Route path="/leaderboard" component={Leaderboard} />
                                <Redirect to="/scouting" />
                            </Switch>
                        </Paper>
                    </div>
                </MuiThemeProvider>
            </Router>
        )
    }
}

export default withStyles(styles)(App);