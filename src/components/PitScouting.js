import React, { Component } from 'react';
import firebase from '../Firebase'
import SForm from './SForm';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core';

const styles = {
    mostContent: {
        padding: 24
    }
}

class PitScouting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            snackbar: false,
            scouter: "",
            tournament: "district1",
            team: "",
            rocket: "",
            rocketSpeed: "",
            pickupCargo: "",
            pickupHatches: "",
            priority: "",
            climbing: "",
            secondPlatform: false,
            thirdPlatform: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        itemsRef.child(`${this.state.tournament}/${this.state.team}/pit`).set({
            rocket: this.state.rocket,
            rocketSpeed: this.state.rocketSpeed,
            pickupCargo: this.state.pickupCargo,
            pickupHatches: this.state.pickupHatches,
            priority: this.state.priority,
            climbing: this.state.climbing,
            secondPlatform: this.state.secondPlatform,
            thirdPlatform: this.state.thirdPlatform
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
                    rocket: "",
                    rocketSpeed: "",
                    pickupCargo: "",
                    pickupHatches: "",
                    priority: "",
                    climbing: "",
                    secondPlatform: false,
                    thirdPlatform: false
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
                <RadioGroup required name="rocket" formlabel="האם יכול להכניס לטיל?" value={this.state.rocket} onChange={this.handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="כן" />
                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                </RadioGroup>
                <RadioGroup required requiredstate={this.state.rocket === "true"} name="rocketSpeed" formlabel="כמה מהרוקט יכול למלא במשחק?" value={this.state.rocketSpeed} onChange={this.handleChange}>
                    <FormControlLabel value="moreThanOne" control={<Radio />} label="יותר מטיל שלם במשחק" />
                    <FormControlLabel value="full" control={<Radio />} label="טיל שלם במשחק" />
                    <FormControlLabel value="half" control={<Radio />} label="חצי טיל במשחק" />
                    <FormControlLabel value="lessThanHalf" control={<Radio />} label="פחות מחצי טיל במשחק" />
                </RadioGroup>
                <RadioGroup required name="pickupCargo" formlabel="האם יכול להרים קארגו?" value={this.state.pickupCargo} onChange={this.handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="כן" />
                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                </RadioGroup>
                <RadioGroup required name="pickupHatches" formlabel="האם יכול להרים האטצ'ים?" value={this.state.pickupHatches} onChange={this.handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="כן" />
                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                </RadioGroup>
                <RadioGroup required name="priority" formlabel="האם יש עדיפות לחפץ אחד?" value={this.state.priority} onChange={this.handleChange}>
                    <FormControlLabel value="cargo" control={<Radio />} label="כן, לקארגו" />
                    <FormControlLabel value="hatches" control={<Radio />} label="כן, להאטצ'ים" />
                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                </RadioGroup>
                <RadioGroup required name="climbing" formlabel="האם יכול לטפס?" value={this.state.climbing} onChange={this.handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="כן" />
                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                </RadioGroup>
                <FormGroup requiredstate={this.state.climbing === "true"} formlabel="לאיזה פלטפורמה יכול לטפס?">
                    <FormControlLabel control={<Checkbox name="secondPlatform" checked={this.state.secondPlatform} onChange={this.handleCheckbox} />} label="2" />
                    <FormControlLabel control={<Checkbox name="thirdPlatform" checked={this.state.thirdPlatform} onChange={this.handleCheckbox} />} label="3" />
                </FormGroup>

                {/* <RadioGroup required requiredstate={this.state.climbing === "true"} name="platform" formlabel="לאיזה פלטפורה יכול לטפס?" value={this.state.platform} onChange={this.handleChange}>
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                </RadioGroup> */}
            </SForm>
        )
    }
}

export default withStyles(styles)(PitScouting);