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
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';
import QuickGrid from './QuickGrid';

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
            thirdPlatform: false,
            notes: ""
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
            thirdPlatform: this.state.thirdPlatform,
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
                    team: "",
                    rocket: "",
                    rocketSpeed: "",
                    pickupCargo: "",
                    pickupHatches: "",
                    priority: "",
                    climbing: "",
                    secondPlatform: false,
                    thirdPlatform: false,
                    notes: ""
                });

                setTimeout(() => this.setState({ snackbar: false }), 5000);
            })
    }

    render() {
        return (
            <SForm onSubmit={this.handleSubmit} className="mostContent" snackbar={this.state.snackbar} loading={this.state.loading}>
                <QuickGrid spacing={32} direction="column">
                    <QuickGrid spacing={16} direction="column">
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
                    </QuickGrid>

                    <QuickGrid spacing={16} direction="column">
                        <>
                            <Typography variant="subtitle1">האם יכול להכניס לטיל?</Typography>
                            <RadioGroup name="rocket" value={this.state.rocket} onChange={this.handleChange}>
                                <FormControlLabel value="true" control={<Radio />} label="כן" />
                                <FormControlLabel value="false" control={<Radio />} label="לא" />
                            </RadioGroup>
                        </>
                        <Fade top collapse when={this.state.rocket === "true"}>
                            <Typography variant="subtitle1">כמה מהרוקט יכול למלא במשחק?</Typography>
                            <RadioGroup required name="rocketSpeed" value={this.state.rocketSpeed} onChange={this.handleChange}>
                                <FormControlLabel value="moreThanOne" control={<Radio />} label="יותר מטיל שלם במשחק" />
                                <FormControlLabel value="full" control={<Radio />} label="טיל שלם במשחק" />
                                <FormControlLabel value="half" control={<Radio />} label="חצי טיל במשחק" />
                                <FormControlLabel value="lessThanHalf" control={<Radio />} label="פחות מחצי טיל במשחק" />
                            </RadioGroup>
                        </Fade>
                        <>
                            <Typography variant="subtitle1">האם יכול להרים קארגו?</Typography>
                            <RadioGroup name="pickupCargo" value={this.state.pickupCargo} onChange={this.handleChange}>
                                <FormControlLabel value="true" control={<Radio />} label="כן" />
                                <FormControlLabel value="false" control={<Radio />} label="לא" />
                            </RadioGroup>
                        </>
                        <>
                            <Typography variant="subtitle1">האם יכול להרים האטצ'ים?</Typography>
                            <RadioGroup name="pickupHatches" value={this.state.pickupHatches} onChange={this.handleChange}>
                                <FormControlLabel value="true" control={<Radio />} label="כן" />
                                <FormControlLabel value="false" control={<Radio />} label="לא" />
                            </RadioGroup>
                        </>
                        <>
                            <Typography variant="subtitle1">האם יש עדיפות לחפץ אחד?</Typography>
                            <RadioGroup name="priority" value={this.state.priority} onChange={this.handleChange}>
                                <FormControlLabel value="cargo" control={<Radio />} label="כן, לקארגו" />
                                <FormControlLabel value="hatches" control={<Radio />} label="כן, להאטצ'ים" />
                                <FormControlLabel value="false" control={<Radio />} label="לא" />
                            </RadioGroup>
                        </>
                        <>
                            <Typography variant="subtitle1">האם יכול לטפס?</Typography>
                            <RadioGroup name="climbing" value={this.state.climbing} onChange={this.handleChange}>
                                <FormControlLabel value="true" control={<Radio />} label="כן" />
                                <FormControlLabel value="false" control={<Radio />} label="לא" />
                            </RadioGroup>
                        </>
                        <Fade top collapse when={this.state.climbing === "true"}>
                            <Typography variant="subtitle1">לאיזה פלטפורמה יכול לטפס?</Typography>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox name="secondPlatform" checked={this.state.secondPlatform} onChange={this.handleCheckbox} />} label="2" />
                                <FormControlLabel control={<Checkbox name="thirdPlatform" checked={this.state.thirdPlatform} onChange={this.handleCheckbox} />} label="3" />
                            </FormGroup>
                        </Fade>
                    </QuickGrid>
                    <TextField fullWidth multiline name="notes" label="הערות" value={this.state.notes} onChange={this.handleChange} margin="none" />
                </QuickGrid>
            </SForm>
        )
    }
}

export default PitScouting;