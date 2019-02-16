import React, { Component } from 'react';
import ActualSummary from './ActualSummary';
import { withStyles, Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const styles = {
    mostContent: {
        padding: 24
    },
    button: {
        margin: 20
    }
}

class Summary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournament: "district1",
            team: "",
            currentTournament: "",
            currentTeam: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <>
                <div className={classes.mostContent}>
                    <Select value={this.state.tournament} onChange={this.handleChange} className={classes.button}
                        inputProps={{
                            name: 'tournament'
                        }}>
                        <MenuItem value="district1">District 1</MenuItem>
                        <MenuItem value="district2">District 2</MenuItem>
                        <MenuItem value="district3">District 3</MenuItem>
                        <MenuItem value="district4">District 4</MenuItem>
                        <MenuItem value="israel">ארצי</MenuItem>
                    </Select>
                    <TextField type="number" name="team" label="מס' קבוצה" value={this.state.team} onChange={this.handleChange} margin="none" />
                    <Button variant="contained" className={classes.button} onClick={(e) => this.setState({ currentTeam: this.state.team, currentTournament: this.state.tournament })}>שלח</Button>
                </div>
                <Divider />
                <div className={classes.mostContent}>
                    <Typography variant="h6">סיכום</Typography>
                    <br />
                    <ActualSummary tournament={this.state.currentTournament} team={this.state.currentTeam} />
                </div>
            </>
        )
    }
}

export default withStyles(styles)(Summary);