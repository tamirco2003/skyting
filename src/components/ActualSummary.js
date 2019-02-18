import React, { Component } from 'react';
import firebase from '../Firebase'
import Typography from '@material-ui/core/Typography';
import QuickGrid from './QuickGrid';
import QuickDonut from './QuickDonut';
import { blue, red, green, grey, yellow } from '@material-ui/core/colors';
import QuickLine from './QuickLine';
import QuickBar from './QuickBar';
import { Divider, CircularProgress } from '@material-ui/core';

class ActualSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            database: null
        }
    }

    componentDidMount() {
        firebase.database().ref().on("value", (snapshot) => this.setState({ database: snapshot.val() }));
    }

    render() {
        if (!this.state.database) {
            return <center><CircularProgress /></center>
        }
        if (!this.state.database[this.props.tournament] || !this.state.database[this.props.tournament][this.props.team]) {
            return <Typography variant="h3">לא נמצא מידע</Typography>;
        }

        const bigData = this.state.database[this.props.tournament][this.props.team];
        let gameData = bigData.games ? Object.values(bigData.games) : null;
        let pitData = bigData.pit ? bigData.pit : null;

        let rocketSpeed = "הרובוט יכול למלא ";
        if (pitData) {
            if (pitData.rocketSpeed === "lessThanHalf")
                rocketSpeed += "פחות מחצי טיל"
            else if (pitData.rocketSpeed === "half")
                rocketSpeed += "חצי טיל"
            else if (pitData.rocketSpeed === "full")
                rocketSpeed += "טיל שלם"
            else if (pitData.rocketSpeed === "moreThanOne")
                rocketSpeed += "יותר מטיל אחד"
            rocketSpeed += " במשחק"
        }

        return (
            <>
                <Typography align="center" variant="h4">פיט</Typography>
                {pitData ?
                    <>
                        <Typography variant="h6">הרובוט {pitData.rocket === "true" ? "" : "לא"} יכול להכניס לטיל</Typography>
                        {pitData.rocket === "true" && <Typography variant="h6">{rocketSpeed}</Typography>}
                        <Typography variant="h6">הרובוט {pitData.pickupCargo === "true" ? "" : "לא"} יכול להרים קארגו</Typography>
                        <Typography variant="h6">הרובוט {pitData.pickupHatches === "true" ? "" : "לא"} יכול להרים האטצ'ים</Typography>
                        {pitData.priority === "false" && <Typography variant="h6">לרובוט אין עדיפות</Typography>}
                        {pitData.priority !== "false" && <Typography variant="h6">העדיפות של הרובוט היא {pitData.priority === "cargo" ? "הקארגו" : "ההאטצ'ים"}</Typography>}
                        {pitData.climbing === "false" && <Typography variant="h6">הרובוט לא יכול לטפס</Typography>}
                        {pitData.climbing === "true" &&
                            <Typography variant="h6">הרובוט יכול לטפס ל{!pitData.thirdPlatform ? "פלטפורמה 2" : !pitData.secondPlatform ? "פלטפורמה 3" : "פלטפורמות 2 ו3"}</Typography>
                        }
                    </>
                    :
                    <Typography variant="h5">לא נמצא מידע</Typography>
                }
                <br />
                <Divider />
                <br />
                <Typography align="center" variant="h4">משחקים</Typography>
                {gameData ?
                    <QuickGrid>
                        <Typography variant="h5" xs={12}>Sandstorm</Typography>
                        <QuickDonut title="שליטה" data={gameData.map(x => x.sandstorm.controls)} elements={["autonomous", "manual", "none"]} labels={["אוטונומי", "ידני", "כלום"]} colors={[blue[500], red[500], grey[500]]} />
                        <QuickLine title="כמה קארגו והאטצ'ים הוכנסו בsandstorm?" datasets={[gameData.map(x => parseInt(x.sandstorm.cargo)), gameData.map(x => parseInt(x.sandstorm.hatches))]} labels={["קארגו", "האטצ'ים"]} colors={[blue[500], red[500]]} />
                        <Typography variant="h5" xs={12}>מהלך המשחק</Typography>
                        <QuickDonut title="סוג רובוט" data={gameData.map(x => x.game.robotType)} elements={["groundLevel", "rocket", "jack", "defense", "broken"]} labels={["Ground Level", "טיל", "Jack", "הגנה", "עציץ"]} colors={[blue[500], red[500], green[500], grey[500]]} />
                        <QuickDonut title="פלטפורמה התחלתית" data={gameData.map(x => x.game.platformStart)} elements={["1", "2"]} labels={["1", "2"]} colors={[blue[500], red[500]]} />
                        <QuickLine xs={12} title="כמה קארגו והאטצ'ים הוכנסו במהלך המשחק?" datasets={[gameData.map(x => parseInt(x.game.rocket.cargo)), gameData.map(x => parseInt(x.game.rocket.hatches)), gameData.map(x => parseInt(x.game.cargoShip.cargo)), gameData.map(x => parseInt(x.game.cargoShip.hatches))]} labels={["קארגו טיל", "האטצ'ים טיל", "קארגו ship", "האטצ'ים ship"]} colors={[blue[500], red[500], green[500], yellow[500]]} />
                        <QuickBar title="מאיפה אסף את הכדורים?" data={gameData.map(x => (x.game.pickupLocation.depot === true ? 1 : 0) + (x.game.pickupLocation.loadingStation === true ? 2 : 0))} elements={[0, 1, 2, 3]} labels={["שום מקום", "Depot", "Loading Station", "שניהם"]} colors={[blue[500], red[500], green[500], yellow[500]]} />
                        <QuickDonut title="פלטפורמה התחלתית" data={gameData.map(x => x.endgame.platformEnd)} elements={["1", "2", "3"]} labels={["1", "2", "3"]} colors={[blue[500], red[500], green[500]]} />
                    </QuickGrid>
                    :
                    <Typography variant="h5">לא נמצא מידע</Typography>
                }
            </>
        )
    }
}

export default ActualSummary;