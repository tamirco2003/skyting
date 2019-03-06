import React, { Component } from 'react';
import firebase from '../Firebase'
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
import Fade from 'react-reveal/Fade';
import Counter from './Counter';

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
            platformEnd: "",
            notes: ""
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
                platformEnd: this.state.climbed === "true" ? this.state.platformEnd : 0
            },
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
                    platformEnd: "",
                    notes: ""
                });

                setTimeout(() => this.setState({ snackbar: false }), 5000);
            })
    }

    render() {
        return (
            <SForm onSubmit={this.handleSubmit} className="mostContent" snackbar={this.state.snackbar} loading={this.state.loading}>
                <TextField className="formHeader" required name="scouter" label="שם" value={this.state.scouter} onChange={this.handleChange} />
                <br />
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
                <br />
                <TextField className="formHeader" required type="number" name="team" label="מס' קבוצה" value={this.state.team} onChange={this.handleChange} />

                <br />
                <br />

                <Typography className="formHeader" variant="h5">Sandstorm</Typography>
                <RadioGroup className="formSubtitle" name="platformStart" formlabel="על איזה פלטפורמה התחילו?" value={this.state.platformStart} onChange={this.handleChange}>
                    <FormControlLabel value="1" control={<Radio />} label="1" />
                    <FormControlLabel value="2" control={<Radio />} label="2" />
                </RadioGroup>
                <RadioGroup className="formSubtitle" name="sandstormControls" formlabel="שליטה" value={this.state.sandstormControls} onChange={this.handleChange}>
                    <FormControlLabel value="autonomous" control={<Radio />} label="אוטונומי" />
                    <FormControlLabel value="manual" control={<Radio />} label="ידני" />
                    <FormControlLabel value="none" control={<Radio />} label="כלום" />
                </RadioGroup>
                <Fade top collapse when={this.state.sandstormControls !== "none" && this.state.sandstormControls !== ""}>
                    <Typography variant="subtitle1">כמה קארגו הוכנס?</Typography>
                    <Counter name="sandstormCargo" value={this.state.sandstormCargo} onChange={this.handleChange} min={0} />
                </Fade>
                <Fade top collapse when={this.state.sandstormControls !== "none" && this.state.sandstormControls !== ""}>
                    <Typography variant="subtitle1">כמה האטצ'ים הוכנסו?</Typography>
                    <Counter name="sandstormHatches" value={this.state.sandstormHatches} onChange={this.handleChange} min={0} />
                </Fade>

                <br />
                <br />

                <Typography className="formHeader" variant="h5">מהלך המשחק</Typography>
                <RadioGroup className="formSubtitle" name="robotType" formlabel="מהו סוג הרובוט?" value={this.state.robotType} onChange={this.handleChange}>
                    <FormControlLabel value="groundLevel" control={<Radio />} label="Ground Level" />
                    <FormControlLabel value="rocket" control={<Radio />} label="טיל" />
                    <FormControlLabel value="jack" control={<Radio />} label="Jack" />
                    <FormControlLabel value="defense" control={<Radio />} label="הגנה" />
                    <FormControlLabel value="broken" control={<Radio />} label="ע צ י ץ" />
                </RadioGroup>

                <Fade top collapse when={this.state.robotType === "rocket" || this.state.robotType === "jack"}>
                    <Typography variant="h6">טיל</Typography>
                    <div style={{height: 16}} />
                    <Typography variant="subtitle1">כמה קארגו הוכנס?</Typography>
                    <Counter name="rocketCargo" value={this.state.rocketCargo} onChange={this.handleChange} min={0} />
                    <Typography variant="subtitle1">כמה האטצ'ים הוכנסו?</Typography>
                    <Counter name="rocketHatches" value={this.state.rocketHatches} onChange={this.handleChange} min={0} />
                </Fade>

                <br />

                <Typography className="formSubtitle" variant="h6">ספינת קארגו</Typography>
                <Typography variant="subtitle1">כמה קארגו הוכנס?</Typography>
                <Counter name="shipCargo" value={this.state.shipCargo} onChange={this.handleChange} min={0} />
                <Typography variant="subtitle1">כמה האטצ'ים הוכנסו?</Typography>
                <Counter name="shipHatches" value={this.state.shipHatches} onChange={this.handleChange} min={0} />

                <br />

                <FormGroup formlabel="מאיפה אסף את הכדורים?">
                    <FormControlLabel control={<Checkbox name="pickupLocDepot" checked={this.state.pickupLocDepot} onChange={this.handleCheckbox} />} label="Depot" />
                    <FormControlLabel control={<Checkbox name="pickupLocLoadingStation" checked={this.state.pickupLocLoadingStation} onChange={this.handleCheckbox} />} label="Loading Station" />
                </FormGroup>

                <br />
                <br />

                <Typography className="formHeader" variant="h5">סוף המשחק</Typography>
                <RadioGroup className="formSubtitle" name="climbed" formlabel="האם טיפס?" value={this.state.climbed} onChange={this.handleChange}>
                    <FormControlLabel value="true" control={<Radio />} label="כן" />
                    <FormControlLabel value="false" control={<Radio />} label="לא" />
                </RadioGroup>
                <Fade top collapse when={this.state.climbed === "true"}>
                    <Typography variant="subtitle1">לאיזה פלטפורמה טיפס?</Typography>
                    <RadioGroup required name="platformEnd" formlabel="לאיזה פלטפורמה טיפס?" value={this.state.platformEnd} onChange={this.handleChange}>
                        <FormControlLabel value="1" control={<Radio />} label="1" />
                        <FormControlLabel value="2" control={<Radio />} label="2" />
                        <FormControlLabel value="3" control={<Radio />} label="3" />
                    </RadioGroup>
                </Fade>
                <TextField className="formHeader" fullWidth multiline name="notes" label="הערות" value={this.state.notes} onChange={this.handleChange} />
            </SForm>
        )
    }
}

export default Scouting;