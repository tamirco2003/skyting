import React, { Component } from 'react';
import { Divider, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, ButtonBase, CircularProgress } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import QuickGrid from './QuickGrid';
import firebase from '../Firebase'

class TesterSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tournament: "district1",
            database: null,
            open: false,
            openNotes: {
                scouter: "",
                notes: ""
            }
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    formatDate(unixtime) {
        let date = new Date(parseInt(unixtime));
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
    }

    componentDidMount() {
        firebase.database().ref().on("value", (snapshot) => this.setState({ database: snapshot.val() }));
    }

    render() {
        return (
            <>
                <div className="mostContent">
                    <Select value={this.state.tournament} onChange={this.handleChange} className="buttonMargin"
                        inputProps={{
                            name: 'tournament'
                        }}>
                        <MenuItem value="district1">District 1</MenuItem>
                        <MenuItem value="district2">District 2</MenuItem>
                        <MenuItem value="district3">District 3</MenuItem>
                        <MenuItem value="district4">District 4</MenuItem>
                        <MenuItem value="israel">ארצי</MenuItem>
                    </Select>
                </div>
                <Divider />
                <div className="mostContent">
                    <Typography variant="h6">סיכום בוחנים</Typography>
                    <br />
                    {!this.state.database && <center><CircularProgress /></center>}
                    {this.state.database && !this.state.database[this.state.tournament]  && <Typography variant="h3">לא נמצא מידע</Typography>}
                    {this.state.database && this.state.database[this.state.tournament] &&
                        <QuickGrid align="center">
                            {
                                Object.values(this.state.database[this.state.tournament].tester).map((value, index) =>
                                    <Paper key={index} lg={2} className="mostContent" component={ButtonBase} onClick={(e) => this.setState({
                                        open: true,
                                        openNotes: {
                                            scouter: value.scouter,
                                            notes: value.notes,
                                            date: this.formatDate(Object.keys(this.state.database[this.state.tournament].tester)[index])
                                        }
                                    })}>
                                        <Typography className="whitespace" variant="h6">{value.scouter + "\n" + this.formatDate(Object.keys(this.state.database[this.state.tournament].tester)[index])}</Typography>
                                    </Paper>
                                )
                            }
                        </QuickGrid>
                    }
                </div>
                <Dialog open={this.state.open} onClose={() => this.setState({ open: false })}>
                    <DialogTitle>{this.state.openNotes.scouter}</DialogTitle>
    
                    <DialogContent>
                        <DialogContentText>{this.state.openNotes.date}</DialogContentText>
                        <br />
                        <Typography variant="h4">{this.state.openNotes.notes}</Typography>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

export default TesterSummary;