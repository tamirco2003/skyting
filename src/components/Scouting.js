import React, { Component } from 'react';
import firebase from '../Firebase'
import { withStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import SForm from './SForm';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

const styles = {
    mostContent: {
        padding: 24
    }
}

class Scouting extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            snackbar: false,
            scouter: "",
            tournament: "district1",
            team: "",
            sandstormControls: "",
            sandstormCargo: 0,
            sandstormHatches: 0,
            platformStart: "",
            robotType: "",
            rocketCargo: 0,
            rocketHatches: 0,
            shipCargo: 0,
            shipHatches: 0,
            pickupLocDepot: false,
            pickupLocLoadingStation: false,
            climbed: "",
            platformEnd: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleCheckbox(e) {
        this.setState({
            [e.target.name]: e.target.checked
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const itemsRef = firebase.database().ref();
        this.setState({ loading: true });
        itemsRef.child(`${this.state.tournament}/${this.state.team}/games/${new Date().getTime()}`).set({
            sandstorm: {
                controls: this.state.sandstormControls,
                cargo: this.state.sandstormControls !== "none" ? this.state.sandstormCargo : 0,
                hatches: this.state.sandstormControls !== "none" ? this.state.sandstormHatches : 0
            },
            game: {
                platformStart: this.state.platformStart,
                robotType: this.state.robotType,
                rocket: {
                    cargo: this.state.robotType === "rocket" || this.state.robotType === "jack" ? this.state.rocketCargo : 0,
                    hatches: this.state.robotType === "rocket" || this.state.robotType === "jack" ? this.state.rocketHatches : 0,
                },
                cargoShip: {
                    cargo: this.state.shipCargo,
                    hatches: this.state.shipHatches
                },
                pickupLocation: {
                    depot: this.state.pickupLocDepot,
                    loadingStation: this.state.pickupLocLoadingStation
                }
            },
            endgame: {
                platformEnd: this.state.climbed === "true" ? this.state.platformEnd : 1
            }
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
                    team: "",
                    sandstormControls: "",
                    sandstormCargo: 0,
                    sandstormHatches: 0,
                    platformStart: "",
                    robotType: "",
                    rocketCargo: 0,
                    rocketHatches: 0,
                    shipCargo: 0,
                    shipHatches: 0,
                    pickupLocDepot: false,
                    pickupLocLoadingStation: false,
                    climbed: "",
                    platformEnd: ""
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
                <TextField required type="number" name="team" label="מס' קבוצה" value={this.state.team} onChange={this.handleChange} margin="none" />
                <Typography variant="h5">Sandstorm</Typography>
                <RadioGroup required name="sandstormControls" formLabel="שליטה" value={this.state.sandstormControls} onChange={this.handleChange}>
                    <FormControlLabel value="autonomous" control={<Radio />} label="אוטונומי" />
                    <FormControlLabel value="manual" control={<Radio />} label="ידני" />
                    <FormControlLabel value="none" control={<Radio />} label="כלום" />
                </RadioGroup>
                <TextField required requiredState={this.state.sandstormControls !== "none" && this.state.sandstormControls !== ""} type="number" name="sandstormCargo" label="כמה קארגו הוכנס?" value={this.state.sandstormCargo} onChange={this.handleChange} margin="none" />
                <TextField required requiredState={this.state.sandstormControls !== "none" && this.state.sandstormControls !== ""} type="number" name="sandstormHatches" label="כמה האטצ'ים הוכנסו?" value={this.state.sandstormHatches} onChange={this.handleChange} margin="none" />
                <RadioGroup required name="platformStart" formLabel="על איזה פלטפורמה התחילו?" value={this.state.platformStart} onChange={this.handleChange}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                </RadioGroup>
                <Typography variant="h5">מהלך המשחק</Typography>
                <RadioGroup required name="robotType" formLabel="מהו סוג הרובוט?" value={this.state.robotType} onChange={this.handleChange}>
                    <FormControlLabel value="groundLevel" control={<Radio />} label="Ground Level" />
                    <FormControlLabel value="rocket" control={<Radio />} label="טיל" />
                    <FormControlLabel value="jack" control={<Radio />} label="Jack" />
                    <FormControlLabel value="defense" control={<Radio />} label="הגנה" />
                    <FormControlLabel value="broken" control={<Radio />} label="ע צ י ץ" />
                </RadioGroup>
                <Typography variant="h6" requiredState={this.state.robotType === "rocket" || this.state.robotType === "jack"}>טיל</Typography>
                <TextField required requiredState={this.state.robotType === "rocket" || this.state.robotType === "jack"} type="number" name="rocketCargo" label="כמה קארגו הוכנס?" value={this.state.rocketCargo} onChange={this.handleChange} margin="none" />
                <TextField required requiredState={this.state.robotType === "rocket" || this.state.robotType === "jack"} type="number" name="rocketHatches" label="כמה האטצ'ים הוכנסו?" value={this.state.rocketHatches} onChange={this.handleChange} margin="none" />
                <Typography variant="h6">ספינת קארגו</Typography>
                <TextField required type="number" name="shipCargo" label="כמה קארגו הוכנס?" value={this.state.shipCargo} onChange={this.handleChange} margin="none" />
                <TextField required type="number" name="shipHatches" label="כמה האטצ'ים הוכנסו?" value={this.state.shipHatches} onChange={this.handleChange} margin="none" />
                <FormGroup formLabel="מאיפה אסף את הכדורים?">
                    <FormControlLabel control={<Checkbox name="pickupLocDepot" checked={this.state.pickupLocDepot} onChange={this.handleCheckbox} />} label="Depot" />
                    <FormControlLabel control={<Checkbox name="pickupLocLoadingStation" checked={this.state.pickupLocLoadingStation} onChange={this.handleCheckbox} />} label="Loading Station" />
                </FormGroup>
                <Typography variant="h5">סוף המשחק</Typography>
                <RadioGroup required name="climbed" formLabel="האם טיפס?" value={this.state.climbed} onChange={this.handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="כן" />
                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                </RadioGroup>
                <RadioGroup required requiredState={this.state.climbed === "true"} name="platformEnd" formLabel="לאיזה פלטפורמה טיפס?" value={this.state.platformEnd} onChange={this.handleChange}>
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                </RadioGroup>
            </SForm>
        )
    }
}

export default withStyles(styles)(Scouting);