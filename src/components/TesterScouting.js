import React, { Component } from 'react';
import firebase from '../Firebase'
import SForm from './SForm';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core';

const styles = {
    mostContent: {
        padding: 24
    }
}

class TesterScouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            snackbar: false,
            loading: false,
            scouter: "",
            tournament: "district1",
            notes: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref();
        this.setState({ loading: true });
        itemsRef.child(`${this.state.tournament}/tester/${new Date().getTime()}`).set({
            scouter: this.state.scouter,
            notes: this.state.notes
        })
            .then(() => {
                itemsRef.child(`scouters/${this.state.scouter}`).transaction((scouterData) => {
                    if (scouterData) {
                        scouterData.formsFilled++;
                    }
                    else {
                        scouterData = {
                            formsFilled: 1
                        }
                    }
                    return scouterData;
                })
            })
            .then(() => {
                this.setState({
                    loading: false,
                    snackbar: true,
                    notes: ""
                });

                setTimeout(() => this.setState({ snackbar: false }), 5000);
            })

    }

    render() {
        const { classes } = this.props;
        return (
            <SForm onSubmit={this.handleSubmit} className={classes.mostContent} snackbar={this.state.snackbar} loading={this.state.loading}>
                <TextField required name="scouter" label="שם" value={this.state.scouter} onChange={this.handleChange} margin="none" />
                <Select value={this.state.tournament} onChange={this.handleChange}
                    inputProps={{
                        name: 'tournament'
                    }}>
                    <MenuItem value="district1">District 1</MenuItem>
                    <MenuItem value="district2">District 2</MenuItem>
                    <MenuItem value="district3">District 3</MenuItem>
                    <MenuItem value="district4">District 4</MenuItem>
                    <MenuItem value="israel">ארצי</MenuItem>
                </Select>
                <TextField fullWidth required multiline name="notes" label="הערות" value={this.state.notes} onChange={this.handleChange} margin="none" />
            </SForm>
        )
    }
}

export default withStyles(styles)(TesterScouting);